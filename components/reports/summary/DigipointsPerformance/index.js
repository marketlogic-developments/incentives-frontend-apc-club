import React, { useState } from "react";
import { ArrowDown } from "../../../icons";
import { useTranslation } from "react-i18next";
import SelectSection from "./SelectSection";
import DigipointSection from "./DigipointSection";
import DigipointRedemptionSection from "./DigipointRedemptionSection";
import { useEffect } from "react";
import { getDigiPointsPerformance } from "../../../../store/reducers/sales.reducer";
import { useDispatch, useSelector } from "react-redux";

const DigipoinstPerformance = () => {
  /* Variables and const */
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
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
  const multiSelect = [
    {
      placeholder: "Year",
      value: [],
      dataSelect: [],
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
  const xValuesLine = [50, 100, 200, 300, 400, 500];
  const redempion = [0, 100, 200, 300, 400];

/* DIGIPOINTS SECTION */
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

  /* GET DATA */
  useEffect(() => {
    dispatch(getDigiPointsPerformance(token)).then((res) => {
      const uniqueFieldValues = getUniqueFieldValues(res.payload, "company_type");
      const formattedData = calculateAndFormatData(
        res.payload,
        calculateTotalRevenueByRegion,
        getColorForField,
        colorMapping
      );
      console.log(res.payload);
    });
  });

  return (
    <div className="m-5">
      <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SelectSection multiSelect={multiSelect} />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointSection />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointRedemptionSection
          redempion={redempion}
          xValuesLine={xValuesLine}
        />
      </div>
    </div>
  );
};

export default DigipoinstPerformance;
