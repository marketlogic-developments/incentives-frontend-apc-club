import React from "react";
import ReactEcharts from "echarts-for-react";

const PieChart = ({
  datas = [
    {
      value: 0,
      name: "",
    },
  ],
  colors = [],
  formatter = "",
}) => {
  const data = datas.map((item) => ({
    value: item.value,
    name: item.name,
  }));

  const option = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return params.value >= 1000000
          ? formatter + (params.value / 1000000).toFixed(0) + "M"
          : params.value >= 1000
          ? formatter + (params.value / 1000).toFixed(0) + "K"
          : formatter + params.value;
      },
    },
    legend: {
      top: "0%",
      left: "center",
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["50%", "65%"],
        center: ["50%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outside",
          formatter: function (params) {
            const formattedValue =
              params.value >= 1000000
                ? formatter + (params.value / 1000000).toFixed(0) + "M"
                : params.value >= 1000
                ? formatter + (params.value / 1000).toFixed(0) + "K"
                : formatter + params.value;
            return `${params.name}: ${formattedValue}.00`;
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: data,
        color: colors,
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default PieChart;
