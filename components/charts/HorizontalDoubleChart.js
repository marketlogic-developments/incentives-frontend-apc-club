import React from "react";
import ReactEcharts from "echarts-for-react";

const HorizontalDoubleChart = ({
  yNames = [],
  datas = [
    {
      leyend: "",
      values: [],
      color: "",
    },
  ],
}) => {
    const data = datas.map((item) => ({
        name: item.leyend,
        type: "bar",
        data: item.values,
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
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: yNames,
    },
    series: data
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} />
    </div>
  );
};

export default HorizontalDoubleChart;
