import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import NoDataRanking from "./tableStatsElements/NoDataRanking";
import { useTranslation } from "react-i18next";
import InputReporte from "../cardReportes/InputReporte";
import { ArrowDown, CloudDownload, SearchIcon } from "../icons";
import BtnWithImage from "../cardReportes/BtnWithImage";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import SelectInputValue from "../inputs/SelectInputValue";
import { comment } from "postcss";
import axios from "axios";
import BtnFilter from "../cardReportes/BtnFilter";
import DropDownReport from "../cardReportes/DropDownReport";
import { utils, write } from "xlsx";

const TableTopsRanking = ({
    containerStyles = "",
    tableStyles = "",
    thStyles = "",
    cols = [],
}) => {
    const [ranking, setRanking] = useState([]);
    const { user, token } = useSelector((state) => state.currentUser);
    const [allCompanies, setAllCompanies] = useState([]);
    const [regions, setRegions] = useState(["NOLA", "SOLA", "MEXICO", "BRAZIL"]);
    const [level, setLevel] = useState([]);
    const [t, i18n] = useTranslation("global");
    const [filters, setFilters] = useState({
        company: "",
        region: "",
    });


    useEffect(() => {
        if (user && user?.is_superuser) {
            const fetchCompanies = async () => {
                const response_companies = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d014b`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token ?? token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
    
                setAllCompanies(response_companies.data.result);
            }
    
            fetchCompanies();
        }
    }, [token])

    useEffect(() => {
        const fetchTopSales = async () => {
            let response = undefined;
    
            if (user) {
                const regionParam = filters.region ? filters.region : null;
                const companyParam = filters.company ? filters.company : null;
    
                if (user?.is_superuser) {
                    response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=04c31aa2-84b3-4d18-860d-21b2a42d015b`,
                        {
                            params: {
                                organization_name: companyParam,
                                region_name: regionParam,
                            },
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${user.token ?? token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                } else {
                    response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=04c31aa2-84b3-4d18-860d-21b2a42d015b`,
                        {
                            params: {
                                organization_name: user.profile.organizations[0].name,
                                region_name: null,
                            },
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${user.token ?? token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                }
    
                setRanking(response.data.result);
                setRegions(["NOLA", "SOLA", "MEXICO", "BRAZIL"]);
            }
        };
    
        fetchTopSales();
    }, [token, filters]);

    const handleFilter = (name, info) => {
        const { [name]: extractedValue, ...rest } = filters;
        const keys = Object.keys(rest);
        setFilters({ [keys[0]]: "", [name]: info });
    };

    return (
        <div className="grid w-full">
            <div className="sm:flex justify-between items-center">
                <div>
                    <h2 className="!text-xl font-bold">Top 5 Users</h2>
                </div>
                {user?.is_superuser && (
                    <div className="cursor-pointer flex lg:flex-row flex-col gap-3 items-center">
                        <div className="w-[90%] lg:w-[60%]">
                            <SelectInputValue
                                placeholder={"Company Name"}
                                searchable={true}
                                value={filters.company}
                                data={allCompanies
                                    .map(({ name, nameDist }) => name || nameDist)
                                    .sort()}
                                icon={<ArrowDown />}
                                onChange={handleFilter}
                                name={"company"}
                            />
                        </div>
                        <div className="w-[90%] lg:w-[60%]">
                            <SelectInputValue
                                placeholder={t("tabla.region")}
                                value={filters.region}
                                data={regions.map((i) => i)}
                                icon={<ArrowDown />}
                                onChange={handleFilter}
                                name={"region"}
                            />
                        </div>
                        <BtnFilter
                            text={t("Reportes.limpiar_filtros")}
                            styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
                            onClick={() => setFilters({ company: "", region: "" })}
                        />
                    </div>
                )}

                <div className="w-full lg:w-[40%]">
                </div>
            </div>

            <div className={`w-full overflow-y-auto ${containerStyles}`}>
                <table className={`w-full table-auto ${tableStyles}`}>
                    <thead className={`bg-black ${thStyles}`}>
                        <tr>
                            {cols.length !== 0 &&
                                cols.map((col, index) => <th key={index} className="text-left py-4">{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ranking.length > 0 ? (
                                ranking.map((data, index) => {
                                    const revenueValue = data["Revenue by user (USD)"];
                                    const revenue = revenueValue
                                        ? parseFloat(revenueValue.replace(/[^0-9.-]+/g, ""))
                                        : 0;

                                    const hasDecimals = revenue % 1 !== 0;

                                    const formattedRevenue = revenue.toLocaleString("es-ES", {
                                        minimumFractionDigits: hasDecimals ? 0 : 0,
                                        maximumFractionDigits: hasDecimals ? 0 : 0,
                                    });

                                    return (
                                        <tr key={index}>
                                            <td className="p-2 text-xl font-bold text-left">#{index + 1}</td>
                                            <td className="text-left">{data["First Name"]} {data["Last Name"]}</td>
                                            <td className="text-left">{data["Email"]}</td>
                                            <td className="text-left min-w-[65px]">$ {formattedRevenue}</td>
                                            <td className="text-left">{data["Sales DigiPoints by user"]}</td>
                                            <td className="text-left">{data["Region"]}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="mb-6"><NoDataRanking /></div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableTopsRanking;
