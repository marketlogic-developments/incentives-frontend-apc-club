import React from "react";
import ReactEcharts from "echarts-for-react";

const LineChart = ({
  title = "",
  subtext = "",
  color = "",
  xValues = [],
  data = [],
}) => {
  const option = {
    title: {
      textStyle: {
        fontSize: "",
        color: "black",
      },
      text: title,
      subtext: subtext,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      minorSplitLine: {
        show: true,
      },
      type: "category",
      data: xValues,
    },
    yAxis: {
      minorSplitLine: {
        show: true,
      },
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
        color: color,
        symbolSize: 8,
        data: data,
        type: "line",
      },
    ],
  };
  return (
    <div className="w-full">
      <ReactEcharts option={option} />
    </div>
  );
};

export default LineChart;
