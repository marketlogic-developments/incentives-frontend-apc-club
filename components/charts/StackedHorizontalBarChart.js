import React, { useEffect, useRef, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { useMemo } from "react";

const StackedHorizontalBarChart = ({
  datas = [{ name: "", color: "", data: [] }],
  yNames = [],
  percentage = [],
  ySymbol = "",
}) => {
  const chartRef = useRef(null);

  const data = datas.map((item) => ({
    name: item.name,
    type: "bar",
    stack: "total",
    itemStyle: {
      color: item.color,
    },
    label: {
      show: true,
    },
    emphasis: {
      focus: "series",
    },
    data: item.data,
    label: {
      show: true,
      formatter: function (params) {
        return params.value >= 1000000
          ? Math.trunc(params.value / 1000000) + "M"
          : params.value >= 1000
          ? Math.trunc(params.value / 1000) + "K"
          : Math.trunc(params.value);
      }      
    },
  }));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let tooltip = params[0].name + "<br/>";
        params.forEach((param) => {
          tooltip +=
            param.marker +
            " " +
            param.seriesName +
            ": " +
            param.value +
            "<br/>";

          // Obtener el índice del objeto en el array datas
          const dataIndex = datas.findIndex(
            (item) => item.name === param.seriesName
          );

          // Verificar si hay un objeto en percentage correspondiente
          if (dataIndex !== -1 && percentage[dataIndex]) {
            if (param.axisValueLabel === "Redeemed") {
              tooltip +=
                " - " + percentage[dataIndex].redeemVsAsigned + "%<br/>";
            }
            if (param.axisValueLabel === "Assigned") {
              tooltip +=
                " - " + percentage[dataIndex].asignedVsUpload + "%<br/>";
            }
          }
        });
        return tooltip;
      },
    },
    legend: {
      orient: "horizontal",
      right: 15,
      top: "top",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: function (value) {
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
    yAxis: {
      type: "category",
      data: yNames,
      axisLabel: {
        formatter: function (value) {
          return ySymbol + value;
        },
      },
    },
    series: data,
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().clear();
      chartRef.current.getEchartsInstance().setOption(option);
    }
  }, [datas]);

  return (
    <div className="w-full">
      <ReactEcharts ref={chartRef} option={option} className="w-full h-full" />
    </div>
  );
};

export default StackedHorizontalBarChart;
