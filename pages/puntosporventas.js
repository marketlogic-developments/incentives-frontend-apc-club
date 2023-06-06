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

const puntosporventas = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const currentPage = useSelector((state) => state.currentPage || 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchInvoice, setSearchInvoice] = useState("");
  const [selectSale, setSelectSale] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const data = useSelector((state) => state.sales.salesall);
  const company = useSelector((state) => state.user.company);
  const distribuitor = useSelector((state) => state.user.distribuitor);

  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (token && data.length === 0) {
      setLoading(true);
      if (user.roleId === 1) {
        dispatch(getSalesAll(token)).then((response) => {
          setLoading(false);
        });
      } else if (user.companyId === null) {
        dispatch(getSalesAllByDist(token, distribuitor.soldToParty)).then(
          (response) => {
            setLoading(false);
          }
        );
      } else {
        dispatch(getSalesAllByChannel(token, company.resellerMasterId)).then(
          (response) => {
            setLoading(false);
          }
        );
      }
    }
  }, [isLoaded, token]);

  const [emailFilter, setEmailFilter] = useState("");
  const [reasonAssignFilter, setReasonAssignFilter] = useState("");

  const handleEmailFilterChange = (e) => {
    setEmailFilter(e.target.value);
  };

  const handleReasonAssignFilterChange = (e) => {
    setReasonAssignFilter(e.target.value);
  };

  const filteredUsers = data.filter((user) => {
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

  const uniqueEmails = [
    ...new Set(data.map((user) => user.reseller_partner_rollup)),
  ];
  uniqueEmails.sort((a, b) => a.localeCompare(b));

  const uniqueReasonAssign = [
    ...new Set(data.map((user) => user.business_unit)),
  ];

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-2 px-2">
                Disti Partner Rollup
              </th>
              <th scope="col" className="py-2 px-2">
                Reseller Partner Rollup
              </th>

              <th scope="col" className="py-2 px-2">
                Business Unit
              </th>
              <th scope="col" className="py-2 px-2">
                Business Type
              </th>
              <th scope="col" className="py-2 px-2">
                SKU
              </th>
              <th scope="col" className="py-2 px-2">
                Quarter
              </th>
              {user.roleId === 1 && (
                <th scope="col" className="py-2 px-2">
                  DigiPoints
                </th>
              )}
              <th scope="col" className="py-2 px-2">
                Total Sales US
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:border-gray-500"
                >
                  <td className="py-4 px-2">{data.disti_partner_rollup}</td>
                  <td className="py-4 px-2">{data.reseller_partner_rollup}</td>
                  <td className="py-4 px-2">{data.business_unit}</td>
                  <td className="py-4 px-2">{data.business_type}</td>
                  <td className="py-4 px-2">{data.materia_sku}</td>
                  <td className="py-4 px-2">{data.quarter}</td>
                  {user.roleId === 1 && (
                    <td className="py-4 px-2">
                      {data.max_digipoints_allocate}
                    </td>
                  )}

                  <td className="py-4 px-2">
                    ${parseFloat(data.total_sales_amount).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;

    return filteredUsers.slice(itemOffset, endOffset);
  }, [itemOffset, data, filteredUsers]);

  const pageCount = useMemo(
    () => Math.ceil(filteredUsers.length / itemsPerPage),
    [filteredUsers, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;

    setItemOffset(newOffset);
  };

  const importFile = (data) => {
    // const workbook = XLSX.utils.book_new();
    // const sheet = XLSX.utils.json_to_sheet(data);
    // XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    // XLSX.writeFile(workbook, "Puntos_Por_Ventas.xlsx");

    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Puntos_por_ventas.csv");
    });
  };

  console.log(data);
  return (
    <ContainerContent pageTitle={"DigiPoints por ventas"}>
      <div className="m-6 flex flex-col gap-16">
        <div className="w-full md:w-2/2 shadow p-5 rounded-lg bg-white">
          {!loading && (
            <div className="w-full grid grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <select
                  value={emailFilter}
                  onChange={handleEmailFilterChange}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">{t("organizacion.organizacion")}</option>
                  {uniqueEmails.map((email) => (
                    <option key={email} value={email}>
                      {email}
                    </option>
                  ))}
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
                  {uniqueReasonAssign.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
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
              <div className="relative justify-items-center grid grid-flow-col">
                <button
                  className="btn bg-red-500 hover:bg-red-700 text-white font-bold text-[12px] h-1 min-h-full rounded-full"
                  onClick={handleResetFilters}
                >
                  Remover filtros
                </button>
                <button
                  className="btn bg-red-500 hover:bg-red-700 text-white font-bold text-[12px] h-1 min-h-full rounded-full"
                  onClick={() => importFile(filteredUsers)}
                >
                  Exportar
                </button>
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
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 2, 3],
    },
  };
}

export default puntosporventas;
