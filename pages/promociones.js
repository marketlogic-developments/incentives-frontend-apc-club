import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ContainerContent from "../components/containerContent";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as XLSX from "xlsx";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  getSalesAll,
  getSalesAllByChannel,
  getSalesAllByDist,
} from "../store/reducers/sales.reducer";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import { getAllPromos, getPromosAll } from "../store/reducers/promos.reducer";
import { Modal } from "@mantine/core";

const promociones = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const dataPromos = useSelector((state) => state.promos.promos);
  const itemsPerPage = 10;

  useEffect(() => {
    if (token && dataPromos.length === 0) {
      setLoading(true);
      axios
        .get(`${process.env.BACKURL}/promos`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(getAllPromos(res.data));
          setLoading(false);
        });
    }
  }, [token]);

  const [emailFilter, setEmailFilter] = useState("");
  const [reasonAssignFilter, setReasonAssignFilter] = useState("");

  const handleEmailFilterChange = (e) => {
    setEmailFilter(e.target.value);
  };

  const handleReasonAssignFilterChange = (e) => {
    setReasonAssignFilter(e.target.value);
  };

  const filteredPromos = dataPromos.filter((user) => {
    if (
      emailFilter &&
      !user.reseller_partner_rollup
        .toLowerCase()
        .includes(emailFilter.toLowerCase())
    ) {
      return false;
    }
    if (
      reasonAssignFilter &&
      !user.business_unit
        .toString()
        .toLowerCase()
        .includes(reasonAssignFilter.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleResetFilters = () => {
    setEmailFilter("");
    setReasonAssignFilter("");
  };

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-2 px-2">
                Nombre
              </th>
              <th scope="col" className="py-2 px-2">
                Business Unit
              </th>
              <th scope="col" className="py-2 px-2">
                Business Type
              </th>
              <th scope="col" className="py-2 px-2">
                Licencia
              </th>
              <th scope="col" className="py-2 px-2">
                Market Segment
              </th>
              <th scope="col" className="py-2 px-2">
                Fecha de inicio
              </th>
              <th scope="col" className="py-2 px-2">
                Fecha de caducidad
              </th>
              <th scope="col" className="py-2 px-2">
                Estatus
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((data, index) => {
                console.log(data);
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:border-gray-500"
                  >
                    <td className="py-4 px-2">{data.name}</td>
                    <td className="py-4 px-2">{data.businessUnit}</td>
                    <td className="py-4 px-2">{data.businessType}</td>
                    <td className="py-4 px-2">{data.majorLicensingProgram}</td>
                    <td className="py-4 px-2">{data.marketSegment}</td>
                    <td className="py-4 px-2">
                      {data.startDate.split("T")[0]}
                    </td>
                    <td className="py-4 px-2">{data.endDate.split("T")[0]}</td>
                    <td className="py-4 px-2">
                      {data.status ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;

    return filteredPromos.slice(itemOffset, endOffset);
  }, [itemOffset, dataPromos, filteredPromos]);

  const pageCount = useMemo(
    () => Math.ceil(filteredPromos.length / itemsPerPage),
    [filteredPromos, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;

    setItemOffset(newOffset);
  };

  const importFile = (data) => {
    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Promociones.csv");
    });
  };

  return (
    <>
      <Modal
        // opened={opened}
        // onClose={() => setOpened(false)}
        size={"80%"}
        centered
      ></Modal>
      <ContainerContent pageTitle={"DigiPoints por ventas"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">Promociones</h1>
          </div>
          <div className="w-full md:w-2/2 shadow p-5 rounded-lg bg-white">
            {!loading && (
              <div className="flex flex-col gap-5">
                <div className="flex justify-end gap-5">
                  <button
                    className="btn btn-sm bg-red-500 btn-primary"
                    onClick={handleResetFilters}
                  >
                    Remover filtros
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 btn-primary"
                    onClick={handleResetFilters}
                  >
                    Agregar Promoción
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 btn-primary"
                    onClick={() => importFile(filteredUsers)}
                  >
                    Exportar
                  </button>
                </div>
                <div className="w-full grid grid-flow-col auto-cols-fr gap-4 mb-4">
                  <div className="relative">
                    <select
                      value={emailFilter}
                      onChange={handleEmailFilterChange}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">{t("organizacion.organizacion")}</option>
                      {/* {uniqueEmails.map((email) => (
                    <option key={email} value={email}>
                      {email}
                    </option>
                  ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 13.707a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V3a1 1 0 10-2 0v8.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={reasonAssignFilter}
                      onChange={handleReasonAssignFilterChange}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">{t("tabla.unidadNegocio")}</option>
                      {/* {uniqueReasonAssign.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 13.707a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V3a1 1 0 10-2 0v8.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={reasonAssignFilter}
                      onChange={handleReasonAssignFilterChange}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">{t("tabla.unidadNegocio")}</option>
                      {/* {uniqueReasonAssign.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 13.707a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V3a1 1 0 10-2 0v8.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={reasonAssignFilter}
                      onChange={handleReasonAssignFilterChange}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">{t("tabla.unidadNegocio")}</option>
                      {/* {uniqueReasonAssign.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 13.707a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V3a1 1 0 10-2 0v8.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={reasonAssignFilter}
                      onChange={handleReasonAssignFilterChange}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">{t("tabla.unidadNegocio")}</option>
                      {/* {uniqueReasonAssign.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 13.707a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V3a1 1 0 10-2 0v8.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loading && <div className="lds-dual-ring"></div>}
            {!loading && <Table currentItems={currentItems} />}
            {!loading && (
              <ReactPaginate
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                nextClassName={"item next "}
                previousClassName={"item previous"}
                activeClassName={"item active "}
                breakClassName={"item break-me "}
                breakLabel={"..."}
                disabledClassName={"disabled-page"}
                pageClassName={"item pagination-page "}
                nextLabel={
                  <FaChevronRight style={{ color: "#000", fontSize: "20" }} />
                }
                previousLabel={
                  <FaChevronLeft style={{ color: "#000", fontSize: "20" }} />
                }
              />
            )}
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 2, 3, 4, 5],
    },
  };
}

export default promociones;
