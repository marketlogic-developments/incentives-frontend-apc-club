import React from "react";
import ReactEcharts from "echarts-for-react";

const HorizontalBar = () => {
  let data = [220, 182, 191, 234];

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
      data: ["Brazil", "Mexico", "Sola", "Nola"],
    },
    series: [
      {
        data: [
          {
            value: 250,
            itemStyle: {
              color: "#2799F6",
            },
          },
          {
            value: 230,
            itemStyle: {
              color: "#1473E6",
            },
          },
          {
            value: 200,
            itemStyle: {
              color: "#1C2226",
            },
          },
          {
            value: 180,
            itemStyle: {
              color: "#21A5A2",
            },
          },
        ],
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
