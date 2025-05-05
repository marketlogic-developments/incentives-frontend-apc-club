import React from "react";
import ReactEcharts from "echarts-for-react";

const MultiLineChart = ({
  symbolS = false,
  dataLeyend = [],
  dataX = [],
  dataOne = [],
  dataTwo = [],
  dataThree = [],
  dataFour = [],
  dataFive = [],
  dataSix = [],
  colorsLine = [],
}) => {
  const option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: dataLeyend,
      icon: "circle",
      orient: "horizontal",
      top: "-2%",
      right: "10",
      /* bottom: "-1%", */
    },
    /* grid: {
          left: "3%",
          right: "4%",
          bottom: "25%",
          top: "2%",
          containLabel: true,
        }, */
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dataX,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: function (value) {
          if (value >= 1000000) {
            return Math.trunc(value / 1000000) + "M";
          } else if (value >= 1000) {
            return Math.trunc(value / 1000) + "K";
          } else {
            return Math.trunc(value);
          }
        }        
      },
    },
    series: [
      {
        color: colorsLine[0],
        name: dataLeyend[0],
        type: "line",
        stack: "Total",
        data: dataOne,
        symbolSize: symbolS,
      },
      {
        color: colorsLine[1],
        name: dataLeyend[1],
        type: "line",
        stack: "Total",
        data: dataTwo,
        symbolSize: symbolS,
      },
      {
        color: colorsLine[2],
        name: dataLeyend[2],
        type: "line",
        stack: "Total",
        data: dataThree,
        symbolSize: symbolS,
      },
      {
        color: colorsLine[3],
        name: dataLeyend[3],
        type: "line",
        stack: "Total",
        data: dataFour,
        symbolSize: symbolS,
      },
      {
        color: colorsLine[4],
        name: dataLeyend[4],
        type: "line",
        stack: "Total",
        data: dataFive,
        symbolSize: symbolS,
      },
      {
        color: colorsLine[5],
        name: dataLeyend[5],
        type: "line",
        stack: "Total",
        data: dataSix,
        symbolSize: symbolS,
      },
    ],
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default MultiLineChart;
