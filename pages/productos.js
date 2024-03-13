import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import { getProductsData } from "../store/reducers/sales.reducer";
import moment from "moment";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import InfoBannerPP from "../components/productosParticipantes/InfoBannerPP";
import { AiOutlineSearch } from "react-icons/ai";

const productos = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const products = useSelector((state) => state.sales.products);
  const [data, setData] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  const [searchSku, setSearchSku] = useState("");
  const [selectDate, setSelectDate] = useState("");

  const importFile = (data) => {
    // const workbook = XLSX.utils.book_new();
    // const sheet = XLSX.utils.json_to_sheet(data);
    // XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    // XLSX.writeFile(workbook, "Productos_Participantes.xlsx");

    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Productos Participantes.csv");
    });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getProductsData(token))
        .then((response) => {
          setLoading(false);
          setData(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded]);

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500 table-fixed tableJustify overflow-hidden rounded-md">
          <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
            <tr>
              <th scope="col" className="py-3 px-6">
                {t("tabla.unidadNegocio")}
              </th>
              <th scope="col" className="py-3 px-6">
                SubBu
              </th>
              <th scope="col" className="py-3 px-6">
                Categoría
              </th>
              <th scope="col" className="py-3 px-6">
                Tipo de {t("tabla.negocio")}
              </th>
              <th scope="col" className="py-3 px-6">
                SKU
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((product, index) => (
                <tr
                  className={`${
                    (index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                  } w-full`}
                  key={index}
                >
                  <td className="py-4 px-6">{product.businessUnit}</td>
                  <td className="py-4 px-6">{product.subBu}</td>
                  <td className="py-4 px-6">{product.categoryType}</td>
                  <td className="py-4 px-6">{product.businessType}</td>
                  <td className="py-4 px-6">{product.code}</td>
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

  const search = useMemo(() => {
    const newData = products.map((data) => ({
      ...data,
      CreatedAt: new Date(data.CreatedAt),
    }));

    if (searchSku !== "" && selectDate !== "") {
      const dataSort = newData
        .sort((a, b) => {
          if (selectDate === "upDown") {
            return b.CreatedAt - a.CreatedAt;
          }

          return a.CreatedAt - b.CreatedAt;
        })
        .filter(({ code }) => {
          return code.startsWith(searchSku.toLocaleLowerCase());
        });

      return setData(dataSort);
    }

    if (searchSku !== "") {
      return setData(
        products.filter(({ code }) => {
          return code.startsWith(searchSku.toLocaleLowerCase());
        })
      );
    }

    if (selectDate !== "") {
      const dataSort = newData.sort((a, b) => {
        if (selectDate === "upDown") {
          return b.CreatedAt - a.CreatedAt;
        }

        return a.CreatedAt - b.CreatedAt;
      });

      return setData(dataSort);
    }
  }, [searchSku, selectDate]);

  return (
    <ContainerContent pageTitle={"Productos Participantes"}>
      <div className="m-6 flex flex-col gap-16">
        <div className="w-full flex justify-center flex-col">
          <InfoBannerPP />
        </div>
        <div className="lg:grid lg:grid-cols-2 flex flex-col lg:gap-0 gap-3">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex lg:w-1/2 w-full">
              <input
                className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full"
                type="text"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setData(products);
                  }

                  return setSearchSku(e.target.value);
                }}
                placeholder={t("tabla.buscarSku")}
              />
              <div className="absolute h-full items-center flex ml-2">
                <AiOutlineSearch color="#eb1000" />
              </div>
            </div>
            <select
              value={selectDate}
              onChange={(e) => setSelectDate(e.target.value)}
              className="select select-bordered w-auto bg-[#F4F4F4]"
            >
              <option value="">{t("tabla.ordenarFecha")}</option>
              <option value="upDown">{t("tabla.recienteA")}</option>
              <option value="downUp">{t("tabla.antiguoR")}</option>
            </select>
          </div>
          <div
            className="flex gap-3 items-center cursor-pointer justify-self-end"
            onClick={() => importFile(data)}
          >
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.25 5.72827H10.625C10.9897 5.72827 11.3394 5.87858 11.5973 6.14612C11.8551 6.41367 12 6.77654 12 7.1549L12 14.5734C12 14.9517 11.8551 15.3146 11.5973 15.5822C11.3394 15.8497 10.9897 16 10.625 16H2.375C2.01033 16 1.66059 15.8497 1.40273 15.5822C1.14487 15.3146 1 14.9517 1 14.5734L1 7.1549C1 6.77654 1.14487 6.41367 1.40273 6.14612C1.66059 5.87858 2.01033 5.72827 2.375 5.72827H3.75"
                stroke="#1473E6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.25 3.85328L6.5 1.00002L3.75 3.85328M6.5 11.8424L6.5 1.57067"
                stroke="#1473E6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="font-bold text-info xl:!text-base lg:!text-sm ">
              {t("tabla.exportar")}
            </p>
          </div>
        </div>

        <div className="w-full">
          {loading && <div className="lds-dual-ring"></div>}
          {!loading && (
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
    </ContainerContent>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 3, 5],
    },
  };
}

export default productos;
