import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import { PieChart } from "recharts";
import StackedHorizontalBarChart from "../../../charts/StackedHorizontalBarChart";

const DigipointSection = () => {
  return (
    <>
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
    </>
  );
};

export default DigipointSection;
