import React, { FC } from "react";
import ReactEcharts from "echarts-for-react";

interface PieChartData {
    total: number;
    value: number;
    name: string;
  }
  
  interface PieChartLegend {
    top: string;
    left: string;
  }
  
  interface PieChartProps {
    datas?: PieChartData[];
    colors?: string[];
    formatter?: string;
    legend?: PieChartLegend;
    center?: [string, string];
  }

const PieChart:FC<PieChartProps> = ({
  datas,
  colors = [],
  formatter = "",
  legend = {
    top: "0%",
    left: "center",
  },
  center = ["50%", "60%"],
}) => {


  const option = {
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        const truncate = (num: number, decimals: number) => {
          const factor = Math.pow(10, decimals);
          return Math.trunc(num * factor) / factor;
        };
      
        const value = params.data.value;
        const total = params.data.total;
        const progress = truncate((value / total) * 100, 2);
      
        return `Signed: ${value} / Expected: ${total} - Progress: ${progress}%`;
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
          formatter: function (params: PieChartData) {
            return `${params.name}: ${params.value}`;
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
        data: datas,
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
