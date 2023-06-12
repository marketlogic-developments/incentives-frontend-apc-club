import React from "react";
import ReactEcharts from "echarts-for-react";

const BarChar = ({
  title = "",
  subtext = "",
  colorBarOne = "",
  colorBarTwo = "",
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
        color: colorBarOne,
        name: dataLeyend[0],
        type: "bar",
        data: dataOne,
      },
      {
        color: colorBarTwo,
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
