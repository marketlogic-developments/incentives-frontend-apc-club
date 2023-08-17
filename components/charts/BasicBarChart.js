import React from "react";
import ReactEcharts from "echarts-for-react";

const BasicBarChart = ({ xValues = [], datas = [], color='' }) => {
  const option = {
    xAxis: {
      type: "category",
      data: xValues,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: datas,
        type: "bar",
        itemStyle: {
            color: color,
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

export default BasicBarChart;
