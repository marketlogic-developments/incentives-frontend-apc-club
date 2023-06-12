import React from "react";
import ReactEcharts from "echarts-for-react";

const BarChar = ({
  title = "",
  subtext = "",
  xValues = [],
  dataOne = [],
  dataTwo = [],
  dataLeyend = [],
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
    legend: {
      data: dataLeyend,
      icon: "circle",
      orient: "horizontal",
      right: "10",
      top: "15",
    },

    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: xValues,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        color: "black",
        name: dataLeyend[0],
        type: "bar",
        data: dataOne,
      },
      {
        color: "#2799F6",
        name: dataLeyend[1],
        type: "bar",
        data: dataTwo,
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactEcharts option={option} />
    </div>
  );
};

export default BarChar;
