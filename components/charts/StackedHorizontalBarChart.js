import React from "react";
import ReactEcharts from "echarts-for-react";

const StackedHorizontalBarChart = ({}) => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      orient: "horizontal",
      right: 10,
      top: "top",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: function (value) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(0) + "M";
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + "K";
          } else {
            return value.toFixed(0);
          }
        },
      },
    },
    yAxis: {
      type: "category",
      data: ["Redeemed", "Assigned", "Uploaded"],
    },
    series: [
      {
        name: "Brazil",
        type: "bar",
        itemStyle: {
          color: "#21A5A2",
        },
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [859000, 869000, 879000],
        label: {
          show: true,
          formatter: function (params) {
            return params.value >= 1000000
              ? (params.value / 1000000).toFixed(0) + "M"
              : params.value >= 1000
              ? (params.value / 1000).toFixed(0) + "K"
              : params.value;
          },
        },
      },
      {
        name: "México",
        type: "bar",
        itemStyle: {
          color: "#1C2226",
        },
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [80000, 90000, 100000],
        label: {
          show: true,
          formatter: function (params) {
            return params.value >= 1000000
              ? (params.value / 1000000).toFixed(0) + "M"
              : params.value >= 1000
              ? (params.value / 1000).toFixed(0) + "K"
              : params.value;
          },
        },
      },
      {
        name: "SOLA",
        type: "bar",
        itemStyle: {
          color: "#1473E6",
        },
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [130000, 140000, 150000],
        label: {
          show: true,
          formatter: function (params) {
            return params.value >= 1000000
              ? (params.value / 1000000).toFixed(0) + "M"
              : params.value >= 1000
              ? (params.value / 1000).toFixed(0) + "K"
              : params.value;
          },
        },
      },
      {
        name: "NOLA",
        type: "bar",
        itemStyle: {
          color: "#2799F6",
        },
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [180000, 190000, 200000],
        label: {
          show: true,
          formatter: function (params) {
            return params.value >= 1000000
              ? (params.value / 1000000).toFixed(0) + "M"
              : params.value >= 1000
              ? (params.value / 1000).toFixed(0) + "K"
              : params.value;
          },
        },
      },
    ],
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default StackedHorizontalBarChart;
