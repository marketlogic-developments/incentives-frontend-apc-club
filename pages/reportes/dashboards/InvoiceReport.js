import React, { useEffect, useState, useMemo } from "react";
import {
    ArrowDown,
    CloudDownload,
    SearchIcon,
    UserPerformance,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    BtnFilter,
    BtnWithImage,
    Table,
    SelectInputValue,
    SearchInput,
    TitleWithIcon,
    DropDownReport,
} from "../../../components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import {
    importExcelFunction,
} from "../../../components/functions/reports";
import { TyCReportsFunctions } from "functions/Reports/TyCReportsFunctions";

const InvoiceReport = () => {
    const itemsPerPage = 10;
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.currentUser);
    const [data, setData] = useState([]);
    const [selectOne, setSelectOne] = useState("");
    const [selectTwo, setSelectTwo] = useState("");
    const [selectThree, setSelectThree] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [searchByInvoice, setSearchByInvoice] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { ReportsInvoicesDownload } = TyCReportsFunctions();
    const [t] = useTranslation("global");

    const numberToMoney = (value = 0) => {
        const number = parseFloat(value) || 0;
        return `$ ${number.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    useEffect(() => {
        const fetchInvoicesReport = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=04c31aa2-84b3-4d18-860d-21b2a42d011b`,
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
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoicesReport();
    }, [user, token]);

    const filteredUsers = useMemo(() => {
        return data.filter((user) => {
            const invoice = (user["Sales Order"] ?? "").toString().toLowerCase();
            const company = (user["Company Name"] ?? "").toString().toLowerCase();
            const unit = (user["Business Unit"] ?? "").toString().toLowerCase();
            const type = (user["Business Type"] ?? "").toString().toLowerCase();

            const matchInvoice = !searchByInvoice || invoice.includes(searchByInvoice.toLowerCase());
            const matchCompany = !selectThree || company === selectThree.toLowerCase();
            const matchUnit = !selectOne || unit === selectOne.toLowerCase();
            const matchType = !selectTwo || type === selectTwo.toLowerCase();

            return matchInvoice && matchCompany && matchUnit && matchType;
        });
    }, [data, searchByInvoice, selectOne, selectTwo, selectThree]);

    const currentItems = useMemo(() => {
        const endOffset = itemOffset + itemsPerPage;
        return filteredUsers.slice(itemOffset, endOffset);
    }, [itemOffset, filteredUsers]);

    const pageCount = useMemo(() => Math.ceil(filteredUsers.length / itemsPerPage), [filteredUsers, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
        setItemOffset(newOffset);
    };

    const clearSelects = () => {
        setSelectOne("");
        setSelectTwo("");
        setSelectThree("");
        setSearchByInvoice("");
    };

    const importFileExcel = async (data) => {
        ReportsInvoicesDownload()
            .catch((error) => console.error("Error en la petición:", error))
            .finally(() => { });
    };

    return (
        <div className="mt-8">
            <div className="grid grid-rows-1">
                <TitleWithIcon icon={<UserPerformance />} title={t("Reportes.invoice_report")} />
            </div>

            <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
                <AiOutlineHome className="cursor-pointer" onClick={() => router.push("/dashboard")} />
                <span><AiOutlineRight /></span>
                <span className="cursor-pointer" onClick={() => router.push("/reportesDashboard")}>My Reports</span>
                <span><AiOutlineRight /></span>
                <span className="font-bold text-[#1473E6]">{t("Reportes.invoice_report")}</span>
            </div>

            <div className="grid items-center sm:grid-cols-6 grid-cols-3 gap-3 mt-6">
                <div className="sm:col-span-1 col-span-3">
                    <SearchInput
                        image={<SearchIcon />}
                        placeHolder={"Invoice"}
                        value={searchByInvoice}
                        onChange={(e) => setSearchByInvoice(e.target.value)}
                        stylesInput="border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
                    />
                </div>

                <SelectInputValue
                    placeholder="Company Name"
                    value={selectThree}
                    data={[...new Set(data.map(d => d["Company Name"]).filter(Boolean))].map(name => ({ value: name, label: name }))}
                    icon={<ArrowDown />}
                    searchable={true}
                    onChange={(value) => setSelectThree(value)}
                    name="Company Name"
                />

                <SelectInputValue
                    placeholder="Business Unit"
                    value={selectOne}
                    data={[...new Set(data.map(d => d["Business Unit"]).filter(Boolean))].map(unit => ({ value: unit, label: unit }))}
                    icon={<ArrowDown />}
                    onChange={(value) => setSelectOne(value)}
                    name="Business Unit"
                />

                <SelectInputValue
                    placeholder="Business Type"
                    value={selectTwo}
                    data={[...new Set(data.map(d => d["Business Type"]).filter(Boolean))].map(type => ({ value: type, label: type }))}
                    icon={<ArrowDown />}
                    onChange={(value) => setSelectTwo(value)}
                    name="Business Type"
                />

                <BtnFilter
                    text={t("Reportes.limpiar_filtros")}
                    styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
                    onClick={clearSelects}
                />

                <div className="sm:col-span-1 col-span-2">
                    <DropDownReport icon={<CloudDownload />} title={t("Reportes.descargar")}>
                        <BtnWithImage
                            text={t("Reportes.descargar") + " Excel"}
                            icon={<CloudDownload />}
                            styles="bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
                            onClick={() => importFileExcel(filteredUsers)}
                        />
                    </DropDownReport>
                </div>
            </div>

            <div className="grid overflow-x-hidden w-full">
                {loading ? (
                    <div className="lds-dual-ring"></div>
                ) : (
                    <>
                        <div className="grid grid-rows-1 justify-items-center pt-5">
                            <Table
                                containerStyles="mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"
                                tableStyles="table-zebra !text-sm"
                                colStyles="p-2"
                                thStyles="sticky text-white"
                                cols={[
                                    "Membership ID",
                                    "Company Name",
                                    "Region",
                                    "Country",
                                    "Company Type",
                                    "Company Level",
                                    "User Name",
                                    "User Role",
                                    "Assignment Type",
                                    "Major Licensing Programid",
                                    "Sales Order",
                                    "Material Sku",
                                    "Market Segment",
                                    "Licensing Contract",
                                    "Client",
                                    "Product Name",
                                    "Invoice Sale Date",
                                    "Quarter",
                                    "Revenue by user (USD)",
                                    "Quantity",
                                    "Points Assigned",
                                ]}
                            >
                                {currentItems.map((row, index) => (
                                    <tr key={index}>
                                        {[
                                            "Membership ID",
                                            "Company Name",
                                            "Region",
                                            "Country",
                                            "Company Type",
                                            "Company Level",
                                            "User Name",
                                            "User Role",
                                            "Assignment Type",
                                            "Major Licensing Programid",
                                            "Sales Order",
                                            "Material Sku",
                                            "Market Segment",
                                            "Licensing Contract",
                                            "Client",
                                            "Product Name",
                                            "Invoice Sale Date",
                                            "Quarter",
                                            "Revenue by user (USD)",
                                            "Quantity",
                                            "Points Assigned"
                                        ].map((key, i) => {
                                            const value = row[key];
                                            return (
                                                <td key={i}>
                                                    {typeof value === "number" && key === "Revenue by user (USD)"
                                                        ? numberToMoney(value)
                                                        : value ?? "N/A"}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </Table>

                            <ReactPaginate
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                subContainerClassName="pages pagination"
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
                    </>
                )}
            </div>
        </div>
    );
};

export default InvoiceReport;
