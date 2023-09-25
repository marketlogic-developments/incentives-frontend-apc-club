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

const SalesYtd = () => {
  /* Variable and const */
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [sales, setSales] = useState();
  const token = useSelector((state) => state.user.token);
  const [regionVsGoals, setRegionVsGoals] = useState({
    total: 0,
    expected: 0,
    totalColor: "",
    expectedColor: "#828282",
  });
  const [cloudDocument, setCloudDocument] = useState();
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
  const filterAux = {
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
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [quarter, setQuarter] = useState(["q1", "q2", "q3", "q4"]);
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

  /* SET DATA */
  const calculateSegmentTotals = (data) => {
    const resellerData = data.filter((item) => {
      const resDist =
        filters.level === "DISTRIBUTOR" ||
        (filters.company_name.length !== 0 &&
          item.company_type === "DISTRIBUITOR")
          ? "DISTRIBUITOR"
          : "RESELLER";

      return item.company_type === resDist;
    });

    const segmentTotals = resellerData.reduce((totals, item) => {
      totals["Commercial"] =
        (totals["Commercial"] || 0) + parseFloat(item.sales_commercial);
      totals["Government"] =
        (totals["Government"] || 0) + parseFloat(item.sales_government);
      totals["Education"] =
        (totals["Education"] || 0) + parseFloat(item.sales_education);
      return totals;
    }, {});

    const pointsTotals = resellerData.reduce((totals, item) => {
      totals["Commercial"] =
        (totals["Commercial"] || 0) + parseInt(item.puntos_commercial);
      totals["Government"] =
        (totals["Government"] || 0) + parseInt(item.puntos_government);
      totals["Education"] =
        (totals["Education"] || 0) + parseInt(item.puntos_education);
      return totals;
    }, {});

    const result = Object.keys(segmentTotals).map((segment) => ({
      segment,
      total: segmentTotals[segment],
      total_points: pointsTotals[segment],
    }));

    return result;
  };

  /* SELECTS */
  const handleFilters = (name, value) => {
    return setFilters({ ...filters, [name]: value === null ? "" : value });
  };

  const handleMultiFilters = (name, value) => {
    try {
      if (value !== "") {
        if (multiFilter.includes(value)) {
          setMultiFilter(multiFilter.filter((item) => item !== value));
        } else if (multiFilter.length < 3) {
          setMultiFilter(value);
        } else if(value.length < 3) {
          setMultiFilter(value)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const clearSelects = () => {
    setFilters({
      company_name: "",
      company_type: "",
      region: "",
      country_id: "",
      level: "",
    });
    setMultiFilter([]);
  };

  /* REGION VS GOALS */
  const getColorForField = (value, mapping, defaultColor = "#828282") => {
    return mapping[value] || defaultColor;
  };

  const calculateTotalRevenueByRegion = (data) => {
    const regions = ["NOLA", "SOLA", "MEXICO", "BRAZIL"];
    const revenueByRegion = {};

    const filteredItems = data.filter((item) => {
      const resDist =
        filters.level === "DISTRIBUTOR" ||
        (filters.company_name.length !== 0 &&
          item.company_type === "DISTRIBUITOR")
          ? "DISTRIBUITOR"
          : "RESELLER";

      return item.company_type === resDist;
    });

    regions.forEach((region) => {
      const totalRevenue = filteredItems.reduce((total, obj) => {
        if (obj.region === region) {
          const revenue = parseFloat(Number(obj.total_revenue).toFixed(2));
          return total + revenue;
        }
        return total;
      }, 0);

      const totalExpectedRevenue = filteredItems.reduce((total, obj) => {
        if (obj.region === region) {
          const expectedRevenue = parseFloat(
            Number(obj.expected_revenue).toFixed(2)
          );
          return total + expectedRevenue;
        }
        return total;
      }, 0);

      revenueByRegion[region] = {
        totalRevenue,
        totalExpectedRevenue,
      };
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
      total: Number(revenueByRegion[region].totalRevenue).toFixed(2),
      expected: Number(revenueByRegion[region].totalExpectedRevenue).toFixed(2),
      totalColor: getColorFunction(region, colorMapping),
      expectedColor: "#828282",
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
      const resDist =
        filters.level === "DISTRIBUTOR" ||
        (filters.company_name.length !== 0 &&
          obj.company_type === "DISTRIBUITOR")
          ? "DISTRIBUITOR"
          : "RESELLER";

      if (obj.company_type === resDist) {
        propertyNames.forEach((propertyName) => {
          for (let quarter = 1; quarter <= 4; quarter++) {
            quarterlyTotals[propertyName][`Q${quarter}`] += parseFloat(
              obj[`${propertyName}_revenue_q${quarter}`]
            );
          }
        });
      }
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

    // Calcular totalVip, totalVmp y totalSale
    const totalVip = dataObjects
      .filter((obj) => obj.label.includes("vip"))
      .reduce(
        (total, obj) => total + obj.data.reduce((sum, value) => sum + value, 0),
        0
      );

    const totalVmp = dataObjects
      .filter((obj) => obj.label.includes("vmp"))
      .reduce(
        (total, obj) => total + obj.data.reduce((sum, value) => sum + value, 0),
        0
      );

    const totalSale = totalVip + totalVmp;

    // Calcular porcentajes y formatear el objeto resultante
    const result = dataObjects.map((obj) => {
      const total = obj.data.reduce((sum, value) => sum + value, 0);
      const percentage = totalSale !== 0 ? (total / totalSale) * 100 : 0;

      return {
        label: obj.label,
        data: obj.data,
        porcentaje: percentage.toFixed(2),
        totalVip: totalVip.toFixed(2),
        totalVmp: totalVmp.toFixed(2),
        totalSale: totalSale.toFixed(2),
      };
    });

    return result;
  };

  const createMarketplaceVipObject = (formattedTotals) => {
    const vipItem = formattedTotals.find((item) => item.label === "vip");
    const vmpItem = formattedTotals.find((item) => item.label === "vmp");

    return {
      vip: vipItem.data,
      vmp: vmpItem.data,
      totalVip: vipItem.totalVip,
      totalVmp: vmpItem.totalVmp,
      totalSale: vipItem.totalSale,
      percentageVip: vipItem.porcentaje,
      percentageVmp: vmpItem.porcentaje,
    };
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
    const filteredItems = data.filter((item) => {
      const resDist =
        filters.level === "DISTRIBUTOR" ||
        (filters.company_name.length !== 0 &&
          item.company_type === "DISTRIBUITOR")
          ? "DISTRIBUITOR"
          : "RESELLER";

      return item.company_type === resDist;
    });

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

  /* TOTAL DE CREATIVE CLOUD Y DOCUMENT CLOUD  */
  const calculateCreativeDocumentSum = (data) => {
    const filteredItems = data.filter((item) => {
      const resDist =
        filters.level === "DISTRIBUTOR" ||
        (filters.company_name.length !== 0 &&
          item.company_type === "DISTRIBUITOR")
          ? "DISTRIBUITOR"
          : "RESELLER";

      return item.company_type === resDist;
    });

    const calculateTotal = (property) =>
      filteredItems.reduce((sum, item) => {
        const value = parseFloat(item[property]);
        return isNaN(value) ? sum : sum + value;
      }, 0);

    const expected_cc_renew = calculateTotal("expected_cc_renew").toFixed(2);
    const expected_cc_newbusiness = calculateTotal(
      "expected_cc_newbusiness"
    ).toFixed(2);
    const expected_dc_renew = calculateTotal("expected_dc_renew").toFixed(2);
    const expected_dc_newbusiness = calculateTotal(
      "expected_dc_newbusiness"
    ).toFixed(2);
    const sales_cc_renewal = calculateTotal("sales_cc_renewal").toFixed(2);
    const sales_cc_newbusiness = calculateTotal("sales_cc_newbusiness").toFixed(
      2
    );
    const sales_dc_renewal = calculateTotal("sales_dc_renewal").toFixed(2);
    const sales_dc_newbusiness = calculateTotal("sales_dc_newbusiness").toFixed(
      2
    );
    const expectedCloud = (
      calculateTotal("expected_cc_renew") +
      calculateTotal("expected_cc_newbusiness")
    ).toFixed(2);
    const salesCloud = (
      calculateTotal("sales_cc_renewal") +
      calculateTotal("sales_cc_newbusiness")
    ).toFixed(2);
    const expectedDoc = (
      calculateTotal("expected_dc_renew") +
      calculateTotal("expected_dc_newbusiness")
    ).toFixed(2);
    const salesDoc = (
      calculateTotal("sales_dc_renewal") +
      calculateTotal("sales_dc_newbusiness")
    ).toFixed(2);

    return {
      expected_cc_renew,
      expected_cc_newbusiness,
      expected_dc_newbusiness,
      sales_cc_renewal,
      sales_cc_newbusiness,
      sales_dc_renewal,
      sales_dc_newbusiness,
      expected_dc_renew,
      expectedCloud,
      salesCloud,
      expectedDoc,
      salesDoc,
    };
  };

  const multiFilterButton = () => {
    handleFilters("company_name", multiFilter);
  };

  useEffect(() => {
    setDataLoaded(false);
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

      setCloudDocument(calculateCreativeDocumentSum(res.payload));

      const formattedTotals = formatterDataToBarChart(
        res.payload,
        calculateQuarterlyTotals,
        formatQuarterlyTotals,
        ["vip", "vmp"]
      );
      setMarketplaceVip(createMarketplaceVipObject(formattedTotals));

      const formatterRevenueTotals = calculateRevenueDifferences(res.payload, [
        "GOLD",
        "PLATINUM",
        "DISTRIBUTOR",
        "CERTIFIED",
      ]);
      setLevelSale(formatterRevenueTotals);

      setDataTable(calculateSegmentTotals(res.payload));
      setLevels(getUniqueFieldValues(res.payload, "level"));
      setRegions(getUniqueFieldValues(res.payload, "region"));
      setCountries(getUniqueFieldValues(res.payload, "country_id"));
      setCompaniesType(getUniqueFieldValues(res.payload, "company_type"));
      setDataLoaded(true);
    });
  }, [filters]);

  useEffect(() => {
    dispatch(getSalesYtd(token, filterAux)).then((res) => {
      setCompaniesName(getUniqueFieldValues(res.payload, "company_name"));
    });
  }, []);

  return (
    <div className="m-5">
      <FilterSection
        filters={filters}
        multiFilter={multiFilter}
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
      <RegionGoalSection
        dataLoaded={dataLoaded}
        regionVsGoals={regionVsGoals}
      />
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
        />
      )}
      <div className="justify-items-center pt-5">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && dataTable && <TableSection dataTable={dataTable} />}
      </div>
    </div>
  );
};

export default SalesYtd;
