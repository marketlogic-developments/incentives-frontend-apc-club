import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ContainerContent from "../components/containerContent";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import * as XLSX from "xlsx";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const puntosporventas = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const currentPage = useSelector((state) => state.currentPage || 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchInvoice, setSearchInvoice] = useState("");
  const [selectSale, setSelectSale] = useState("");
  const [selectDate, setSelectDate] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await axios.get(
            `${process.env.BACKURL}/reporters/assigned/`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(res.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isLoaded, token, currentPage, postsPerPage]);

  const datosdummy = [];

  const search = useMemo(() => {
    const newData = datosdummy.map((data) => ({
      ...data,
      date: new Date(data.date),
    }));

    if (searchEmail !== "" || searchInvoice !== "" || selectSale !== "") {
      return datosdummy
        .filter(({ tipo_venta, factura, email }) => {
          if (searchEmail !== "" && searchInvoice !== "" && selectSale !== "") {
            return (
              tipo_venta === selectSale &&
              factura.startsWith(searchInvoice.toLocaleLowerCase()) &&
              email.startsWith(searchEmail.toLocaleLowerCase())
            );
          }
          if (searchEmail !== "" && selectSale !== "") {
            return (
              tipo_venta === selectSale &&
              email.startsWith(searchEmail.toLocaleLowerCase())
            );
          }
          if (searchInvoice !== "" && selectSale !== "") {
            return (
              factura.startsWith(searchInvoice.toLocaleLowerCase()) &&
              email.startsWith(searchEmail.toLocaleLowerCase())
            );
          }
          if (searchEmail !== "" && searchInvoice !== "") {
            return (
              factura.startsWith(searchInvoice.toLocaleLowerCase()) &&
              email.startsWith(searchEmail.toLocaleLowerCase())
            );
          }
          if (selectSale !== "") {
            return tipo_venta === selectSale;
          }
          if (searchInvoice !== "") {
            return factura.startsWith(searchInvoice.toLocaleLowerCase());
          }
          if (searchEmail !== "") {
            return email.startsWith(searchEmail.toLocaleLowerCase());
          }
        })
        .map((data, index) => (
          <tr key={index} className="bg-white border-b dark:border-gray-500">
            <td className="py-4 px-2">{data.date}</td>
            <td className="py-4 px-2">{data.email}</td>
            <td className="py-4 px-2">{data.factura}</td>
            <td className="py-4 px-2">{data.digipoints}</td>
            <td className="py-4 px-2">{data.tipo_venta}</td>
            <td className="py-4 px-2">{parseFloat(data.monto).toFixed(2)}</td>
          </tr>
        ));
    }

    if (selectDate !== "") {
      const dataSort = newData.sort((a, b) => {
        if (selectDate === "upDown") {
          return b.date - a.date;
        }

        return a.date - b.date;
      });

      return dataSort.map((data, index) => (
        <tr key={index} className="bg-white border-b dark:border-gray-500">
          <td className="py-4 px-2">{data.date.toISOString().slice(0, 10)}</td>
          <td className="py-4 px-2">{data.email}</td>
          <td className="py-4 px-2">{data.factura}</td>
          <td className="py-4 px-2">{data.digipoints}</td>
          <td className="py-4 px-2">{data.tipo_venta}</td>
          <td className="py-4 px-2">{parseFloat(data.monto).toFixed(2)}</td>
        </tr>
      ));
    }

    return datosdummy.map((data, index) => (
      <tr key={index} className="bg-white border-b dark:border-gray-500">
        <td className="py-4 px-2">{data.date}</td>
        <td className="py-4 px-2">{data.email}</td>
        <td className="py-4 px-2">{data.factura}</td>
        <td className="py-4 px-2">{data.digipoints}</td>
        <td className="py-4 px-2">{data.tipo_venta}</td>
        <td className="py-4 px-2">{parseFloat(data.monto).toFixed(2)}</td>
      </tr>
    ));
  }, [searchInvoice, searchEmail, selectSale, selectDate]);

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-2 px-2">
                {t("tabla.fechaventa")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("tabla.correo")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("tabla.nserie")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("tabla.designados")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("tabla.tipodeventa")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("tabla.amountTotal")}
              </th>
            </tr>
          </thead>
          <tbody>
            {search}
            {/* {currentItems &&
              currentItems.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:border-gray-500"
                >
                  <td className="py-4 px-2">
                    {moment(data.saleDates).format("MM/DD/YYYY")}
                  </td>
                  <td className="py-4 px-2">{data.employAssigned.email}</td>
                  <td className="py-4 px-2">{data.invoiceNumber}</td>
                  <td className="py-4 px-2">{data.totalPoints}</td>
                  <td className="py-4 px-2">{data.saleType}</td>
                  <td className="py-4 px-2">
                    {parseFloat(data.saleAmount).toFixed(2)}
                  </td>
                </tr>
              ))} */}
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
                className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={(e) => setSelectDate(e.target.value)}
              >
                <option value="">{t("tabla.ordenarFecha")}</option>
                <option value="upDown">{t("tabla.recienteA")}</option>
                <option value="downUp">{t("tabla.antiguoR")}</option>
              </select>
              <select
                className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm col-span-2"
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
          {!loading && <Table currentItems={currentItems} />}
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
