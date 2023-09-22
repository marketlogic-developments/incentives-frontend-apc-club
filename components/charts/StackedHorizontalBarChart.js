import React from "react";
import ReactEcharts from "echarts-for-react";

const StackedHorizontalBarChart = ({
  datas = [{ name: "", color: "", data: [] }],
  yNames = [],
  ySymbol = "",
}) => {
  const data = datas.map((item) => ({
    name: item.name,
    type: "bar",
    stack: "total",
    itemStyle: {
      color: item.color,
    },
    label: {
      show: true,
    },
    emphasis: {
      focus: "series",
    },
    data: item.data,
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
  }));

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
      data: yNames,
      axisLabel: {
        formatter: function (value) {
          return ySymbol + value;
        },
      },
    },
    series: data,
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default StackedHorizontalBarChart;
