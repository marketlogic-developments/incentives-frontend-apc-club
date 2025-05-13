"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    ArrowDown,
    CloudDownload,
    SearchIcon,
    UserPerformance as User,
} from "../../../components/icons";
import {
    BtnFilter,
    BtnWithImage,
    DropDownReport,
    SearchInput,
    SelectInputValue,
    Table,
    TitleWithIcon,
} from "../../../components";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { TyCReportsFunctions } from "functions/Reports/TyCReportsFunctions";
import { useTranslation } from "react-i18next";

const UserPerformance = () => {
    const { ReportUserPerfomanceTyCDownload } = TyCReportsFunctions();
    const { user, token } = useSelector((state) => state.currentUser);
    const [data, setData] = useState([]);
    const [params, setParams] = useState({ page: 1, limit: 10 });
    const [searchByEmail, setSearchByEmail] = useState("");
    const [selectCompany, setSelectCompany] = useState("");
    const [selectRegion, setSelectRegion] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 10;
    const router = useRouter();
    const [t] = useTranslation("global");

    const numberToMoney = (value = 0) => {
        const number = parseFloat(value) || 0;
        return `$ ${number.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    useEffect(() => {
        const fetchUsersPerfomance = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=f47ac10b-58cc-4372-a567-0e02b2c3d479`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${user.token ?? token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setData(response?.data?.result ?? []);
            } catch (error) {
                console.error("Error fetching performance data:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersPerfomance();
    }, [user, token]);

    const filteredUsers = useMemo(() => {
        return data.filter((user) => {
            const email = (user["User Name"] ?? "").toLowerCase();
            const company = (user["Company Name"] ?? "").toLowerCase();
            const region = (user["Region"] ?? "").toLowerCase();

            return (
                (!searchByEmail || email.includes(searchByEmail.toLowerCase())) &&
                (!selectCompany || company === selectCompany.toLowerCase()) &&
                (!selectRegion || region === selectRegion.toLowerCase())
            );
        });
    }, [data, searchByEmail, selectCompany, selectRegion]);

    const currentItems = useMemo(() => {
        const endOffset = itemOffset + itemsPerPage;
        return filteredUsers.slice(itemOffset, endOffset);
    }, [itemOffset, filteredUsers]);

    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % filteredUsers.length;
        setItemOffset(newOffset);
    };

    const clearFilters = () => {
        setSearchByEmail("");
        setSelectCompany("");
        setSelectRegion("");
        setItemOffset(0);
    };

    const importFileExcel = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=f47ac10b-58cc-4372-a567-0e02b2c3d479&download=true&name=user_perfomance`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token ?? token}`,
                        "Content-Type": "application/json",
                    },
                    responseType: "blob",
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "user_perfomance.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading Excel:", error);
        }
    };

    return (
        <div className="mt-8">
            <div className="pt-2 grid items-center grid-rows-1 gap-3">
                <TitleWithIcon icon={<User />} title={t("Reportes.user_performance")} />
            </div>

            <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
                <AiOutlineHome className="cursor-pointer" onClick={() => router.push("/dashboard")} />
                <span><AiOutlineRight /></span>
                <span className="cursor-pointer" onClick={() => router.push("/reportesDashboard")}>My Reports</span>
                <span><AiOutlineRight /></span>
                <span className="font-bold text-[#1473E6]">{t("Reportes.user_performance")}</span>
            </div>

            <div className="pt-2 grid items-center sm:grid-cols-6 grid-cols-2 gap-3">
                <SearchInput
                    image={<SearchIcon />}
                    placeHolder="Email"
                    value={searchByEmail}
                    onChange={(e) => {
                        setSearchByEmail(e.target.value);
                        setItemOffset(0);
                    }}
                    stylesInput="border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
                />

                <SelectInputValue
                    placeholder="Company Name"
                    value={selectCompany}
                    data={[...new Set(data.map(d => d["Company Name"]).filter(Boolean))].map(name => ({ value: name, label: name }))}
                    icon={<ArrowDown />}
                    onChange={(value) => setSelectCompany(value)}
                    name="Company Name"
                />

                <SelectInputValue
                    placeholder="Region"
                    value={selectRegion}
                    data={[...new Set(data.map(d => d["Region"]).filter(Boolean))].map(region => ({ value: region, label: region }))}
                    icon={<ArrowDown />}
                    onChange={(value) => setSelectRegion(value)}
                    name="Region"
                />

                <BtnFilter
                    text={t("Reportes.limpiar_filtros")}
                    styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
                    onClick={clearFilters}
                />

                <DropDownReport icon={<CloudDownload />} title={t("Reportes.descargar")}>
                    <BtnWithImage
                        text={t("Reportes.descargar") + " Excel"}
                        icon={<CloudDownload />}
                        styles="bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
                        onClick={() => importFileExcel()}
                    />
                </DropDownReport>
            </div>

            <div className="grid grid-rows-1 justify-items-center">
                {loading ? (
                    <div className="lds-dual-ring"></div>
                ) : (
                    <>
                        <Table
                            containerStyles="mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"
                            tableStyles="table-zebra !text-sm"
                            colStyles="p-2"
                            thStyles="sticky text-white"
                            cols={["User Name", "First Name", "Last Name", "Region", "Country", "Company Name", "Company Level", "T&C User", "T&C Date", "Actual Revenue (USD)", "Total DigiPoints"]}
                        >
                            {currentItems.map((data, index) => (
                                <tr key={index}>
                                    <td>{data["User Name"]}</td>
                                    <td>{data["First Name"]}</td>
                                    <td>{data["Last Name"]}</td>
                                    <td>{data["Region"]}</td>
                                    <td>{data["Country"]}</td>
                                    <td>{data["Company Name"]}</td>
                                    <td>{data["Company Level"]}</td>
                                    <td className="text-start mx-2 py-4 px-2">
                                        {data["Policies Status"] === "YES" ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                    </td>
                                    <td>{data["T&C Date"] ?? "N/A"}</td>
                                    <td>{numberToMoney(data["Actual Revenue (USD)"])}</td>
                                    <td>{data["Total DigiPoints"]}</td>
                                </tr>
                            ))}
                        </Table>
                    </>
                )}
            </div>

            <div className="w-full pt-5">
                <ReactPaginate
                    pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    nextClassName="item next"
                    previousClassName="item previous"
                    activeClassName="item active"
                    breakClassName="item break-me"
                    breakLabel="..."
                    disabledClassName="disabled-page"
                    pageClassName="item pagination-page"
                    nextLabel={<FaChevronRight style={{ color: "#000", fontSize: "20" }} />}
                    previousLabel={<FaChevronLeft style={{ color: "#000", fontSize: "20" }} />}
                />
            </div>
        </div>
    );
};

export default UserPerformance;