"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getSalesvsGoalsUsePerformance,
    getUserSalePerformance,
} from "../../../store/reducers/sales.reducer";
import {
    ArrowDown,
    CloudDownload,
    SearchIcon,
    UserPerformance as User,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import {
    BarChar,
    BtnFilter,
    BtnWithImage,
    CardChart,
    DropDownReport,
    MultiLineChart,
    SearchInput,
    SelectInputValue,
    Table,
    TitleWithIcon,
} from "../../../components";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import {
    importCsvFunction,
    importExcelFunction,
    userPerformanceColumnsCsv,
    userPerformanceColumnsExcel,
} from "../../../components/functions/reports";
import PieChart from "../../../components/dashboard/GraphSales/PieChart";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { TyCReportsFunctions } from "functions/Reports/TyCReportsFunctions";


const UserPerformance = () => {
    const dispatch = useDispatch();
    const { ReportUserPerfomanceTyC, ReportUserPerfomanceTyCDownload} = TyCReportsFunctions();
    const token = useSelector((state) => state.user.token);
    const [selectOne, setSelectOne] = useState("");
    const [searchByEmail, setSearchByEmail] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const products = useSelector((state) => state.sales.products);
    const [data, setData] = useState([]);
    const [others, setData2] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [t, i18n] = useTranslation("global");
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(false);
    const [loadingBarChart, setLoadingBarChart] = useState(true);
    const router = useRouter();
    const [dataBarChar, setDataBarChar] = useState([]);
    const [dataUserPolicy, setDataUserPolicy] = useState([]);
    const [dataCompanyPolicy, setDataCompanyPolicy] = useState([]);
    const months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ];
    const sortedData = {};
    const [redeemPoints, setRedeemPoints] = useState([]);
    const [salesPoints, setSalesPoints] = useState([]);
    const redeemPointsArray = [];
    const salesPointsArray = [];

    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        additional_filters: "{}",
        search: "",
    });

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const getDataReportTC = () => {
        setLoading(true);

        const { limit = 10, page = 1, search = "", additional_filters = "{}" } = params;

        // Escapar el JSON para que se pase correctamente en la URL
        const queryParams = `page=${page}&limit=${limit}&additional_filters=${encodeURIComponent(additional_filters)}&relation_filters={}&search=${encodeURIComponent(search)}`;

        ReportUserPerfomanceTyC(queryParams)
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
        getDataReportTC();
    }, [params, searchByEmail]);

    const handlePageClick = (e) => {
        setParams((prev) => ({ ...prev, page: e.selected + 1 }));
    };

    const TyCFilter = async (data) => {
        let filterValue = {};

        if (data === "true") {
            filterValue = { policies_status: true };
        } else if (data === "false") {
            filterValue = { policies_status: false };
        }

        setParams((prev) => ({
            ...prev,
            additional_filters: JSON.stringify(filterValue),
        }));
    };

    const importFileExcel = async () => {
        ReportUserPerfomanceTyCDownload()
        .then((res) => {})
        .catch((error) => {console.error("Error en la petición:", error)})
        .finally(() => {});
    };

    useEffect(() => {
        if (dataBarChar) {
            for (let i = 1; i <= 12; i++) {
                const monthData = dataBarChar.find((item) => item.month_redeem === i);

                if (monthData) {
                    redeemPointsArray.push(monthData.redeem_points);
                    salesPointsArray.push(monthData.sales_points);
                } else {
                    redeemPointsArray.push(0);
                    salesPointsArray.push(0);
                }
            }
            setRedeemPoints(redeemPointsArray);
            setSalesPoints(salesPointsArray);
            setLoadingBarChart(false);
        }
    }, [dataBarChar]);

    return (
        <div className="mt-8">
            <div className="pt-2 grid items-center grid-rows-1 gap-3">
                <TitleWithIcon icon={<User />} title={t("Reportes.user_performance")} />
            </div>
            <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
                <AiOutlineHome
                    className="cursor-pointer"
                    onClick={() => {
                        router.push("/dashboard");
                    }}
                />
                <span>
                    <AiOutlineRight />
                </span>
                <span
                    className="cursor-pointer"
                    onClick={() => {
                        router.push("/reportesDashboard");
                    }}
                >
                    My Reports
                </span>
                <span>
                    <AiOutlineRight />
                </span>
                <span className="font-bold text-[#1473E6]">
                    {t("Reportes.user_performance")}
                </span>
            </div>
            
            <div className="pt-2 grid items-center sm:grid-cols-4 grid-cols-2 gap-3">
                <SearchInput
                    image={<SearchIcon />}
                    placeHolder={"Email"}
                    stylesContainer={""}
                    value={searchByEmail}
                    onChange={(e) => {
                        setSearchByEmail(e.target.value);
                        setParams((prev) => ({ 
                            ...prev, 
                            search: e.target.value,
                            page: 1 // Reset to first page when searching
                        }));
                    }}
                    stylesInput={
                        "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
                    }
                />
                <DropDownReport
                    icon={""}
                    title={"Filtros terminos y condiciones"}
                >
                    <BtnWithImage
                        text={"Mostrar todos"}
                        icon={""}
                        styles={
                            "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
                        }
                        onClick={() => TyCFilter("all")}
                    />
                    <BtnWithImage
                        text={"Los que SI aceptaron"}
                        icon={""}
                        styles={
                            "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
                        }
                        onClick={() => TyCFilter("true")}
                    />
                    <BtnWithImage
                        text={"Los que NO aceptaron"}
                        icon={""}
                        styles={
                            "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
                        }
                        onClick={() => TyCFilter("false")}
                    />
                </DropDownReport>

                <DropDownReport
                    icon={<CloudDownload />}
                    title={t("Reportes.descargar")}
                >
                    <BtnWithImage
                        text={t("Reportes.descargar") + " Excel"}
                        icon={<CloudDownload />}
                        styles={
                            "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
                        }
                        onClick={() => importFileExcel()}
                    />
                </DropDownReport>
            </div>
            <div className="grid sm:grid-cols-2 grid-rows-1">
                <div className="grid sm:grid-cols-2 grid-rows-1 sm:justify-items-end justify-items-center mt-3">
                </div>
            </div>
            <div className="font-bold flex items-center">
                <h2 className="lg:text-lg sm:text-xl">Users</h2>
            </div>
            <div className="grid grid-rows-1 justify-items-center">
                {loading && <div className="lds-dual-ring"></div>}
                {!loading && (
                    <>
                        <Table
                            containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
                            tableStyles={"table-zebra !text-sm"}
                            colStyles={"p-2"}
                            thStyles={"sticky text-white"}
                            cols={[
                                "User Name",
                                "FirstName",
                                "LastName",
                                "Region",
                                "Country",
                                // "Company ID",
                                "Company Name",
                                "Company Level",
                                // "Company Type",
                                "T&C User",
                                "T&C Date",
                            ]}
                        >
                            {
                                data.map((data) => (
                                    <tr>
                                        <th className="text-left py-3 px-2 mx-4">{data.email}</th>
                                        <th className="text-left py-3 px-2 mx-4">{data.first_name}</th>
                                        <th className="text-left py-3 px-2 mx-4">
                                            {data.last_name}
                                        </th>
                                        <th className="text-left py-3 px-2 mx-4">
                                            {data.region}
                                        </th>
                                        <th className="text-left py-3 px-2 mx-4">
                                            {data.country}
                                        </th>
                                        {/* <th className="text-left py-3 px-2 mx-4">
                                            {data.first_organization_code}
                                        </th> */}
                                        {/* <th className="text-left py-3 px-2 mx-4">{data.country_id}</th> */}
                                        <th className="text-left py-3 px-2 mx-4">
                                            {data.organization_name}
                                        </th>
                                        <th className="text-left py-3 px-2 mx-4">
                                            {data.distribution_channel_name}
                                        </th>
                                        {/* <th className="text-left py-3 px-2 mx-4">
                                            {data.rtype}
                                        </th> */}
                                        <td className="text-start mx-2 py-4 px-2">
                                            {data.policies_status ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                        </td>
                                        <th className="text-left py-3 px-2 mx-4">
                                            {data.date_accept_policies}
                                        </th>
                                    </tr>
                                ))
                            }
                        </Table>
                    </>
                )}
            </div>
            <div className="w-full pt-5">
                <div className="w-full pt-5">
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
        </div>
    );
};

export default UserPerformance;
