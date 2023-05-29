import { Modal } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getDigiPa, getDigipointsPa } from "../../store/reducers/sales.reducer";
import Cookies from "js-cookie";
import axios from "axios";
import {
  getDigiPoints,
  setDigipoints,
} from "../../store/reducers/users.reducer";
import ModalDistribution from "./DpDistribution/ModalDistribution";

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
        className="modal100"
      >
        <ModalDistribution
          dataToTable={dataToTable}
          salesOption={salesOption}
          setOpened={setOpened}
          setTeamInfo={setTeamInfo}
          teams={teams}
          loading={loading}
        />
      </Modal>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
        <div className="w-full grid grid-cols-3 gap-1 mb-4">
          <div className="relative">
            <div className="absolute flex items-center ml-4 h-full">
              <img src="/assets/Icons/search.png" alt="search" />
            </div>
            <input
              type="text"
              placeholder="Buscar"
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
              <img src="/assets/Icons/download.png" alt="search" />
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
                          <div
                            className="flex items-center ml-4 h-full gap-1"
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
                        ) : (
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
