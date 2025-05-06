import React from "react";
import ReactEcharts from "echarts-for-react";

const SalesYTDCharts = ({
  totalDatas = [{ total: 0, expected: 0, totalColor: "", expectedColor: "" }],
  yNames = [],
}) => {
  const totalData = totalDatas.map((item) => ({
    value: item.total,
    itemStyle: { color: item.totalColor },
  }));

  const expectedData = totalDatas.map((item) => ({
    value:
      Number(item.total) > Number(item.expected)
        ? 0
        : Math.trunc(Number(item.expected) - Number(item.total)),
    itemStyle: { color: item.expectedColor },
    aux: item.expected,
  }));  

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        const totalValue = params[0].data.value;
        const expectedValue = params[1].data.aux;
      
        const truncate = (num, decimals) => {
          const factor = Math.pow(10, decimals);
          return Math.trunc(num * factor) / factor;
        };
      
        const progress = truncate((totalValue / expectedValue) * 100, 2);
      
        return `Reached: ${formatValue(totalValue)} / Expected: ${formatValue(expectedValue)} - Progress: ${progress}%`;
      }      
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
      axisLabel: {
        formatter: function (number) {
          let formattedNumber;
        if (number >= 1000000) {
            formattedNumber = Math.floor((number / 1000000) * 100) / 100 + "M";
        } else if (number >= 1000) {
            formattedNumber = Math.floor((number / 1000) * 100) / 100 + "K";
        } else {
            formattedNumber = number.toLocaleString("en-US");
        }
        return formattedNumber;
        },
      },
    },
    yAxis: {
      type: "category",
      data: yNames,
    },
    series: [
      {
        name: "",
        type: "bar",
        stack: "total",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        data: totalData,
      },
      {
        name: "",
        type: "bar",
        stack: "total",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        data: expectedData,
      },
    ],
  };
  const formatValue = (value) => {
    const truncate = (num, decimals) => {
      const factor = Math.pow(10, decimals);
      return Math.trunc(num * factor) / factor;
    };
  
    return value >= 1000000
      ? truncate(value / 1000000, 2) + "M"
      : value >= 1000
      ? truncate(value / 1000, 2) + "K"
      : truncate(value, 2);
  };  
  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default SalesYTDCharts;
