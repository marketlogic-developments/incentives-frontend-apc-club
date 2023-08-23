import React from "react";
import ReactEcharts from "echarts-for-react";

const HorizontalBar = ({ data = [] }) => {
  const seriesData = data.map((item) => ({
    value: item.value,
    itemStyle: {
      color: item.color,
    },
  }));
  const option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: data.map((item) => item.name),
    },
    series: [
      {
        data: seriesData,
        type: "bar",
        showBackground: true,
        backgroundColor: "#828282",
      },
    ],
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} />
    </div>
  );
};

export default HorizontalBar;