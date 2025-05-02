import React, { useState } from "react";
import { ArrowDown } from "../../../icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSalesYtd } from "../../../../store/reducers/sales.reducer";
import FilterSection from "./FilterSection";
import SalesGoalsSection from "./SalesGoalsSection";
import RegionGoalSection from "./RegionGoalSection";
import CdpSection from "./CdpSection";
import MarketplaceSection from "./MarketplaceSection";
import TableSection from "./TableSection";
import axios from "axios";



const SalesYtd = () => {
    const [defaultYear, setDefaultYear] = useState(["2025"]);
    /* Variable and const */
    const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();
    const [sales, setSales] = useState({
        expectedRevenueSum: 0,
        totalRevenueSum: 0
    });
    const { user, token } = useSelector((state) => state.currentUser);
    const [regionVsGoals, setRegionVsGoals] = useState({
        total: 0,
        expected: 0,
        totalColor: "",
        expectedColor: "#828282",
    });
    const [cloudDocument, setCloudDocument] = useState({
        expectedCloud: 0,
        salesCloud: 0,
        expectedDoc: 0,
        salesDoc: 0,
        expected_cc_renew: 0,
        expected_cc_newbusiness: 0,
        expected_dc_renew: 0,
        expected_dc_newbusiness: 0,
        sales_cc_renewal: 0,
        sales_cc_newbusiness: 0,
        sales_dc_renewal: 0,
        sales_dc_newbusiness: 0,
    });

    const [marketplaceVip, setMarketplaceVip] = useState();
    const [levelSale, setLevelSale] = useState();
    const [dataTable, setDataTable] = useState();
    const [filters, setFilters] = useState({
        year: "2025",
        company_name: "",
        level: "",
        region: "",
        country_id: "",
        quarter: "",
        month: "",
        marketSegment: "",
        businessUnit: "",
        company_type: "",
    });
    const filterAux = {
        year: "",
        company_name: "",
        level: "",
        region: "",
        country_id: "",
        quarter: "",
        month: "",
        marketSegment: "",
        businessUnit: "",
        company_type: "",
    };
    const [multiFilter, setMultiFilter] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [companiesName, setCompaniesName] = useState([]);
    const [levels, setLevels] = useState([]);
    const [regions, setRegions] = useState(["NOLA", "SOLA", "MEXICO", "BRAZIL"]);
    const [countries, setCountries] = useState([]);
    const [quarters, setQuarters] = useState([
        { name: "2025-Q1" },
        { name: "2025-Q2" },
        { name: "2025-Q3" },
        { name: "2025-Q4" }
    ]);
    const [month, setMonth] = useState([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
    ]);
    const [marketSegment, setMarketSegment] = useState([
        "Teams",
        "Enterprise",
        "Education",
        "Acrobat Pro",
    ]);
    const [businessUnit, setBusinessUnit] = useState([
        "Document Cloud",
        "Creative Cloud",
    ]);
    const [companies, setCompaniesType] = useState([]);
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
            multiSelect: true,
            placeholder: "Company name",
            value: multiFilter,
            dataSelect: companiesName?.map((company_name) => ({
                label: company_name,
                value: company_name,
            })),
            onChange: (name, value) => handleMultiFilters(name, value),
            searchable: true,
            icon: <ArrowDown />,
            name: "company_name",
        },
        {
            multiSelect: false,
            placeholder: "Levels",
            value: filters.level,
            dataSelect: levels?.map((level) => ({
                label: level,
                value: level,
            })),
            onChange: (name, value) => handleFilters(name, value),
            searchable: true,
            icon: <ArrowDown />,
            name: "level",
        },
        {
            multiSelect: false,
            placeholder: "Region",
            value: filters.region,
            dataSelect: regions?.map((region) => ({
                label: region,
                value: region,
            })),
            onChange: (name, value) => handleFilters(name, value),
            searchable: true,
            icon: <ArrowDown />,
            name: "region",
        },
        {
            multiSelect: false,
            placeholder: "Country",
            value: filters.country_id,
            dataSelect: countries?.map((country_id) => ({
                label: country_id,
                value: country_id,
            })),
            onChange: (name, value) => handleFilters(name, value),
            searchable: true,
            icon: <ArrowDown />,
            name: "country_id",
        },
        {
            multiSelect: false,
            placeholder: "Market Segment",
            value: filters.marketSegment,
            dataSelect: marketSegment?.map((marketSegment) => ({
                label: marketSegment,
                value: marketSegment,
            })),
            onChange: (name, value) => handleFilters(name, value),
            searchable: true,
            icon: <ArrowDown />,
            name: "marketSegment",
        },
        {
            multiSelect: false,
            placeholder: "Business Unit",
            value: filters.businessUnit,
            dataSelect: businessUnit?.map((businessUnit) => ({
                label: businessUnit,
                value: businessUnit,
            })),
            onChange: (name, value) => handleFilters(name, value),
            searchable: true,
            icon: <ArrowDown />,
            name: "businessUnit",
        },
    ];
    const xValuesLine = ["Q1", "Q2", "Q3", "Q4"];
    const colorMapping = {
        NOLA: "#2799F6",
        SOLA: "#1473E6",
        MEXICO: "#1C2226",
        BRAZIL: "#21A5A2",
        GOLD: "#232B2F",
        PLATINUM: "#1473E6",
        DISTRIBUTOR: "#21A5A2",
        CERTIFIED: "#21A5A2",
    };

    /* SELECTS */
    const handleFilters = (name, value) => {
        return setFilters({ ...filters, [name]: value === null ? "" : value });
    };

    const handleMultiFilters = (name, value) => {
        try {
            if (value !== "") {
                setMultiFilter(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const clearSelects = () => {
        setFilters({
            year: "",
            company_name: "",
            company_type: "",
            region: "",
            quarter_name: "",
            country_id: "",
            level: "",
        });
        setMultiFilter([]);
    };

    /* REGION VS GOALS */
    const getColorForField = (value, mapping, defaultColor = "#828282") => {
        return mapping[value] || defaultColor;
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


    const multiFilterButton = () => {
        handleFilters("company_name", multiFilter.join("~|~"));
    };

    useEffect(() => {
        setDataLoaded(false);

        if (user) {
            const fetchGoals = async () => {
                if (user.is_superuser) {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a579`,
                        {
                            params: {
                                region_name: `${filters.region}`,
                                country_name: `${filters.country_id}`,
                                organization_ids: `${filters.company_name.replaceAll("~|~", ",")}`,
                            },
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    return response.data.result[0];
                };
            };

            const fetchGoalsExtended = async () => {
                if (user.is_superuser) {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a582`,
                        {
                            params: {
                                region_name: `${filters.region}`,
                                country_name: `${filters.country_id}`,
                                organization_ids: `${filters.company_name.replaceAll("~|~", ",")}`,
                            },
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const goals = response.data.result[0].goals_summary;

                    // 1. Suma total por región
                    const regionTotals = {};

                    // 2. Suma total de atributos VIP_ y VMP_ por quarter
                    const quarterTotals = {};

                    // 3. Suma total por tipo de canal (GOLD y PLATINUM)
                    const channelTotals = { GOLD: 0, PLATINUM: 0 };

                    if (goals) {
                        for (const goal of goals) {
                            const { region, quarter, total_amount, distribution_channel, extended_attributes } = goal;

                            // Región
                            regionTotals[region] = (regionTotals[region] || 0) + total_amount;

                            // Quarter
                            if (!quarterTotals[quarter]) {
                                quarterTotals[quarter] = { VIP_: 0, VMP_: 0 };
                            }

                            for (const key in extended_attributes) {
                                if (key.startsWith("VIP_")) {
                                    quarterTotals[quarter].VIP_ += extended_attributes[key];
                                }
                                if (key.startsWith("VMP_")) {
                                    quarterTotals[quarter].VMP_ += extended_attributes[key];
                                }
                            }

                            // Canal
                            if (channelTotals[distribution_channel] !== undefined) {
                                channelTotals[distribution_channel] += total_amount;
                            }
                        }
                    }

                    return {
                        regionTotals,
                        quarterTotals,
                        channelTotals
                    }
                };
            };

            const fetchSales = async () => {
                if (user.is_superuser) {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a576`,
                        {
                            params: {
                                region_name: `${filters.region}`,
                                country_name: `${filters.country_id}`,
                                id: `${filters.company_name.replaceAll("~|~", ",")}`,
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

                    // Limpia el tipo (eliminar espacios y poner en minúsculas)
                    const cleanType = (type) => (type ?? '').toString().trim().toLowerCase();

                    // Acumuladores generales
                    let totalByCategory = { CC: 0, DC: 0 };
                    let totalBySubCategory = { VIP: 0, VMP: 0 };
                    let totalByType = { 'New Business': 0, Autorenewal: 0 };

                    // Acumuladores para combinaciones específicas
                    let vipNewBusinessCC = 0;
                    let vipNewBusinessDC = 0;
                    let vmpAutoRenewalCC = 0;
                    let vmpAutoRenewalDC = 0;
                    let vmpNewBusinessCC = 0;
                    let vmpNewBusinessDC = 0;

                    response.data.result.forEach((item) => {
                        if (!["Promotion", "BEHAVIOR"].includes(item.category)) {
                            const category = item.category;
                            const sub = item.sub_category;
                            const type = cleanType(item.type);
                            const revenue = Number(item.total_revenue || 0);

                            // Totales generales
                            if (category === 'CC' || category === 'DC') {
                                totalByCategory[category] += revenue;
                            };

                            if (sub === 'VIP' || sub === 'VMP') {
                                totalBySubCategory[sub] += revenue;
                            };

                            if (type === 'new business') {
                                totalByType['New Business'] += revenue;
                            } else if (type === 'autorenewal' || type === 'autorrenewal') {
                                totalByType['Autorenewal'] += revenue;
                            };

                            // Totales específicos para los setters
                            if (sub === 'VIP' && type === 'new business') {
                                if (category === 'CC') vipNewBusinessCC += revenue;
                                if (category === 'DC') vipNewBusinessDC += revenue;
                            };

                            if (sub === 'VMP' && type === 'autorenewal') {
                                if (category === 'CC') vmpAutoRenewalCC += revenue;
                                if (category === 'DC') vmpAutoRenewalDC += revenue;
                            };

                            if (sub === 'VMP' && type === 'new business') {
                                if (category === 'CC') vmpNewBusinessCC += revenue;
                                if (category === 'DC') vmpNewBusinessDC += revenue;
                            };  
                        };
                    });

                    return {
                        totalByCategory,
                        totalBySubCategory,
                        totalByType,
                        vipNewBusinessCC,
                        vipNewBusinessDC,
                        vmpAutoRenewalCC,
                        vmpAutoRenewalDC,
                        vmpNewBusinessCC,
                        vmpNewBusinessDC,
                    }
                };
            };

            const fetchSalesExtended = async () => {
                if (user.is_superuser) {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a581`,
                        {
                            params: {
                                region_name: `${filters.region}`,
                                country_name: `${filters.country_id}`,
                                organization_ids: `${filters.company_name.replaceAll("~|~", ",")}`,
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

                    const sales = response.data?.result?.[0]?.sales_summary ?? [];

                    const quarters = ["2025-Q1", "2025-Q2", "2025-Q3", "2025-Q4"];
                    const vip = [];
                    const vmp = [];
                    let totalVip = 0;
                    let totalVmp = 0;

                    quarters.forEach((q) => {
                        const vipTotal = sales
                            .filter((s) => s.quarter === q && s.licensing_category === "VIP")
                            .reduce((sum, s) => sum + s.total_revenue, 0);

                        const vmpTotal = sales
                            .filter((s) => s.quarter === q && s.licensing_category === "VMP")
                            .reduce((sum, s) => sum + s.total_revenue, 0);

                        vip.push(vipTotal);
                        vmp.push(vmpTotal);

                        totalVip += vipTotal;
                        totalVmp += vmpTotal;
                    });

                    const total = totalVip + totalVmp;

                    const marketplaceVipData = {
                        vip,
                        vmp,
                        totalVip,
                        totalVmp,
                        percentageVip: total > 0 ? ((totalVip / total) * 100).toFixed(2) : "0",
                        percentageVmp: total > 0 ? ((totalVmp / total) * 100).toFixed(2) : "0",
                    };

                    const revenueByRegion = {};
                    const revenueByLevel = { GOLD: 0, PLATINUM: 0 };

                    for (const record of sales) {
                        const { region, total_revenue, distribution_channel } = record;

                        revenueByRegion[region] = (revenueByRegion[region] || 0) + total_revenue;

                        if (revenueByLevel[distribution_channel] !== undefined) {
                            revenueByLevel[distribution_channel] += total_revenue;
                        }
                    }

                    return {
                        marketplaceVipData,
                        revenueByRegion,
                        revenueByLevel,
                    };
                }
            };


            const fetchOrganizations = async () => {
                if (user.is_superuser) {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d014b`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    return response.data.result;
                };
            };

            const fetchCountries = async () => {
                if (user.is_superuser) {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d014c`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    return response.data.result;
                };
            };

            const loadData = async () => {
                const [dataGoals, dataGoalsExtended, dataSales, dataSalesExtended, dataOrganizations, dataCountries] = await Promise.all([
                    fetchGoals(),
                    fetchGoalsExtended(),
                    fetchSales(),
                    fetchSalesExtended(),
                    fetchOrganizations(),
                    fetchCountries()
                ]);

                setCompaniesName(dataOrganizations || []);
                setCountries(dataCountries || []);

                if (dataGoals && dataSales) {
                    setSales({
                        totalRevenueSum:
                            (dataSales.totalByCategory?.CC ?? 0) +
                            (dataSales.totalByCategory?.DC ?? 0),
                        expectedRevenueSum:
                            (dataGoals.extended_attributes?.CC ?? 0) +
                            (dataGoals.extended_attributes?.DC ?? 0),
                    });

                    setCloudDocument({
                        expectedCloud: dataGoals.extended_attributes?.CC ?? 0,
                        salesCloud: dataSales.totalByCategory?.CC ?? 0,
                        expectedDoc: dataGoals.extended_attributes?.DC ?? 0,
                        salesDoc: dataSales.totalByCategory?.DC ?? 0,
                        expected_cc_renew: dataGoals.extended_attributes?.VMP_AUTO_RENEWAL_CC ?? 0,
                        expected_cc_newbusiness:
                            (dataGoals.extended_attributes?.VIP_NEW_BUSINESS_CC ?? 0) +
                            (dataGoals.extended_attributes?.VMP_NEW_BUSINESS_CC ?? 0),
                        expected_dc_renew: dataGoals.extended_attributes?.VMP_AUTO_RENEWAL_DC ?? 0,
                        expected_dc_newbusiness:
                            (dataGoals.extended_attributes?.VIP_NEW_BUSINESS_DC ?? 0) +
                            (dataGoals.extended_attributes?.VMP_NEW_BUSINESS_DC ?? 0),
                        sales_cc_renewal: dataSales?.vmpAutoRenewalCC ?? 0,
                        sales_cc_newbusiness:
                            (dataSales?.vipNewBusinessCC ?? 0) + (dataSales?.vmpNewBusinessCC ?? 0),
                        sales_dc_renewal: dataSales?.vmpAutoRenewalDC ?? 0,
                        sales_dc_newbusiness:
                            (dataSales?.vipNewBusinessDC ?? 0) + (dataSales?.vmpNewBusinessDC ?? 0),
                    });
                };

                if (
                    dataGoalsExtended?.regionTotals &&
                    dataSalesExtended?.revenueByRegion
                ) {
                    const nameMapping = {
                        BRAZIL: "BRAZIL",
                        MEXICO: "MEXICO",
                        NOLA: "NOLA",
                        SOLA: "SOLA",
                    };
                
                    const allRegions = ["BRAZIL", "MEXICO", "NOLA", "SOLA"];
                
                    const regionVsGoalsArray = allRegions.map((region) => {
                        const displayName = nameMapping[region] || region;
                        const revenue = dataSalesExtended.revenueByRegion[region] || 0;
                        const expected = dataGoalsExtended.regionTotals[region] || 0;
                        const colorKey = region.toUpperCase();
                
                        return {
                            name: displayName,
                            total: revenue,
                            expected: expected,
                            totalColor: getColorForField(colorKey, colorMapping),
                            expectedColor: "#828282",
                        };
                    });
                
                    setRegionVsGoals(regionVsGoalsArray);
                    setMarketplaceVip(dataSalesExtended.marketplaceVipData);
                }

                if (dataSalesExtended && dataGoalsExtended) {
                    const levelsChart = ["GOLD", "PLATINUM"];

                    const barCircleData = levelsChart.map((level) => ({
                        level,
                        total_revenue: dataSalesExtended.revenueByLevel[level] || 0,
                        total_expected_revenue: dataGoalsExtended.channelTotals[level] || 0,
                        color: level === "GOLD" ? "#232B2F" : "#1473E6"
                    }));

                    setLevelSale(barCircleData);
                };

                setDataLoaded(true);
            };

            loadData();

        }
    }, [user, filters]);

    return (
        <div className="m-5">
            <FilterSection
                filters={filters}
                multiFilter={multiFilter}
                year={defaultYear}
                companyName={companiesName}
                levels={levels}
                region={regions}
                countries={countries}
                quarters={quarters}
                month={month}
                marketSegment={marketSegment}
                businessUnit={businessUnit}
                companyType={companies}
                handleFilters={handleFilters}
                handleMultiFilters={handleMultiFilters}
                multiFilterButton={multiFilterButton}
                multiSelect={multiSelect}
                clearSelects={clearSelects}
            />
            {dataLoaded && (
                <SalesGoalsSection
                    dataLoaded={dataLoaded}
                    totalSaleGoal={{
                        expected: formattedNumber(sales.expectedRevenueSum),
                        reached: formattedNumber(sales.totalRevenueSum),
                        progress: `${Number(
                            (sales.totalRevenueSum * 100) / sales.expectedRevenueSum
                        ).toFixed(2)} %`,
                    }}
                />
            )}
            {dataLoaded && (
                <RegionGoalSection
                    dataLoaded={dataLoaded}
                    regionVsGoals={regionVsGoals}
                />
            )}
            {!dataLoaded ? (
                <div className="lds-dual-ring"></div>
            ) : (
                <CdpSection data={cloudDocument} />
            )}
            {dataLoaded && (
                <MarketplaceSection
                    dataLoaded={dataLoaded}
                    barCircleChart={levelSale}
                    xValuesLine={xValuesLine}
                    marketplaceVip={marketplaceVip}
                    salesVIPVMP={sales}
                />
            )}
        </div>
    );
};

export default SalesYtd;