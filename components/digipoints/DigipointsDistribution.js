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
  const user = useSelector((state) => state.user.user);
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
        <div className="flex flex-col">
          <h2 className="!text-xl font-bold text-center">
            {t("tabla.aDigipoints")}
          </h2>
          <p className="text-[#2C2C2C] text-xs text-center mt-4">{t("digipoints.sDistribuicionDigiPoints")}</p>
          <p className="text-[#333333] text-xs mt-10 mb-3 pl-10">{t("digipoints.aDistribuicion")}</p>
          {/*<select
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => setSalesOption(e.target.value)}
          >
            <option value="salesRep">{t("digipoints.represV")}</option>
            <option value="salesTeam">{t("digipoints.teamV")}</option>
          </select>*/}
          <div className="pl-10">
            <input className="!bg-[#D9D9D9]" type="radio" value="option1" checked={true} />
            <label className="ml-3 align-middle">
              {t("digipoints.represV")}
            </label>
          </div>
          <div className="pl-10">
            <input type="radio" value="option2" checked={false} />
            <label className="ml-3 align-middle">
              {t("digipoints.teamV")}
            </label>
          </div>
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

          <div className="flex flex-col gap-5 font-bold p-10">
            <div className="container">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-black-500">
                  <tbody>
                    <div className="border border-color">
                      <div className="w-full flex justify-center mt-16">
                        <img src="/assets/Icons/no_agregados.png" alt="noAgregados"/>
                      </div>
                      <div className="w-full flex justify-center mt-6 text-[#333333] text-sm">
                        <span>{t("digipoints.asignacionDigipoints")}</span>
                      </div>
                      <div className="w-full flex justify-center mt-2 mb-16">
                        <p className="text-[#2C2C2C] text-xs font-normal w-3/12 text-center">
                          {t("digipoints.sOpcionListadoUsuarios")}
                        </p>
                      </div>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 font-bold">
            <div className="container">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-black-500">
                  <tbody>
                    <div className="border rounded-2xl box-shadow border-shadow">
                      <div className="w-full flex mt-10 text-[#333333] text-sm">
                        <span className="ml-10">{t("digipoints.dFactura")}</span>
                      </div>
                      <div className="w-full flex mt-8 ml-6">
                        <img src="/assets/Icons/factura.png" alt="noAgregados"/>
                        <div className="">
                          <span className="ml-3 font-bold !text-3xl">90</span>
                          <span className="ml-10 pl-10">Digipoints</span>
                        </div>
                      </div>
                      <div className="w-max flex justify-center mt-10">
                        <div className="grid grid-flow-col ml-6">
                          <img className="mt-1" src="/assets/Icons/bookmark.png" alt="bookmark"/>
                          <div className="ml-2">
                            <span className="font-bold !text-xs">No. de factura</span>
                          </div>
                          <div className="ml-2">
                            <span className="ml-5 font-normal text-[#2C2C2C] text-xs">3298420</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-max flex justify-center mt-3">
                        <div className="grid grid-flow-col ml-6">
                          <img className="mt-1" src="/assets/Icons/calendar.png" alt="calendar"/>
                          <div className="ml-2">
                            <span className="font-bold !text-xs">Fecha</span>
                          </div>
                          <div className="ml-2">
                            <span className="ml-16 font-normal text-[#2C2C2C] text-xs">8 de mayo a las 14:00 horas</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-max flex justify-center mt-3">
                        <div className="grid grid-flow-col ml-6">
                          <img className="mt-1" src="/assets/Icons/person_circle.png" alt="cliente"/>
                          <div className="ml-2">
                            <span className="font-bold !text-xs">Cliente</span>
                          </div>
                          <div className="ml-2">
                            <span className="ml-14 font-normal text-[#2C2C2C] text-xs">Universidad Adolfo Ibañez</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-max flex justify-center mt-3">
                        <div className="grid grid-flow-col ml-6">
                          <img className="mt-1" src="/assets/Icons/outline.png" alt="outline"/>
                          <div className="ml-2">
                            <span className="font-bold !text-xs">Cantidad</span>
                          </div>
                          <div className="ml-2">
                            <span className="ml-12 font-normal text-[#2C2C2C] text-xs">200</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="w-full gap-1 mb-4">
              <div className="relative">
                <div className="absolute flex items-center ml-4 h-full w-full">
                  <img
                    src="/assets/Icons/search.png"
                    alt="search"
                  />
                </div>
                <input type="text" placeholder="Buscar" 
                  className="px-11 py-3 w-11/12 rounded-full bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                />
              </div>
                <div>Holis</div>
              <div className="relative">
                <div className="container w-full flex justify-center">
                  <div className="overflow-x-auto">
                    <table className="text-sm text-left text-black-500">
                      <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5 table-radius-cstm">
                        <tr>
                          <th scope="col" className="py-3 px-6">
                            {t("user.nombre")}
                          </th>
                          <th scope="col" className="py-5 px-6">
                            {t("tabla.correo")}
                          </th>
                        </tr>
                      </thead>
                      {loading ? (
                        <div className="lds-dual-ring"></div>
                      ) : (
                        <tbody>
                          {dataToTable.map((data, index) => (
                            <tr
                              className="bg-white border-b dark:border-gray-500"
                              key={data?.invoices_included}
                            >
                              <td className="py-4 px-6">
                                <input type="radio" value="option1" checked={false} />
                                {/*<label className="ml-3 align-middle">
                                  {t("digipoints.teamV")}
                                  </label>*/}
                                  
                                {data?.description}</td>
                              <td className="py-4 px-6 min-w-[130px]">
                                a.dubon@adobe.com
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>

            
        

            
           
            
          </div>

          <div className="relative w-full flex justify-center gap-10 p-10">
            <button type="cancel" className="btn btn-cancel w-48"
              onClick={() => {
                setOpened(false);
              }}
            >
              {t("modalEquipos.cancelar")}
            </button>
            <button type="submit" className="btn btn-info w-48" 
              onClick={() => nextModal()}
            >
              {t("digipoints.cAsignacion")}
            </button>
          </div>
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
        size={numModal === 0 ? "100%" : "100%"}
        centered
      >
        {typeModal}
      </Modal>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
        <div className="w-full grid grid-cols-3 gap-1 mb-4">
          <div className="relative">
            <div className="absolute flex items-center ml-4 h-full">
              <img
                src="/assets/Icons/search.png"
                alt="search"
              />
            </div>
            <input type="text" placeholder="Buscar" 
              className="px-11 py-3 w-11/12 rounded-full bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
          </div>
          <div className="flex gap-5 w-full">
            <select
              name="date"
              onChange={handleFilters}
              className="px-4 py-3 w-40 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              value={filtersTable.date}
            >
              <option value="">{t("tabla.ordenarPor")}</option>
              <option value="upDown">{t("tabla.recienteA")}</option>
              <option value="downUp">{t("tabla.antiguoR")}</option>
            </select>
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
          <div className="relative justify-items-center grid grid-flow-col">
            <div className="flex items-center ml-4 h-full gap-1">
              <img
                src="/assets/Icons/download.png"
                alt="search"
              />
              <p className="text-[#1473E6] font-semibold cursor-pointer textShadowHTW">
                {t("digipoints.descargar")}
              </p>
            </div>
            {/*<button className="btn btn-primary"
                onClick={() =>
                  setFiltersTable({
                    date: "",
                    marketSegment: "",
                    invoiceattributed: "",
                  })
                }
              >
              Remover Filtros
            </button>*/}
          </div>
        </div>
        <br></br>
        <div className="container">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5 table-radius-cstm">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.nfactura")}
                  </th>
                  <th scope="col" className="py-5 px-6">
                    {t("tabla.fecha")}
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Cliente
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Segmento de mercado
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Digipoints
                  </th>
                  <th scope="col" className="py-5 px-6"></th>
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
                      <td>hola</td>
                      <td className="py-4 px-6">{obj?.invoices_included}</td>
                      <td className="py-4 px-6 min-w-[130px]">{obj?.date}</td>
                      <td className="py-4 px-6">{obj?.client}</td>
                      <td className="py-4 px-6">{obj?.marketSegment}</td>
                      <td className="py-4 px-6">{obj?.digipoints}</td>
                      <td className="py-4 px-6">
                        {obj.status === false ? (
                          <div className="flex items-center ml-4 h-full gap-1" 
                            onClick={() => {
                              setInvoiceData({ ...obj, index: index });
                              setOpened(true);
                            }}
                          >
                            <img
                              src="/assets/Icons/add_circle.png"
                              alt="search"
                            />
                            <p className="text-[#1473E6] font-semibold cursor-pointer textShadowHTW">
                              {t("tabla.aDigipoints")}
                            </p>
                          </div>
                          /*<button
                              className="btn btn-primary btn-xs"
                              onClick={() => {
                                setInvoiceData({ ...obj, index: index });
                                setOpened(true);
                              }}
                            >
                              {t("tabla.asignar")}
                            </button>
                          */
                        ) : (
                          <button
                            className="btn btn-secondary btn-xs"
                            onClick={() => {
                              console.log("");
                              // return handleUnassign({ ...obj, index: index });
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
