import React, { useEffect, useState, useMemo } from "react";
import {
    CloudDownload,
} from "../../components/icons";
import { useTranslation } from "react-i18next";
import {
    BtnWithImage,
    DropDownReport,
    Table,
} from "../../components/index";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import {
    importCsvFunction,
    importExcelFunction,
    partnertycColumnsExcel,
    partnertycColumnsCsv,
} from "../../components/functions/reports";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { TyCReportsFunctions } from "functions/Reports/TyCReportsFunctions";
import DataNotFound from "components/Module/404/DataNotFound";
import { MultipleElements } from "services/generical.service";
import { CompaReportTyCPerChannelPPPAPropsny } from "services/Reports/tycreports.service";

const PartnerTycReport = () => {
    const [data, setData] =
        useState<MultipleElements<CompaReportTyCPerChannelPPPAPropsny> | null>(
            null
        )
    const [t, i18n] = useTranslation("global");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { ReportTyC, ReportOrganizationsTyCDownload } = TyCReportsFunctions();
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        search: "",
    });

    const getDataReportTC = () => {
        setLoading(true);
        const { limit, page, search } = params;
        ReportTyC(`page=${page}&limit=${limit}&search=${search}&search_fields=name`)
            .then((res) => {
                setData(res);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getDataReportTC();
    }, [params]);

    const importFileExcel = async () => {
        ReportOrganizationsTyCDownload()
            .then((res) => { })
            .catch((error) => { console.error("Error en la petición:", error) })
            .finally(() => { });
    };

    const RenderTable = useMemo(() => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                        <div className="lds-dual-ring"></div>
                    </td>
                </tr>
            );
        }

        if (!data) {
            return (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                        <DataNotFound action={getDataReportTC} />
                    </td>
                </tr>
            );
        }

        return (
            <Table
                containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
                tableStyles={"table-zebra !text-sm !table-fixed"}
                colStyles={"p-2"}
                thStyles={"sticky text-white"}
                cols={
                    [
                        "Partner Name",
                        "Region",
                        "Country",
                        "Partner Level",
                        "Status T&C PA",
                        "Status T&C PP",
                        "Partner Status",
                    ] as never[]
                }
            >
                {data.content.map((data, index: number) => (
                    <tr key={index}>
                        <th className="text-left py-3 px-2 mx-4">{data?.name}</th>
                        <th className="text-left py-3 px-2 mx-4">
                            {data?.country?.region?.name}
                        </th>
                        <th className="text-left py-3 px-2 mx-4">{data?.country?.name}</th>
                        <th className="text-left py-3 px-2 mx-4">
                            {data?.distribution_channel?.name}
                        </th>
                        <td className="text-start mx-2 py-4 px-2">
                            {data.has_partner_admin_policies ? (
                                <ImCheckboxChecked />
                            ) : (
                                <ImCheckboxUnchecked />
                            )}
                        </td>
                        <td className="text-start mx-2 py-4 px-2">
                            {data.has_partner_principal_policies ? (
                                <ImCheckboxChecked />
                            ) : (
                                <ImCheckboxUnchecked />
                            )}
                        </td>

                        <td className="text-start mx-2 py-4 px-2">
                            {data?.is_fully_accepted ? (
                                <ImCheckboxChecked />
                            ) : (
                                <ImCheckboxUnchecked />
                            )}
                        </td>
                    </tr>
                ))}
            </Table>
        );
    }, [loading, data]);

    const handlePageClick = (e: { selected: number }) => {
        setParams((prev) => ({ ...prev, page: e.selected + 1 }));
    };

    return (
        <div className="mt-8">
            <div className="pt-2 grid items-center sm:grid-cols-5 grid-cols-2 gap-3">
                <div className="relative flex w-full">
                    <input
                        className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full"
                        placeholder={String(t("tabla.buscar"))}
                        type="text"
                        onBlur={(e) =>
                            setParams((prev) => ({
                                ...prev,
                                search: e.target.value,
                                page: 1,
                            }))
                        }
                    />
                    <div className="absolute h-full items-center flex ml-2">
                        <AiOutlineSearch color="#eb1000" />
                    </div>
                </div>

                <DropDownReport
                    icon={<CloudDownload />}
                    title={t("Reportes.descargar") || ""}
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
            <div className="font-bold flex items-center mt-4">
                <h2 className="lg:text-lg sm:text-xl">Users</h2>
            </div>
            <div className="grid grid-rows-1 justify-items-center">{RenderTable}</div>
            <div className="w-full pt-5">
                <ReactPaginate
                    pageCount={data?.total_pages as number}
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
    );
};

export default PartnerTycReport;
