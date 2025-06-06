/* DigipoinstPerformance.jsx */

import React, { useState, useEffect } from "react";
import SelectSection from "./SelectSection";
import DigipointSection from "./DigipointSection";
import DigiPointsTotal from "./DigiPointsTotal";
import { useSelector } from "react-redux";
import axios from "axios";

const DigipoinstPerformance = () => {
    const { user } = useSelector((s) => s.currentUser);

    /* filtros ------------------------------------------------------------ */
    const [filters, setFilters] = useState({
        year: "2025",
        company_name: "",
        region: "",
        quarter: "",
        country: "",
    });

    /* catálogos ---------------------------------------------------------- */
    const [defaultYear] = useState(["2025"]);
    const [companiesName, setCompaniesName] = useState([]);
    const [countries, setCountries] = useState([]);
    const [regions] = useState([
        { name: "NOLA" },
        { name: "SOLA" },
        { name: "BRAZIL" },
        { name: "MEXICO" },
    ]);

    /* datos ui ----------------------------------------------------------- */
    const [digipointUploaded, setDigipointUploaded] = useState([]);
    const [digipointSR, setDigipointSR] = useState({ datas: {}, yNames: [] });
    const [totalUpload, setTtotalUpload] = useState(0);
    const [assignedValue, setAssignedValue] = useState(0);
    const [redeemedValue, setRedeemedValue] = useState(0);
    const [isDataReady, setIsReady] = useState(false);

    /* onChange de selects ------------------------------------------------ */
    const handleFilters = (maybeName, maybeValue) => {
        /* onChange(name, value) */
        if (typeof maybeName === "string" && maybeValue !== undefined) {
            setFilters((p) => ({ ...p, [maybeName]: maybeValue ?? "" }));
            return;
        }
        /* onChange(value) */
        const value = maybeName;
        if (value === null) return;
        const field =
            (defaultYear.includes(value) && "year") ||
            (companiesName.some((c) => c.name === value) && "company_name") ||
            (countries.some((c) => c.name === value) && "country") ||
            (regions.some((r) => r.name === value) && "region");
        if (field) setFilters((p) => ({ ...p, [field]: value }));
    };

    const clearSelects = () =>
        setFilters({
            year: "2025",
            company_name: "",
            region: "",
            quarter: "",
            country: "",
        });

    /* fetch datos -------------------------------------------------------- */
    useEffect(() => {
        let cancel = false;
        const fetchSales = async () => {
            if (!user?.is_superuser) return;
            setIsReady(false);

            /* consultas */
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=8c6f1313-7291-4450-911c-828b7d7411f5`,
                {
                    params: {
                        organization_name: filters.company_name,
                        country_name: filters.country,
                        region_name: filters.region,
                        quarter_name: filters.quarter,
                    },
                },
                { headers: { Authorization: `Bearer ${user.token}` } },
            );

            const { data: countriesData } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d014c`,
                { headers: { Authorization: `Bearer ${user.token}` } },
            );
            const { data: companiesData } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d014b`,
                { headers: { Authorization: `Bearer ${user.token}` } },
            );
            if (cancel) return;

            setCountries(countriesData.result);
            setCompaniesName(companiesData.result);

            /* acumuladores */
            let promotion = 0,
                behavior = 0,
                redeemed = 0,
                uploadSum = 0,
                assignedSum = 0;

            /* categorías válidas para los totales */
            const validCats = new Set([
                "10% ASSIGNMENT",
                "Promotion",
                "BEHAVIOR",
                "Behavior",
                "CC",
                "DC",
                "Certified points assigned",
            ]);

            /* agrupación */
            const grouped = data.result.reduce(
                (acc, r) => {
                    const region = r.region_name?.trim() || "Unknown";
                    acc.regions[region] ??= {
                        region_name: region,
                        total_points: 0,
                        total_points_assigned: 0,
                        ten_percent_points_assigned: 0,
                        redeemed_points: 0,
                        isValid: !!r.region_name,
                    };
                    const g = acc.regions[region];

                    const total = +r.total_points || 0;
                    const assigned = +r.total_points_assigned || 0;
                    const ten = +r.ten_percent_points_assigned || 0;

                    /* sumas por categoría */
                    if (r.category === "Promotion") promotion += total;
                    else if (r.category === "BEHAVIOR" || r.category === "Behavior") behavior += total;
                    else if (r.category === "Redeemed") {
                        redeemed += total;
                        g.redeemed_points += total;
                    }

                    /* totales globales requeridos */
                    if (validCats.has(r.category)) {
                        uploadSum += total;
                        assignedSum += assigned;
                    }

                    /* acumulados por región */
                    g.total_points += total;
                    g.total_points_assigned += assigned;
                    g.ten_percent_points_assigned += ten;

                    acc.totals.total_points += total;
                    acc.totals.total_points_assigned += assigned;
                    acc.totals.ten_percent_points_assigned += ten;
                    return acc;
                },
                {
                    regions: {},
                    totals: { total_points: 0, total_points_assigned: 0, ten_percent_points_assigned: 0 },
                },
            );

            /* series para gráfico */
            const series = Object.values(grouped.regions)
                .filter((r) => r.isValid)
                .map((r) => ({
                    name: r.region_name,
                    data: [
                        r.total_points,
                        r.total_points_assigned + r.ten_percent_points_assigned,
                        r.redeemed_points,
                    ],
                    color:
                        {
                            MEXICO: "#1C2226",
                            NOLA: "#2799F6",
                            SOLA: "#1473E6",
                            BRAZIL: "#21A5A2",
                        }[r.region_name] || "#000",
                }));

            /* estados UI finales */
            setDigipointSR({ datas: series, yNames: ["Total Points", "Assigned", "Redeemed"] });
            setDigipointUploaded([
                { name: "Sales", value: uploadSum - promotion - behavior},
                { name: "Promotion", value: promotion },
                { name: "Behavior", value: behavior },
            ]);
            setTtotalUpload(uploadSum);
            setAssignedValue(assignedSum);
            setRedeemedValue(redeemed);
            setIsReady(true);
        };
        fetchSales();
        return () => {
            cancel = true;
        };
    }, [filters, user]);

    return (
        <div className="m-5">
            <div className="pt-2 grid items-center sm:grid-cols-6 grid-cols-2 gap-3">
                <SelectSection
                    filters={filters}
                    year={defaultYear}
                    companiesName={companiesName}
                    countries={countries}
                    regions={regions}
                    handleFilters={handleFilters}
                    clearSelects={clearSelects}
                />
            </div>

            {isDataReady && (
                <DigiPointsTotal
                    dataLoaded={isDataReady}
                    totalSaleGoal={{
                        expected: totalUpload,
                        reached: assignedValue,
                        progress: redeemedValue,
                    }}
                />
            )}

            <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
                <DigipointSection
                    dataUploaded={digipointUploaded}
                    isDataReady={isDataReady}
                    dataSR={digipointSR}
                />
            </div>
        </div>
    );
};

export default DigipoinstPerformance;