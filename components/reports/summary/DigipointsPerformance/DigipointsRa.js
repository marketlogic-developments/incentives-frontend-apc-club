import React from "react";
import ReactEcharts from "echarts-for-react";

const DigipointsRa = ({
  datas = [{ name: "", color: "", data: [] }],
  yNames = [],
  ySymbol = "",
}) => {
  const data = datas.map((item) => ({
    name: item.name,
    type: "bar",
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
    },
  }));

  console.log(data);

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
      // boundaryGap: [0, 8],
      minInterval: 1,
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

export default DigipointsRa;
