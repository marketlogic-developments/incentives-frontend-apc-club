import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ContainerContent from "../components/containerContent";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import * as XLSX from "xlsx";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  getSalesAll,
  getSalesAllByChannel
} from "../store/reducers/sales.reducer";

const puntosporventas = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
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


  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    console.log(data)
    if (token && data.length === 0) {
      dispatch(getSalesAllByChannel(token, 'AM00133713'));
    }
  }, [isLoaded, token]);

  function Table({ data }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-2 px-2">
                Reseller
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
              <th scope="col" className="py-2 px-2">
                Total Sales US
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:border-gray-500"
                >
                  <td className="py-4 px-2">
                    {data.reseller_partner_rollup}
                  </td>
                  <td className="py-4 px-2">{data.business_unit}</td>
                  <td className="py-4 px-2">{data.business_type}</td>
                  <td className="py-4 px-2">{data.materia_sku}</td>
                  <td className="py-4 px-2">{data.quarter}</td>
                  <td className="py-4 px-2">
                    {parseFloat(data.total_sales_amount).toFixed(2)}
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

    return data.slice(itemOffset, endOffset);
  }, [itemOffset, data]);
  const pageCount = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

  const importFile = (data) => {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    XLSX.writeFile(workbook, "Puntos_Por_Ventas.xlsx");
  };

  return (
    <ContainerContent pageTitle={"Puntos por ventas"}>
      <div className="m-6 flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-3xl">{t("tabla.ppventas")}</h1>
        </div>
        <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white flex flex-col items-end gap-10">
          <div className="w-full grid grid-cols-2 place-items-center gap-3">
            <div className="flex w-full gap-5">
              <select
                className="none px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={(e) => setSelectDate(e.target.value)}
              >
                <option value="">{t("tabla.ordenarFecha")}</option>
                <option value="upDown">{t("tabla.recienteA")}</option>
                <option value="downUp">{t("tabla.antiguoR")}</option>
              </select>
              <select
                className="none px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm col-span-2"
                onChange={(e) => {
                  setSelectSale(e.target.value);
                }}
              >
                <option value="">{t("tabla.filtrarVenta")}</option>
                <option value="CC">Creative Cloud</option>
                <option value="DC">Document Cloud</option>
              </select>
            </div>
            <button
              className="btn btn-primary w-max justify-self-end"
              onClick={() => importFile(datosdummy)}
            >
              Exportar
            </button>
            <div className="flex justify-between  w-full">
              <input
                type="text"
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder={t("tabla.buscarEmail")}
                className="px-8 py-3  rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm w-full"
              />
            </div>
            <div className="flex justify-between  w-full">
              <input
                type="text"
                onChange={(e) => setSearchInvoice(e.target.value)}
                placeholder={t("tabla.buscarFactura")}
                className="px-8 py-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm w-full"
              />
            </div>
          </div>

          {loading && <div className="lds-dual-ring"></div>}
          {!loading && <Table data={data} />}
          {/* {!loading && (
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
          )} */}
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
