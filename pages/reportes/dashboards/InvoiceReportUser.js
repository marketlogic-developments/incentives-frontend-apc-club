import React, { useEffect, useState, useMemo } from "react";
import {
    ArrowDown,
    SearchIcon,
    UserPerformance,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    BtnFilter,
    Table,
    SelectInputValue,
    SearchInput,
    TitleWithIcon,
} from "../../../components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import {
    importExcelFunction,
    invoiceColumnsExcel,
} from "../../../components/functions/reports";
import axios from "axios";

const InvoiceReport = () => {
    const itemsPerPage = 10;
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.currentUser);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [t] = useTranslation("global");
    const [selectOne, setSelectOne] = useState("");
    const [selectTwo, setSelectTwo] = useState("");
    const [selectThree, setSelectThree] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [searchByInvoice, setSearchByInvoice] = useState("");
    const router = useRouter();

    const numberToMoney = (quantity = 0) => {
        return `$ ${Math.trunc(Number(quantity))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    useEffect(() => {
        const fetchInvoicesReport = async () => {
            if (!user) return;
            setLoading(true);
            let _params = {};
            try {
                if (user.roles.some((role) => role.name === "sales_rep")) {
                    _params = {
                        params: {
                            user_name: user.email,
                        },
                    };
                } else if (user.roles.some((role) => role.name === "partner_admin")) {
                    _params = {
                        params: {
                            company_name: user.profile.organization[0].name,
                        },
                    };
                } else {
                    _params = {};
                }

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=04c31aa2-84b3-4d18-860d-21b2a42d092b`,
                    _params,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token ?? token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const normalized = response?.data?.result
                    ?.map((item) => ({
                        membership_id: item["Membership ID"],
                        company_name: item["Company Name"],
                        company_level: item["Company Level"],
                        user: item["User Name"],
                        user_rol: item["User Role"],
                        invoice: item["Sales Order"],
                        date: item["Invoice Sale Date"],
                        client: item["Client"],
                        licensing_contract: item["Licensing Contract"],
                        amount_by_user: item["Revenue by user (USD)"],
                        digipoints_by_user: item["Points Assigned"],
                        is_promo_by_user: item["Rule Type"],
                        promoname: item["Promotions Name"],
                        business_unit: item["Business Unit"],
                        business_type: item["Business Type"],
                        material_sku: item["Material Sku"],
                    }))
                    .filter(
                        (item) =>
                            Number(item.amount_by_user) > 0 && Number(item.digipoints_by_user) > 0
                    ) ?? [];

                setData(normalized);
            } catch (error) {
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoicesReport();
    }, [user, token]);

    const handleSelectOneChange = (value) => {
        setSelectOne(value ?? "");
    };

    const handleSelectTwoChange = (value) => {
        setSelectTwo(value ?? "");
    };

    const handleSelectThreeChange = (value) => {
        setSelectThree(value ?? "");
    };

    const dataSelectOne = [...new Set(data.map((item) => item.business_unit))].map((val) => ({
        value: val,
        label: val,
    }));

    const dataSelectTwo = [...new Set(data.map((item) => item.business_type))].map((val) => ({
        value: val,
        label: val,
    }));

    const dataSelectThree = [...new Set(data.map((item) => item.company_name))].map((val) => ({
        value: val,
        label: val,
    }));

    const filteredUsers = data.filter((user) => {
        return (
            user.digipoints_by_user > 0 &&
            user.amount_by_user > 0 &&
            (!selectThree || user.company_name?.toLowerCase().includes(selectThree.toLowerCase())) &&
            (!selectTwo || user.business_type?.toLowerCase().includes(selectTwo.toLowerCase())) &&
            (!selectOne || user.business_unit?.toLowerCase().includes(selectOne.toLowerCase()))
        );
    });


    const clearSelects = () => {
        setSelectOne("");
        setSelectTwo("");
        setSelectThree("");
    };

    const importFileExcel = async (data) => {
        const excelConfig = {
            data: data,
            columns: invoiceColumnsExcel,
            downloadTitle: "InvoiceReport",
        };
        await importExcelFunction(excelConfig);
    };

    const currentItems = useMemo(() => {
        const endOffset = itemOffset + itemsPerPage;
        return filteredUsers.slice(itemOffset, endOffset);
    }, [itemOffset, data, filteredUsers]);

    const pageCount = useMemo(() => Math.ceil(filteredUsers.length / itemsPerPage), [filteredUsers]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="mt-8 p-6">
            <div className="grid grid-rows-1">
                <TitleWithIcon icon={<UserPerformance />} title={t("Reportes.invoice_report")} />
            </div>
            <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
                <AiOutlineHome className="cursor-pointer" onClick={() => router.push("/dashboard")} />
                <span><AiOutlineRight /></span>
                <span className="font-bold text-[#1473E6]">{t("Reportes.invoice_report")}</span>
            </div>
            <div className="grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
                <SearchInput
                    image={<SearchIcon />}
                    placeHolder={"Invoice"}
                    stylesContainer={""}
                    value={searchByInvoice}
                    onChange={(e) => setSearchByInvoice(e.target.value)}
                    stylesInput={"border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"}
                />
                <SelectInputValue
                    placeholder={"Business Unit"}
                    value={selectOne}
                    data={dataSelectOne}
                    icon={<ArrowDown />}
                    onChange={handleSelectOneChange}
                    name={"business"}
                />
                <SelectInputValue
                    placeholder={"Business Type"}
                    value={selectTwo}
                    data={dataSelectTwo}
                    icon={<ArrowDown />}
                    onChange={handleSelectTwoChange}
                    name={"business_type"}
                />
                <BtnFilter
                    text={t("Reportes.limpiar_filtros")}
                    styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
                    onClick={clearSelects}
                />
            </div>
            <div className="grid overflow-x-hidden w-full">
                {loading ? (
                    <div className="lds-dual-ring"></div>
                ) : (
                    <div className="grid grid-rows-1 justify-items-center pt-5">
                        <Table
                            containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
                            tableStyles={"table-zebra !text-sm"}
                            colStyles={"p-2"}
                            thStyles={"sticky text-white"}
                            cols={[
                                "Membership ID",
                                "Company Name",
                                "Company Level",
                                "User Name",
                                "User Role",
                                "Invoice",
                                "Material Sku",
                                "Date",
                                "Client",
                                "Licensing Contract",
                                "Invoice Sale Date",
                                "Sales DigiPoints by user",
                            ]}
                        >
                            {currentItems &&
                                [...currentItems]
                                    .filter((item) => {
                                        if (searchByInvoice !== "") {
                                            return item.invoice.startsWith(searchByInvoice);
                                        }
                                        return item;
                                    })
                                    .map((data, index) => (
                                        <tr key={index}>
                                            <td className="text-start mx-2 py-4 px-2">{data.membership_id}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.company_name}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.company_level}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.user}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.user_rol}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.invoice}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.material_sku}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.date}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.client}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.licensing_contract}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.date}</td>
                                            <td className="text-start mx-2 py-4 px-2">{data.digipoints_by_user}</td>
                                        </tr>
                                    ))}
                        </Table>
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
                            nextLabel={<FaChevronRight style={{ color: "#000", fontSize: "20" }} />}
                            previousLabel={<FaChevronLeft style={{ color: "#000", fontSize: "20" }} />}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoiceReport;
