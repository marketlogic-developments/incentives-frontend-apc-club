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
        return `Signed: ${params.data.value} / Expected: ${params.data.total} - Progress: ${Number((params.data.value / params.data.total) * 100).toFixed(
            2
          )}%`;
      },
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
