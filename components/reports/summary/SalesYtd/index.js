import React, { useState } from "react";
import { ArrowDown } from "../../../icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSalesBySegmentAll,
  getSalesYtd,
} from "../../../../store/reducers/sales.reducer";
import { useMemo } from "react";
import FilterSection from "./FilterSection";
import SortedTable from "../../../table/SortedTable";
import SalesGoalsSection from "./SalesGoalsSection";
import RegionGoalSection from "./RegionGoalSection";
import CdpSection from "./CdpSection";
import MarketplaceSection from "./MarketplaceSection";

const SalesYtd = () => {
  /* Variable and const */
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [sales, setSales] = useState();
  const token = useSelector((state) => state.user.token);
  const [regionVsGoals, setRegionVsGoals] = useState({
    name: "",
    value: 0,
    color: "",
  });
  const [marketplaceVip, setMarketplaceVip] = useState();
  const [levelSale, setLevelSale] = useState();
  const [dataTable, setDataTable] = useState();
  const [filters, setFilters] = useState({
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
  const [dataLoaded, setDataLoaded] = useState(false);
  const [companiesName, setCompaniesName] = useState();
  const [levels, setLevels] = useState();
  const [regions, setRegions] = useState();
  const [countries, setCountries] = useState();
  const [quarter, setQuarter] = useState(["q1", "q2", "q3", "q4"]);
  const [month, setMonth] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
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
  const [companies, setCompaniesType] = useState();
  const multiSelect = [
    {
      placeholder: "Company name",
      value: filters.company_name,
      dataSelect: companiesName?.map((company_name) => ({
        label: company_name,
        value: company_name,
      })),
      onChange: (name, value) => handleFilters(name, value),
      searchable: true,
      icon: <ArrowDown />,
      name: "company_name",
    },
    {
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
    /* {
      placeholder: "Quarter",
      value: filters.quarter,
      dataSelect: quarter?.map((quarter) => ({
        label: quarter,
        value: quarter,
      })),
      onChange: (name, value) => handleFilters(name, value),
      searchable: true,
      icon: <ArrowDown />,
      name: "quarter",
    },
    {
      placeholder: "Month",
      value: filters.month,
      dataSelect: month?.map((month) => ({
        label: month,
        value: month,
      })),
      onChange: (name, value) => handleFilters(name, value),
      searchable: true,
      icon: <ArrowDown />,
      name: "month",
    }, */
    {
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
    /* {
      placeholder: "Company",
      value: filters.company_type,
      dataSelect: companies?.map((company_type) => ({
        label: company_type,
        value: company_type,
      })),
      onChange: (name, value) => handleFilters(name, value),
      searchable: true,
      icon: <ArrowDown />,
      name: "company_type",
    }, */
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

  /* SET DATA */
  const sumSalesForCompanies = (data, companyTypes) => {
    const result = [];

    companyTypes.forEach((companyType) => {
      const companyData = data.filter(
        (item) => item.company_type === companyType
      );

      const salesSums = {
        company_type: companyType,
        sales_education_cc: "0",
        sales_education_dc: "0",
        sales_enterprise_cc: "0",
        sales_enterprise_dc: "0",
        sales_teams_cc: "0",
        sales_acrobat_pro_dc: "0",
      };

      companyData.forEach((item) => {
        salesSums.sales_education_cc = (
          parseFloat(salesSums.sales_education_cc) +
          (parseFloat(item.sales_education_cc) || 0)
        ).toFixed(2);

        salesSums.sales_education_dc = (
          parseFloat(salesSums.sales_education_dc) +
          (parseFloat(item.sales_education_dc) || 0)
        ).toFixed(2);

        salesSums.sales_enterprise_cc = (
          parseFloat(salesSums.sales_enterprise_cc) +
          (parseFloat(item.sales_enterprise_cc) || 0)
        ).toFixed(2);

        salesSums.sales_enterprise_dc = (
          parseFloat(salesSums.sales_enterprise_dc) +
          (parseFloat(item.sales_enterprise_dc) || 0)
        ).toFixed(2);

        salesSums.sales_teams_cc = (
          parseFloat(salesSums.sales_teams_cc) +
          (parseFloat(item.sales_teams_cc) || 0)
        ).toFixed(2);

        salesSums.sales_acrobat_pro_dc = (
          parseFloat(salesSums.sales_acrobat_pro_dc) +
          (parseFloat(item.sales_acrobat_pro_dc) || 0)
        ).toFixed(2);
      });

      result.push(salesSums);
    });

    return result;
  };

  /* SELECTS */
  const handleFilters = (name, value) => {
    return setFilters({ ...filters, [name]: value });
  };

  const clearSelects = () => {
    setFilters({
      company_name: "",
      company_type: "",
      region: "",
      country_id: "",
      level: "",
    });
  };

  /* REGION VS GOALS */
  const getColorForField = (value, mapping, defaultColor = "#828282") => {
    return mapping[value] || defaultColor;
  };

  const calculateTotalRevenueByRegion = (data) => {
    const regions = ["NOLA", "SOLA", "MEXICO", "BRAZIL"];
    const revenueByRegion = {};

    regions.forEach((region) => {
      const totalRevenue = data.reduce((total, obj) => {
        if (obj.region === region) {
          const revenue = parseFloat(Number(obj.total_revenue).toFixed(2));
          return total + revenue;
        }
        return total;
      }, 0);
      revenueByRegion[region] = totalRevenue;
    });

    return revenueByRegion;
  };

  const calculateAndFormatData = (
    data,
    calculateTotalFunction,
    getColorFunction,
    colorMapping
  ) => {
    const revenueByRegion = calculateTotalFunction(data);
    const formattedData = Object.keys(revenueByRegion).map((region) => ({
      name: region,
      value: Number(revenueByRegion[region]).toFixed(2),
      color: getColorFunction(region, colorMapping),
    }));
    return formattedData;
  };

  /* MARKETPLACE & VIP */
  const calculateQuarterlyTotals = (data, propertyNames) => {
    const quarterlyTotals = propertyNames.reduce((totals, propertyName) => {
      totals[propertyName] = {
        Q1: 0,
        Q2: 0,
        Q3: 0,
        Q4: 0,
      };
      return totals;
    }, {});

    data.forEach((obj) => {
      propertyNames.forEach((propertyName) => {
        for (let quarter = 1; quarter <= 4; quarter++) {
          quarterlyTotals[propertyName][`Q${quarter}`] += parseFloat(
            obj[`${propertyName}_revenue_q${quarter}`]
          );
        }
      });
    });

    return quarterlyTotals;
  };

  const formatQuarterlyTotals = (totals) => {
    const formattedTotals = {};
    for (const propertyName in totals) {
      formattedTotals[propertyName] = {
        Q1: totals[propertyName].Q1.toFixed(2),
        Q2: totals[propertyName].Q2.toFixed(2),
        Q3: totals[propertyName].Q3.toFixed(2),
        Q4: totals[propertyName].Q4.toFixed(2),
      };
    }
    return formattedTotals;
  };

  const formatterDataToBarChart = (
    data,
    calculateQuarterlyTotals,
    formatTotalsFunction,
    legendLabels
  ) => {
    const quarterlyTotals = calculateQuarterlyTotals(data, legendLabels);
    const formattedTotals = formatTotalsFunction(quarterlyTotals);

    const dataObjects = legendLabels.map((label) => ({
      label: label,
      data: Object.keys(formattedTotals[label]).map((quarter) =>
        Number(formattedTotals[label][quarter])
      ),
    }));

    return dataObjects;
  };

  /* LEVEL VS SALES GOAL */
  const calculateRevenueDifferences = (data, levels) => {
    const revenueDifferences = [];

    levels.forEach((level) => {
      const filteredData = data.filter((item) => item.level === level);
      const totalRevenue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.total_revenue),
        0
      );
      const totalExpectedRevenue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.expected_revenue),
        0
      );
      const revenueDifference = totalExpectedRevenue - totalRevenue;

      revenueDifferences.push({
        data: revenueDifference.toFixed(2),
        total_expected_revenue: totalExpectedRevenue.toFixed(2),
        total_revenue: totalRevenue.toFixed(2),
        level: level,
        color: getColorForField(level, colorMapping),
      });
    });

    return revenueDifferences;
  };

  /* TOTAL SALES VS GOALS */
  const calculateRevenueSum = (data) => {
    const filteredItems = data.filter(
      (item) => item.company_type === "RESELLER"
    );

    const totalRevenueSum = filteredItems.reduce((sum, item) => {
      return sum + parseFloat(item.total_revenue);
    }, 0);

    const expectedRevenueSum = filteredItems.reduce((sum, item) => {
      return sum + parseFloat(item.expected_revenue);
    }, 0);

    return {
      totalRevenueSum,
      expectedRevenueSum,
    };
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

  useEffect(() => {
    dispatch(getSalesYtd(token, filters)).then((res) => {
      const revenueSums = calculateRevenueSum(res.payload);
      setSales(revenueSums);

      const formattedData = calculateAndFormatData(
        res.payload,
        calculateTotalRevenueByRegion,
        getColorForField,
        colorMapping
      );
      setRegionVsGoals(formattedData);

      const formattedTotals = formatterDataToBarChart(
        res.payload,
        calculateQuarterlyTotals,
        formatQuarterlyTotals,
        ["vip", "vmp"]
      );
      setMarketplaceVip({
        vip: formattedTotals.find((item) => item.label === "vip").data,
        vmp: formattedTotals.find((item) => item.label === "vmp").data,
      });

      const formatterRevenueTotals = calculateRevenueDifferences(res.payload, [
        "GOLD",
        "PLATINUM",
        "DISTRIBUTOR",
        "CERTIFIED",
      ]);
      setLevelSale(formatterRevenueTotals);

      const totalRevenueForCompany = sumSalesForCompanies(
        res.payload,
        getUniqueFieldValues(res.payload, "company_type")
      );
      setDataTable(totalRevenueForCompany);
      setCompaniesName(getUniqueFieldValues(res.payload, "company_name"));
      setLevels(getUniqueFieldValues(res.payload, "level"));
      setRegions(getUniqueFieldValues(res.payload, "region"));
      setCountries(getUniqueFieldValues(res.payload, "country_id"));
      setCompaniesType(getUniqueFieldValues(res.payload, "company_type"));
      setDataLoaded(true);
    });
  }, [filters]);

  return (
    <div className="m-5">
      {dataLoaded && (
        <FilterSection
          filters={filters}
          companyName={companiesName}
          levels={levels}
          region={regions}
          countries={countries}
          quarter={quarter}
          month={month}
          marketSegment={marketSegment}
          businessUnit={businessUnit}
          companyType={companies}
          handleFilters={handleFilters}
          multiSelect={multiSelect}
          clearSelects={clearSelects}
        />
      )}
      {dataLoaded && (
        <SalesGoalsSection
          totalSaleGoal={{
            expected: formattedNumber(sales.expectedRevenueSum),
            reached: formattedNumber(sales.totalRevenueSum),
            progress: `${Number(
              (sales.totalRevenueSum * 100) / sales.expectedRevenueSum
            ).toFixed(0)} %`,
          }}
        />
      )}
      <RegionGoalSection regionVsGoals={regionVsGoals} />
      <CdpSection />
      {dataLoaded && (
        <MarketplaceSection
          barCircleChart={levelSale}
          xValuesLine={xValuesLine}
          marketplaceVip={marketplaceVip}
        />
      )}
      {/* TABLE SECTION */}
      <div className="justify-items-center pt-5">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && dataTable && (
          <SortedTable
            containerStyles={
              "mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max !w-full"
            }
            tableStyles={"table-zebra !text-sm"}
            colStyles={"p-2"}
            thStyles={"sticky text-white"}
            cols={[
              {
                rowStyles: "",
                sort: false,
                symbol: "",
                identity: "company_type",
                columnName: "Segmento",
              },
              {
                rowStyles: "",
                sort: false,
                symbol: "USD",
                identity: "sales_education_cc",
                columnName: "CC Education",
              },
              {
                rowStyles: "",
                sort: false,
                symbol: "USD",
                identity: "sales_education_dc",
                columnName: "DC Education",
              },
              {
                symbol: "USD",
                identity: "sales_enterprise_cc",
                columnName: "CC Enterprise",
              },
              {
                symbol: "USD",
                identity: "sales_enterprise_dc",
                columnName: "DC Acrobat Pro",
              },
              {
                symbol: "USD",
                identity: "sales_teams_cc",
                columnName: "CC Teams",
              },
              {
                symbol: "USD",
                identity: "sales_acrobat_pro_dc",
                columnName: "DC Acrobat Pro",
              },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            currentItems={dataTable}
            sumColum={true}
          />
        )}
      </div>
    </div>
  );
};

export default SalesYtd;
