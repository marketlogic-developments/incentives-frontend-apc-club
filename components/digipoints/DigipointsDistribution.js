import { Modal } from "@mantine/core";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const DigipointsDistribution = () => {
  const [opened, setOpened] = useState(false);
  const [t, i18n] = useTranslation("global");
  const teams = useSelector((state) => state.teams.teams);
  const users = useSelector((state) => state.user.companyUsers);
  const [salesOption, setSalesOption] = useState("salesRep");
  const [numModal, setNumModal] = useState(0);
  const [teamInfo, setTeamInfo] = useState({});
  const [searchByEmail, setSearchByEmail] = useState("");
  const [listUsers, setListUsers] = useState(false);
  const [hover, setHover] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [invoiceData, setInvoiceData] = useState({});

  const [data, setData] = useState([
    {
      factura: 123123,
      fecha: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      }),
      cliente: "Adobe",
      producto: "Licencia Sub Renovación",
      cantidad: 20,
      digipoints: 100,
      estatus: true,
    },
    {
      factura: 523371,
      fecha: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      }),
      cliente: "Adobe",
      producto: "Licencia Sub Renovación",
      cantidad: 20,
      digipoints: 100,
      estatus: false,
    },
    {
      factura: 435621,
      fecha: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      }),
      cliente: "Adobe",
      producto: "Licencia Sub Renovación",
      cantidad: 20,
      digipoints: 100,
      estatus: true,
    },
  ]);

  const searchUser = () => {
    const searchValue = users.filter(({ email }) =>
      email.startsWith(searchByEmail.toLocaleLowerCase())
    );

    if (searchValue.length !== 0) {
      return searchValue.map((data) => (
        <div
          className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer"
          onClick={() => verifyUserInToTable(data)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>
            <strong className="text-primary">Nombre:</strong>
            <strong>{data.name}</strong>
          </p>
          <p>
            <strong className="text-primary">Email:</strong> {data.email}
          </p>
        </div>
      ));
    }

    if (searchByEmail === "") {
      return users.map((data) => (
        <div
          className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer"
          onClick={() => verifyUserInToTable(data)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>
            <strong className="text-primary">Nombre:</strong>
            <strong>{data.name}</strong>
          </p>
          <p>
            <strong className="text-primary">Email:</strong> {data.email}
          </p>
        </div>
      ));
    }

    if (searchValue.length === 0 && searchByEmail !== "") {
      return (
        <div className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer">
          <p>No hay concidencias encontradas</p>
        </div>
      );
    }
  };

  const verifyUserInToTable = (data) => {
    const dataModalFilter = dataModal.map(({ email }) => email);

    if (dataModalFilter.includes(data.email)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      return (
        Toast.fire({
          icon: "error",
          title: "Este participante ya está dentro de la lista",
        }),
        setSearchByEmail(""),
        setListUsers(false)
      );
    } else {
      setSearchByEmail("");
      setListUsers(false);
      setDataModal([...dataModal, { ...data, porcentaje: 0 }]);
    }
  };

  const componentMenuUsers = useMemo(() => {
    if (listUsers) {
      return (
        <div className="w-full absolute bg-[#e6e6e6] p-5 max-h-52 flex flex-col gap-3 overflow-y-auto">
          {searchUser()}
        </div>
      );
    }
  }, [listUsers, searchByEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = data.filter(
      ({ factura }) => factura !== invoiceData.factura
    );
    setData([{ ...invoiceData, estatus: false }, ...newData]);

    setSalesOption("salesRep");
    setNumModal(0);
    setOpened(false);
    setDataModal([]);
    setListUsers(false);
    setHover(false);
    setOpened(false);
  };

  const typeModal = useMemo(() => {
    if (numModal === 0) {
      return (
        <div className="flex flex-col gap-10">
          <h2 className="font-bold">Distribución de DigiPoints</h2>
          <p>Seleccione una opción para distribuir los DigiPoints</p>
          <select
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => setSalesOption(e.target.value)}
          >
            <option value="salesRep">Representante de ventas</option>
            <option value="salesTeam">Equipo de ventas</option>
          </select>
          {salesOption === "salesTeam" && (
            <select
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              onChange={(e) => {
                const [team] = teams.filter(
                  (data) => e.target.value === data.id
                );
                return setTeamInfo(team);
              }}
            >
              <option value="">Elije tu equipo de ventas</option>
              {teams.map((data) => (
                <option value={data.id}>{data.nameTeam}</option>
              ))}
            </select>
          )}
          <button className="btn btn-primary" onClick={() => nextModal()}>
            Continuar
          </button>
        </div>
      );
    }
    if (numModal === 1) {
      return (
        <div className="grid grid-cols-2 h-[500px]">
          <div className="flex flex-col justify-between relative px-10">
            <div className="flex flex-col gap-5">
              <p>Detalles de la factura</p>
              <div className="grid grid-cols-4 text-sm">
                <div className="border-2 p-3">
                  <p className="text-primary">No. Factura:</p>
                  <p>{invoiceData.factura}</p>
                </div>
                <div className="border-2 p-3">
                  <p className="text-primary">Fecha:</p>
                  <p>{invoiceData.fecha}</p>
                </div>
                <div className="border-2  p-3">
                  <p className="text-primary">Cliente:</p>
                  <p>{invoiceData.cliente}</p>
                </div>
                <div className="border-2 p-3">
                  <p className="text-primary">Cantidad:</p>
                  <p>{invoiceData.cantidad}</p>
                </div>
                <div className="border-2 p-3 col-span-2 flex flex-col justify-evenly">
                  <p className="text-primary ">DigiPoints Disponibles:</p>
                  <p className="text-center font-bold text-2xl">
                    {invoiceData.digipoints}
                  </p>
                </div>
                <div className="border-2 p-3 col-span-2 flex flex-col justify-evenly">
                  <p className="text-primary">
                    DigiPoints estimados por Representante de ventas:
                  </p>
                  <p className="text-center font-bold text-2xl">
                    {dataModal.length === 0
                      ? 0
                      : Math.floor(invoiceData.digipoints / dataModal.length)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <p>Asignar Representante de Ventas</p>
              <div className="relative w-full">
                <input
                  value={searchByEmail}
                  className="input input-primary w-full"
                  type="text"
                  placeholder="Buscar por email"
                  onChange={(e) => setSearchByEmail(e.target.value)}
                  onFocus={() => setListUsers(true)}
                  onBlur={() => {
                    if (hover === false) {
                      return setListUsers(false);
                    }
                  }}
                  autoComplete="off"
                />
                {componentMenuUsers}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-max"
                onClick={handleSubmit}
              >
                Asignar
              </button>
            </div>
          </div>
          <div>
            <div className="text-xs text-black-500 uppercase border-2 w-full grid grid-cols-3 place-items-center tableHeader">
              <p scope="col" className="py-3 px-6">
                Nombre
              </p>
              <p scope="col" className="py-3 px-6">
                Email
              </p>
              <p scope="col" className="py-3 px-6">
                Quitar
              </p>
            </div>
            <div className="w-full overflow-y-scroll">
              <table className="border-2 w-full text-sm">
                {dataModal?.map((data) => (
                  <tr className="bg-white border-b dark:border-gray-500">
                    <td className="py-[1.1rem] w-1/3">{data.name}</td>
                    <td>{data.email}</td>
                    <td
                      className="w-1/3"
                      onClick={() => {
                        const usersDelete = dataModal.filter(
                          ({ id }) => id !== data.id
                        );
                        setDataModal(usersDelete);
                      }}
                    >
                      <svg
                        width="30"
                        height="30"
                        fill="#eb1000"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full cursor-pointer"
                      >
                        <path d="M20.25 4.5H16.5v-.75a2.26 2.26 0 0 0-2.25-2.25h-4.5A2.26 2.26 0 0 0 7.5 3.75v.75H3.75a.75.75 0 0 0 0 1.5h.75v13.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V6h.75a.75.75 0 1 0 0-1.5ZM10.5 15.75a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 1.5 0v6Zm4.5 0a.75.75 0 1 1-1.5 0v-6a.75.75 0 1 1 1.5 0v6ZM15 4.5H9v-.75A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .75.75v.75Z"></path>
                      </svg>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      );
    }
    if (numModal === 2) {
      return (
        <div className="flex flex-col gap-10 items-center">
          <div className="flex justify-between relative px-10 w-full">
            <div className="flex flex-col gap-5 w-full">
              <p>Detalles de la factura</p>
              <div className="grid grid-cols-4 text-sm">
                <div className="border-2 p-3">
                  <p className="text-primary">No. Factura:</p>
                  <p>{invoiceData.factura}</p>
                </div>
                <div className="border-2 p-3">
                  <p className="text-primary">Fecha:</p>
                  <p>{invoiceData.fecha}</p>
                </div>
                <div className="border-2  p-3">
                  <p className="text-primary">Cliente:</p>
                  <p>{invoiceData.cliente}</p>
                </div>
                <div className="border-2 p-3">
                  <p className="text-primary">Cantidad:</p>
                  <p>{invoiceData.cantidad}</p>
                </div>
                <div className="border-2 p-3 col-span-4 flex flex-col justify-evenly">
                  <p className="text-primary ">DigiPoints Disponibles:</p>
                  <p className="text-center font-bold text-2xl">
                    {invoiceData.digipoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 w-full">
            <div className="text-xs text-black-500 uppercase border-2 w-full grid grid-cols-3 place-items-center tableHeader">
              <p scope="col" className="py-3 px-6">
                Nombre
              </p>
              <p scope="col" className="py-3 px-6">
                Email
              </p>
              <p scope="col" className="py-3 px-6">
                Digipoints
              </p>
            </div>
            <div className="w-full overflow-y-scroll">
              <table className="border-2 w-full text-sm">
                {teamInfo?.participants?.map((data) => (
                  <tr className="bg-white border-b dark:border-gray-500">
                    <td className="py-[1.1rem] w-1/3">{data.name}</td>
                    <td>{data.email}</td>
                    <td className="w-1/3">
                      {invoiceData.digipoints * (data.percentage / 100)}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <button className="btn btn-primary w-max" onClick={handleSubmit}>
            Asignar
          </button>
        </div>
      );
    }
  }, [numModal, salesOption, listUsers, searchByEmail, hover, dataModal]);

  const nextModal = () => {
    if (salesOption === "salesTeam") {
      setSalesOption("salesRep");
      return setNumModal(2);
    } else {
      setSalesOption("salesRep");
      return setNumModal(1);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setSalesOption("salesRep");
          setNumModal(0);
          setOpened(false);
          setDataModal([]);
          setListUsers(false);
          setHover(false);
        }}
        size={numModal === 0 ? "40%" : "70%"}
        centered
      >
        {typeModal}
      </Modal>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
        <div className="flex justify-between w-full">
          <select className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            <option value="">{t("tabla.ordenarFecha")}</option>
            <option value="upDown">{t("tabla.recienteA")}</option>
            <option value="downUp">{t("tabla.antiguoR")}</option>
          </select>
        </div>
        <br></br>
        <div className="container">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="text-xs text-black-500 uppercase">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.nfactura")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.fecha")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Cliente
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.hproductos")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.cantidad")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Digipoints
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.asignar")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => (
                  <tr className="bg-white border-b dark:border-gray-500">
                    <td className="py-4 px-6">{data?.factura}</td>
                    <td className="py-4 px-6">{data?.fecha}</td>
                    <td className="py-4 px-6">{data?.cliente}</td>
                    <td className="py-4 px-6">{data?.producto}</td>
                    <td className="py-4 px-6">{data?.cantidad}</td>
                    <td className="py-4 px-6">{data?.digipoints}</td>
                    <td className="py-4 px-6">
                      {data.estatus === true ? (
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() => {
                            setInvoiceData(data);
                            setOpened(true);
                          }}
                        >
                          Asignar
                        </button>
                      ) : (
                        <button className="btn btn-secondary btn-xs">
                          Asignado
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigipointsDistribution;
