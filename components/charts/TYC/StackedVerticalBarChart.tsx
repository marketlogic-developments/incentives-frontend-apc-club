import React, { FC } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

interface Props {
  totalDatas:
    | {
        total: number;
        expected: number;
        totalColor: string;
        expectedColor: string;
      }[]
    | any[];
  yNames: string[] | null;
}

const StackedVerticalBarChart: FC<Props> = ({
  totalDatas = [{ total: 0, expected: 0, totalColor: "", expectedColor: "" }],
  yNames = ["PA", "PP", "SR", "Total"],
}) => {
  const totalData = totalDatas?.map((item) => ({
    value: item.total,
     itemStyle: {
          color: item.totalColor
        },
  }));

  const expectedData = totalDatas?.map((item) => ({
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
      formatter: function (params: any) {
        const totalValue = params[0].data.value;
        const expectedValue = params[1].data.aux;
      
        const truncateToTwoDecimals = (num: number) =>
          Math.trunc(num * 100) / 100;
      
        const progress = truncateToTwoDecimals((totalValue / expectedValue) * 100);
      
        return `Signed: ${formatValue(totalValue)} / Expected: ${formatValue(expectedValue)} - Progress: ${progress}%`;
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
      type: "category",
      data: yNames,
    },
    yAxis: {
      type: "value",

      axisLabel: {
        formatter: function (value: any) {
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
  const formatValue = (value: any) => {
    const truncate = (num: number, decimals: number): number => {
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

export default StackedVerticalBarChart;
