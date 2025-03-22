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
import { TyCReportsFunctions } from "functions/Reports/TyCReportsFunctions";


const productos = () => {
    const dispatch = useDispatch();
    const { ReportProductsParticipating } = TyCReportsFunctions();
    const token = useSelector((state) => state.user.token);
    const products = useSelector((state) => state.sales.products);
    const [data, setData] = useState([]);
    const [others, setData2] = useState();

    const [isLoaded, setIsLoaded] = useState(false);

    const [t, i18n] = useTranslation("global");
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(false);

    const [searchSku, setSearchSku] = useState("");
    const [selectDate, setSelectDate] = useState("");

    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    });


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

    const getProductsParticipatingReport = () => {
        setLoading(true);

        const { limit = 10, page = 1 } = params;

        // Escapar el JSON para que se pase correctamente en la URL
        const queryParams = `page=${page}&limit=${limit}`;

        ReportProductsParticipating(queryParams)
            .then((res) => {
                setData2(res);
                setData(res.content);
            })
            .catch((error) => {
                console.error("Error en la petición:", error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getProductsParticipatingReport();
    }, [params]);

    const handlePageClick = (e) => {
        setParams((prev) => ({ ...prev, page: e.selected + 1 }));
    };

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
                                    className={`${(index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                                        } w-full`}
                                    key={index}
                                >
                                    <td className="py-4 px-6">{product.business_unit}</td>
                                    <td className="py-4 px-6">{product.sub_bu}</td>
                                    <td className="py-4 px-6">{product.product_category}</td>
                                    <td className="py-4 px-6">{product.business_type}</td>
                                    <td className="py-4 px-6">{product.code}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </>
        );
    }

    return (
        <ContainerContent pageTitle={"Productos Participantes"}>
            <div className="m-6 flex flex-col gap-16">
                <div className="w-full flex justify-center flex-col">
                    <InfoBannerPP />
                </div>
                <div className="lg:grid lg:grid-cols-2 flex flex-col lg:gap-0 gap-3">
                    {/* <div className="flex flex-col lg:flex-row gap-6">
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
          </div> */}
                    {/* <div
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
          </div> */}
                </div>

                <div className="w-full">
                    {loading && <div className="lds-dual-ring"></div>}
                    {!loading && (
                        <>
                            <Table currentItems={data} />
                        </>
                    )}
                    <ReactPaginate
                        pageCount={others?.total_pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
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
