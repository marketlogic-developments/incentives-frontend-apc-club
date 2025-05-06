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
  legend = {
    top: "0%",
    left: "center",
  },
  center = ["50%", "60%"],
}) => {
  const total = datas
    .map(({ value }) => parseInt(value))
    .reduce((prev, curr) => prev + curr, 0);

  const data = datas.map((item) => ({
    value: item.value,
    name: item.name,
  }));

  const option = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        const truncate = (num, decimals) => {
          const factor = Math.pow(10, decimals);
          return Math.trunc(num * factor) / factor;
        };
      
        const value = params.value;
      
        const formattedValue =
          value >= 1000000
            ? formatter + truncate(value / 1000000, 2) + "M"
            : value >= 1000
            ? formatter + truncate(value / 1000, 2) + "K"
            : formatter + truncate(value, 0); // o value.toString() si no deseas truncar aquí
      
        const percentage = Math.trunc((value * 100) / total);
      
        return `${formattedValue} / ${percentage}%`;
      }
      
    },
    legend: legend,
    series: [
      {
        name: "",
        type: "pie",
        radius: ["50%", "65%"],
        center: center,
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
            const truncate = (num, decimals) => {
              const factor = Math.pow(10, decimals);
              return Math.trunc(num * factor) / factor;
            };
          
            const value = params.value;
          
            const formattedValue =
              value >= 1000000
                ? formatter + truncate(value / 1000000, 2) + "M"
                : value >= 1000
                ? formatter + truncate(value / 1000, 2) + "K"
                : formatter + truncate(value, 0); // sin decimales
          
            return `${params.name}: ${formattedValue}`;
          }          
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

  console.log(total);

  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default PieChart;
