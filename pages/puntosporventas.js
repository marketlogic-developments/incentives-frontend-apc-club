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
import { AiOutlineSearch } from "react-icons/ai";
import {
  importCsvFunction,
  importExcelFunction,
  digiPointsxVentasColumnsExcelCsv,
  digiPointsxVentasColumnsExcel,
} from "../components/functions/reports";
import { BtnWithImage, DropDownReport } from "../components";
import { CloudDownload, UserPerformance as User } from "../components/icons";

const puntosporventas = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.sales.salesall);
  const company = useSelector((state) => state.user.company);
  const distribuitor = useSelector((state) => state.user.distribuitor);
  const [searchByInvoice, setSearchByInvoice] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (token && isLoaded && data.length === 0) {
      setLoading(true);
      if (user.roleId === 1) {
        dispatch(getSalesAll(token)).then((response) => {
          setLoading(false);
        });
      } else if (user.companyId === null) {
        dispatch(
          getSalesAllByDist(token, distribuitor.soldToParty, user.id)
        ).then((response) => {
          setLoading(false);
        });
      } else {
        dispatch(
          getSalesAllByChannel(token, company.resellerMasterId, user.id)
        ).then((response) => {
          setLoading(false);
        });
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
  uniqueEmails.sort((a, b) => a?.localeCompare(b));

  const uniqueReasonAssign = [
    ...new Set(data.map((user) => user.business_unit)),
  ];

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500 tableJustify overflow-hidden rounded-md">
          <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
            <tr>
              <th scope="col" className="py-2 px-2">
                Invoice
              </th>
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
              [...currentItems]
                .filter((item) => {
                  if (searchByInvoice !== "") {
                    return item.sales_order.startsWith(searchByInvoice);
                  }

                  return item;
                })
                .map((data, index) => (
                  <tr
                    className={`${
                      (index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                    } w-full`}
                    key={index}
                  >
                    <td className="py-4 px-2">{data.sales_order}</td>
                    <td className="py-4 px-2">{data.disti_partner_rollup}</td>
                    <td className="py-4 px-2">
                      {data.reseller_partner_rollup}
                    </td>
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
                      ${parseFloat(data.total_sales_us).toFixed(2)}
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

  /* const importFile = (data) => {
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
  }; */

  /* Download */
  const importFile = async (currentItems) => {
    const columns = digiPointsxVentasColumnsExcelCsv(currentItems);
    const csvConfig = {
      data: currentItems,
      columns: columns,
      downloadTitle: "DigiPoints por ventas",
    };
    await importCsvFunction(csvConfig);
  };

  const importFileExcel = async (currentItems) => {
    const excelConfig = {
      data: currentItems,
      columns: digiPointsxVentasColumnsExcel,
      downloadTitle: "DigiPoints por ventas",
    };

    await importExcelFunction(excelConfig);
  };

  return (
    <ContainerContent pageTitle={"DigiPoints por ventas"}>
      <div className="mt-6 flex flex-col gap-10">
        <div className="w-full grid grid-cols-2 gap-4 ">
          <div className="flex gap-6">
            <div className="relative flex w-1/2">
              <input
                className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full"
                type="text"
                placeholder="Buscar"
                value={searchByInvoice}
                onChange={(e) => setSearchByInvoice(e.target.value)}
              />
              <div className="absolute h-full items-center flex ml-2">
                <AiOutlineSearch color="#eb1000" />
              </div>
            </div>
            <select
              value={emailFilter}
              onChange={handleEmailFilterChange}
              className="select select-bordered w-1/3 bg-[#F4F4F4]"
            >
              <option value="">{t("organizacion.organizacion")}</option>
              {uniqueEmails.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>
            <select
              value={reasonAssignFilter}
              onChange={handleReasonAssignFilterChange}
              className="select select-bordered bg-[#F4F4F4] w-auto"
            >
              <option value="">{t("tabla.unidadNegocio")}</option>
              {uniqueReasonAssign.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end items-center gap-12 mr-6">
            <div className="w-full">
              <p
                className="text-info font-bold 2xl:!text-sm cursor-pointer"
                onClick={handleResetFilters}
              >
                Remover filtros
              </p>
            </div>
            <div className="dropdown w-full">
              <DropDownReport
                icon={<CloudDownload />}
                title={t("Reportes.descargar")}
              >
                <BtnWithImage
                  text={t("Reportes.descargar") + " csv"}
                  icon={<CloudDownload />}
                  styles={
                    "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
                  }
                  onClick={() => importFile(data)}
                />
                <BtnWithImage
                  text={t("Reportes.descargar") + " excel"}
                  icon={<CloudDownload />}
                  styles={
                    "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
                  }
                  onClick={() => importFileExcel(data)}
                />
              </DropDownReport>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="">
            {loading ? (
              <div className="lds-dual-ring"></div>
            ) : (
              <>
                <Table currentItems={currentItems} />
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
              </>
            )}
          </div>
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
