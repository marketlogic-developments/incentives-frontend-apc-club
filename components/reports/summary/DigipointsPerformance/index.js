import React, { useState } from "react";
import { ArrowDown } from "../../../icons";
import { useTranslation } from "react-i18next";
import SelectSection from "./SelectSection";
import DigipointSection from "./DigipointSection";
import DigipointRedemptionSection from "./DigipointRedemptionSection";
import { useEffect } from "react";
import {
    getDigiPointContry,
    getDigiPointPerformance,
} from "../../../../store/reducers/sales.reducer";
import { useDispatch, useSelector } from "react-redux";
import DigiPointsTotal from "./DigiPointsTotal";
import axios from "axios";



const DigipoinstPerformance = () => {
    const [defaultYear, setDefaultYear] = useState(["2025"]);
    /* Variables and const */
    const [t, i18n] = useTranslation("global");
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.currentUser);
    const [filters, setFilters] = useState({
        year: "2025",
        company_name: "",
        region: "",
        quarter: "",
        country: "",
    });
    const [digipointUploaded, setDigipointUploaded] = useState([]);
    const [totalUpload, setTtotalUpload] = useState(0);
    const [assignedValue, setAssignedValue] = useState(0);
    const [redeemedValue, setRedeemedValue] = useState(0);

    const [companiesName, setCompaniesName] = useState([]);
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([
        { name: "NOLA" },
        { name: "SOLA" },
        { name: "BRAZIL" },
        { name: "MEXICO" }
    ]);
    const [quarters, setQuarters] = useState([
        { name: "2025-Q1" },
        { name: "2025-Q2" },
        { name: "2025-Q3" },
        { name: "2025-Q4" }
    ]);
    const [digipointSR, setDigipointSR] = useState({
        datas: {},
        yNames: [],
    });
    const [digipointsStatus, setDigipointStatus] = useState([]);
    const [digipointsRA, setDigipointRA] = useState({
        datas: [],
    });
    const [isDataReady, setIsReady] = useState(false);
    const multiSelect = [
        {
            multiSelect: false,
            placeholder: "Year",
            value: filters.year,
            dataSelect: defaultYear?.map((year) => ({
                label: year,
                value: year,
            })),
            onChange: (name, value) => handleFilters(name, value),
            searchable: true,
            icon: <ArrowDown />,
            name: "year",
        },
        {
            placeholder: "Quater",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: <ArrowDown />,
            name: "quater",
        },
        {
            placeholder: "Month",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: <ArrowDown />,
            name: "Month",
        },
        {
            placeholder: "Region",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: <ArrowDown />,
            name: "region",
        },
        {
            placeholder: "Country",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: <ArrowDown />,
            name: "country",
        },
        {
            placeholder: "Partner level",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: "",
            name: "partner_level",
        },
        {
            placeholder: "Partner",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: "",
            name: "partner",
        },
        {
            placeholder: "Market segment",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: "",
            name: "market_segment",
        },
        {
            placeholder: "Business unit",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: "",
            name: "business_unit",
        },
        {
            placeholder: "Business type",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: "",
            name: "business_type",
        },
        {
            placeholder: "Licensing type",
            value: [],
            dataSelect: [],
            searchable: true,
            icon: "",
            name: "licensiong",
        },
    ];
    const colorsData = [
        { name: "Digipoints", color: "#0149A0" },
        { name: "Expected", color: "#1473E6" },
        { name: "Assigned", color: "#75AFF5" },
        { name: "Redeemed", color: "#A4CDFF" },
    ];

    const handleFilters = (name, value) => {
        return setFilters({ ...filters, [name]: value === null ? "" : value });
    };
    const clearSelects = () => {
        setFilters({
            year: "2025",
            company_name: "",
            region: "",
            quarter: "",
            quarter_name: "",
            country: "",
        });
    };

    const mapColorsToData = (originalData, colorsData) => {
        const colorMap = colorsData.reduce((map, item) => {
            map[item.name] = item.color;
            return map;
        }, {});

        const modifiedData = originalData.map((item) => ({
            ...item,
            color: colorMap[item.name] || "#000000",
        }));

        return modifiedData;
    };

    const transformDataWithColors = (data, colorsByCountry) => {
        return data
            .filter((item) => item.category !== null)
            .map((item) => {
                const countryColor = colorsByCountry[item.category] || "#000000";
                const cleanedData = item.data.map((value) =>
                    value === 0 ? undefined : value
                );
                return {
                    name: item.category,
                    color: countryColor,
                    data: cleanedData,
                    label: item.labels,
                };
            });
    };

    const transformDataWithColors2 = (data, colorsByCountry) => {
        return data
            .filter((item) => item.name !== null)
            .map((item) => {
                const countryColor = colorsByCountry[item.name] || "#000000";
                const cleanedData = item.data.map((value) =>
                    value === 0 ? undefined : value
                );
                return {
                    name: item.name,
                    color: countryColor,
                    data: cleanedData,
                };
            });
    };

    const filterArray = (arr, valueToExclude) => {
        return arr.filter((item) => item !== valueToExclude);
    };

    const filterObject = (object, valueToExclude) => {
        return object.filter((item) => item.name !== valueToExclude);
    };

    const getUniqueFieldValues = (data, fieldName) => {
        const uniqueValues = new Set();

        data.forEach((item) => {
            const fieldValue = item[fieldName];
            if (fieldValue !== null && fieldValue !== "") {
                uniqueValues.add(fieldValue);
            }
        });

        return Array.from(uniqueValues);
    };
    const formattedNumber = (numero) => {
        // Redondear el número hacia abajo para eliminar la parte decimal
        numero = Math.floor(numero);

        // Convertir el número a cadena de texto
        let numeroStr = numero.toString();

        // Dividir la cadena en grupos de tres caracteres desde la derecha
        let grupos = [];
        while (numeroStr.length > 0) {
            grupos.unshift(numeroStr.slice(-3));
            numeroStr = numeroStr.slice(0, -3);
        }

        // Unir los grupos con comas y retornar el resultado
        return grupos.join(",");
    };

    /* GET DATA */
    useEffect(() => {
        setIsReady(false);

        const fetchSales = async () => {
            if (user && token) {
                if (user.is_superuser) {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=8c6f1313-7291-4450-911c-828b7d7411f5`,
                        {
                            params: {
                                organization_name: `${filters.company_name}`,
                                country_name: `${filters.country}`,
                                region_name: `${filters.region}`,
                                quarter_name: `${filters.quarter || ""}`,
                            },
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    // países
                    const response_1 = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d014c`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    setCountries(response_1.data.result);

                    // empresas
                    const response_2 = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d014b`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    setCompaniesName(response_2.data.result);

                    let promotionPoints = 0;
                    let behaviorPoints = 0;

                    const groupedData = response.data.result.reduce((acc, current) => {
                        const region = current.region_name;
                        const category = current.category;
                        const total_points = Number(current.total_points ?? 0);
                        const assigned = Number(current.total_points_assigned ?? 0);
                        const percent = Number(current.ten_percent_points_assigned ?? 0);

                        if (category === 'Promotion') {
                            promotionPoints += total_points;
                        } else if (category === 'BEHAVIOR') {
                            behaviorPoints += total_points;
                        } else {
                            if (!acc.regions[region]) {
                                acc.regions[region] = {
                                    region_name: region,
                                    total_points_assigned: 0,
                                    ten_percent_points_assigned: 0,
                                    total_points: 0,
                                };
                            }

                            acc.regions[region].total_points_assigned += assigned;
                            acc.regions[region].ten_percent_points_assigned += percent;
                            acc.regions[region].total_points += total_points;

                            acc.totals.total_points_assigned += assigned;
                            acc.totals.ten_percent_points_assigned += percent;
                            acc.totals.total_points += total_points;
                        }

                        return acc;
                    }, {
                        regions: {},
                        totals: { total_points_assigned: 0, ten_percent_points_assigned: 0, total_points: 0 }
                    });

                    // Bar chart
                    const transformedDatas = Object.values(groupedData.regions).map(region => ({
                        name: region.region_name,
                        data: [
                            region.total_points + region.ten_percent_points_assigned,
                            region.total_points_assigned + region.ten_percent_points_assigned,
                            0
                        ]
                    }));

                    const yNames = ["Total Points", "Assigned", "Redeemed"];

                    setDigipointSR({
                        datas: transformDataWithColors2(transformedDatas, {
                            MEXICO: "#1C2226",
                            NOLA: "#2799F6",
                            SOLA: "#1473E6",
                            BRAZIL: "#21A5A2",
                        }),
                        yNames,
                    });

                    // Pie chart
                    const dataUploaded = [
                        {
                            name: "Sales",
                            value: groupedData.totals.total_points + groupedData.totals.ten_percent_points_assigned
                        },
                        {
                            name: "Promotion",
                            value: promotionPoints
                        },
                        {
                            name: "Behavior",
                            value: behaviorPoints
                        }
                    ];

                    setDigipointUploaded(dataUploaded);

                    setTtotalUpload(
                        groupedData.totals.total_points +
                        groupedData.totals.ten_percent_points_assigned +
                        promotionPoints +
                        behaviorPoints
                    );

                    setAssignedValue(
                        groupedData.totals.total_points_assigned +
                        groupedData.totals.ten_percent_points_assigned
                    );

                    setRedeemedValue(0);
                    setIsReady(true);
                }
            }
        };

        fetchSales();
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
                    quarters={quarters}
                    multiSelect={multiSelect}
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
                {/* <DigipointRedemptionSection
                    dataDigStatus={digipointsStatus}
                    isDataReady={isDataReady}
                    digipointsRA={digipointsRA}
                /> */}
            </div>
            <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4"></div>
        </div>
    );
};

export default DigipoinstPerformance;
