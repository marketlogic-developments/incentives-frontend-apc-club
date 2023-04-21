import { Modal } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PerUsers from "./DigiPointsDistributionModals/PerUsers";
import PerTeams from "./DigiPointsDistributionModals/PerTeams";
import { getDigiPa, getDigipointsPa } from "../../store/reducers/sales.reducer";
import Cookies from "js-cookie";
import axios from "axios";
import {
  getDigiPoints,
  setDigipoints,
} from "../../store/reducers/users.reducer";

const DigipointsDistribution = () => {
  const [opened, setOpened] = useState(false);
  const [t, i18n] = useTranslation("global");
  const iduser = useSelector((state) => state.user.user.id);
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
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sales.digipa);
  const [dataToTable, setDataToTable] = useState([]);
  const [filtersTable, setFiltersTable] = useState({
    date: "",
    marketSegment: "",
    invoiceattributed: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (token && data.length === 0) {
      dispatch(getDigipointsPa(token, iduser));
    }

    setLoading(false);
  }, [token]);

  const filters = useMemo(() => {
    setDataToTable(
      [...data]
        .sort((prev, curr) => {
          const datePrev = new Date(prev.date);
          const dateCurr = new Date(curr.date);

          if (filtersTable.date === "downUp") {
            return datePrev - dateCurr;
          }

          return dateCurr - datePrev;
        })
        .filter((invoice) => {
          if (
            filtersTable.marketSegment !== "" &&
            filtersTable.invoiceattributed !== ""
          ) {
            const assigned =
              filtersTable.invoiceattributed === "unassigned"
                ? invoice.status === true
                : filtersTable.invoiceattributed === "attributed"
                ? invoice.status === false
                : invoice.status === true || invoice.status === false;

            return (
              invoice.marketSegment === filtersTable.marketSegment && assigned
            );
          }

          if (filtersTable.marketSegment !== "") {
            return invoice.marketSegment === filtersTable.marketSegment;
          }

          if (filtersTable.invoiceattributed !== "") {
            return filtersTable.invoiceattributed === "unassigned"
              ? invoice.status === true
              : filtersTable.invoiceattributed === "attributed"
              ? invoice.status === false
              : invoice.status === true || invoice.status === false;
          }

          return invoice;
        })
    );
  }, [data, filtersTable]);

  const uniqueData = (data) => {
    const thisData = new Set(data);

    return [...thisData].map((item) => {
      return <option value={item}>{item}</option>;
    });
  };

  const handleFilters = (e) => {
    return setFiltersTable({
      ...filtersTable,
      [e.target.name]: [e.target.value][0],
    });
  };

  const searchUser = () => {
    const searchValue = users.filter(
      ({ email, role_id }) =>
        email.startsWith(searchByEmail.toLocaleLowerCase()) && role_id === 5
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

  const nextModal = () => {
    if (salesOption === "salesTeam") {
      setSalesOption("salesRep");
      return setNumModal(2);
    } else {
      setSalesOption("salesRep");
      return setNumModal(1);
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

  const handleSubmit = (invoice) => {
    let newData = [...dataToTable];
    let dataRedux = [...data];

    newData[invoice.index] = { ...newData[invoice.index], status: true };

    const indexOfDataRedux = dataRedux.findIndex(
      ({ salesOrder }) => invoice.salesOrder === salesOrder
    );

    dataRedux[indexOfDataRedux] = {
      ...dataRedux[indexOfDataRedux],
      status: true,
    };

    setDataToTable(newData);
    dispatch(getDigiPa(dataRedux));
    dispatch(getDigiPoints(token, iduser));

    setSalesOption("salesRep");
    setNumModal(0);
    setOpened(false);
    setDataModal([]);
    setListUsers(false);
    setHover(false);
    setOpened(false);
  };

  const handleUnassign = (obj) => {
    Swal.fire({
      title: "Antes de desasignar la factura, ¿quieres confirmar tu decisión?",
      showCancelButton: true,
      confirmButtonColor: "#eb1000",
      confirmButtonText: "Desasignar factura",
      denyCancelText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.BACKURL}/employee-poits-collects/unassign-invoice`,
            {
              isGold: false,
              invoiceReference: obj.salesOrder,
            },
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            let newData = [...dataToTable];
            let dataRedux = [...data];

            newData[obj.index] = {
              ...newData[obj.index],
              status: false,
            };

            const indexOfDataRedux = dataRedux.findIndex(
              ({ salesOrder }) => obj.salesOrder === salesOrder
            );

            dataRedux[indexOfDataRedux] = {
              ...dataRedux[indexOfDataRedux],
              status: false,
            };

            dispatch(getDigiPoints(token, iduser));
            dispatch(getDigiPa(dataRedux));
            setDataToTable(newData);
          });
      }

      return;
    });
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

  const typeModal = useMemo(() => {
    if (numModal === 0) {
      return (
        <div className="flex flex-col gap-10">
          <h2 className="font-bold">
            {t("digipoints.DDigipoints")} DigiPoints
          </h2>
          <p>{t("digipoints.selectType")}</p>
          <select
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => setSalesOption(e.target.value)}
          >
            <option value="salesRep">{t("digipoints.represV")}</option>
            <option value="salesTeam">{t("digipoints.teamV")}</option>
          </select>
          {salesOption === "salesTeam" && (
            <select
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              onChange={(e) => {
                const team = teams.find(
                  (data) => Number(e.target.value) === data.id
                );
                return setTeamInfo(team);
              }}
            >
              <option value="">{t("digipoints.elegirTeam")}</option>
              {teams.map((data) => (
                <option value={data.id} key={data.id}>
                  {data.name_group}
                </option>
              ))}
            </select>
          )}
          <button className="btn btn-primary" onClick={() => nextModal()}>
            {t("tabla.continuar")}
          </button>
        </div>
      );
    }
    if (numModal === 1) {
      return (
        <PerUsers
          invoiceData={invoiceData}
          dataModal={dataModal}
          setDataModal={setDataModal}
          searchByEmail={searchByEmail}
          setSearchByEmail={setSearchByEmail}
          setListUsers={setListUsers}
          componentMenuUsers={componentMenuUsers}
          handleSubmit={handleSubmit}
          hover={hover}
        />
      );
    }
    if (numModal === 2) {
      return (
        <PerTeams
          invoiceData={invoiceData}
          teamInfo={teamInfo}
          handleSubmit={handleSubmit}
        />
      );
    }
  }, [
    numModal,
    salesOption,
    listUsers,
    searchByEmail,
    hover,
    dataModal,
    teamInfo,
  ]);

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
        <div className="w-full flex justify-around">
          <div className="flex gap-5 w-full">
            <select
              name="date"
              onChange={handleFilters}
              className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              value={filtersTable.date}
            >
              <option value="">{t("tabla.ordenarFecha")}</option>
              <option value="upDown">{t("tabla.recienteA")}</option>
              <option value="downUp">{t("tabla.antiguoR")}</option>
            </select>
            {/* <select
            name="typeBusiness"
            onChange={handleFilters}
            className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          >
            <option value="">{t("tabla.ordenarFecha")}</option>
            <option value="upDown">{t("tabla.recienteA")}</option>
            <option value="downUp">{t("tabla.antiguoR")}</option>
          </select> */}
            <select
              name="marketSegment"
              onChange={handleFilters}
              value={filtersTable.marketSegment}
              className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            >
              <option value="">Segmento de Mercado</option>
              {uniqueData(data.map(({ marketSegment }) => marketSegment))}
            </select>
            <select
              name="invoiceattributed"
              onChange={handleFilters}
              value={filtersTable.invoiceattributed}
              className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            >
              <option value="">Estatus</option>
              <option value="attributed">{t("tabla.asignar")}</option>
              <option value="unassigned">{t("tabla.asignado")}</option>
            </select>
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() =>
                setFiltersTable({
                  date: "",
                  marketSegment: "",
                  invoiceattributed: "",
                })
              }
            >
              Remover Filtros
            </button>
          </div>
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
                    Segmento de mercado
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Digipoints
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.asignar")}
                  </th>
                </tr>
              </thead>
              {loading ? (
                <div className="lds-dual-ring"></div>
              ) : (
                <tbody>
                  {dataToTable.map((obj, index) => (
                    <tr
                      className="bg-white border-b dark:border-gray-500"
                      key={obj?.invoices_included}
                    >
                      <td className="py-4 px-6">{obj?.invoices_included}</td>
                      <td className="py-4 px-6 min-w-[130px]">{obj?.date}</td>
                      <td className="py-4 px-6">{obj?.client}</td>
                      <td className="py-4 px-6">{obj?.marketSegment}</td>
                      <td className="py-4 px-6">{obj?.digipoints}</td>
                      <td className="py-4 px-6">
                        {obj.status === false ? (
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={() => {
                              console.log(index);
                              setInvoiceData({ ...obj, index: index });
                              setOpened(true);
                            }}
                          >
                            {t("tabla.asignar")}
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary btn-xs"
                            onClick={() => {
                              return handleUnassign({ ...obj, index: index });
                            }}
                          >
                            {t("tabla.asignado")}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigipointsDistribution;
