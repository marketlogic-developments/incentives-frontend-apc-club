import React from "react";
import ReactEcharts from "echarts-for-react";

const LicenseChart = () => {
  const option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [
        "Teams",
        "Enterprise",
        "Education",
        "Acrobat Pro",
        "DC Enterprise",
        "DC Education",
      ],
      icon: "circle",
      orient: "horizontal",
      right: "10",
      bottom: "-1%",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "20%",
      top: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [0, 1, 2, 3, 4, 5],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        color: "black",
        name: "Teams",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        color: "blue",
        name: "Enterprise",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        color: "green",
        name: "Education",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        color: "red",
        name: "Acrobat Pro",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        color: "orange",
        name: "DC Enterprise",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      {
        color: "pink",
        name: "DC Education",
        type: "line",
        stack: "Total",
        data: [830, 832, 101, 234, 1190, 1230, 1340],
      },
    ],
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default LicenseChart;
