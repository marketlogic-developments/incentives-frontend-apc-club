import React from "react";
import ReactEcharts from "echarts-for-react";

const PieChart = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "center",
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["50%", "70%"],
        center: ["50%", "60%"], 
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{b}: ${c}.00",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 10, name: "Promotion" },
          { value: 70, name: "Behavior" },
          { value: 20, name: "Sales" },
        ],
        color: ["#21A5A2", "#009C3B", "#1473E6"],
      },
    ],
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default PieChart;
