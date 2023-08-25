import React from "react";
import { ArrowDown } from "../../icons";
import { useTranslation } from "react-i18next";
import CardChart from "../../cardReportes/CardChart";
import PieChart from "../../charts/PieChart";
import StackedHorizontalBarChart from "../../charts/StackedHorizontalBarChart";
import HorizontalBar from "../../charts/HorizontalBar";
import BasicBarChart from "../../charts/BasicBarChart";
import SelectSection from "./SelectSection";

const DigipoinstPerformance = () => {
  /* Variables and const */
  const [t, i18n] = useTranslation("global");
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
  return (
    <div className="m-5">
      <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SelectSection multiSelect={multiSelect} />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <CardChart title={"DigiPoints uploaded YTD"} paragraph="">
          <PieChart
            datas={[
              {
                value: 10,
                name: "Promotion",
              },
              {
                value: 70,
                name: "Behavior",
              },
              {
                value: 20,
                name: "Sales",
              },
            ]}
            colors={["#21A5A2", "#009C3B", "#1473E6"]}
            formatter=""
          />
        </CardChart>
        <CardChart title={"DigiPoints by business type"} paragraph="">
          <StackedHorizontalBarChart
            datas={[
              {
                name: "Brazil",
                color: "#21A5A2",
                data: [859000, 869000, 879000],
              },
              {
                name: "México",
                color: "#1C2226",
                data: [80000, 90000, 100000],
              },
              {
                name: "SOLA",
                color: "#1473E6",
                data: [130000, 140000, 150000],
              },
              {
                name: "NOLA",
                color: "#2799F6",
                data: [180000, 190000, 200000],
              },
            ]}
            yNames={["Redeemed", "Assigned", "Uploaded"]}
          />
        </CardChart>
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <CardChart title={"DigiPoints by status"} paragraph="">
          <HorizontalBar
            yNames={["Redeemed", "Assigned", "Expected", "Uploaded"]}
            datas={[
              { value: 250, color: "#2799F6" },
              { value: 230, color: "#1473E6" },
              { value: 200, color: "#1C2226" },
              { value: 180, color: "#21A5A2" },
            ]}
          />
        </CardChart>
        <CardChart title={"Redemptions by region and amound"} paragraph="">
          <BasicBarChart
            color={"#1C2226"}
            datas={redempion}
            xValues={xValuesLine}
          />
        </CardChart>
      </div>
    </div>
  );
};

export default DigipoinstPerformance;
