import React from "react";
import ReactEcharts from "echarts-for-react";

const StackedHorizontalBarChart = ({
  datas = [{ name: "", color: "", data: [] }],
  yNames = [],
  percentage = [],
  ySymbol = "",
}) => {
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
          ? (params.value / 1000000).toFixed(0) + "M"
          : params.value >= 1000
          ? (params.value / 1000).toFixed(0) + "K"
          : params.value;
      },
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
                " - " +
                percentage[dataIndex].redeemVsAsigned +
                "%<br/>";
            }
            if (param.axisValueLabel === "Assigned") {
              tooltip +=
                " - " +
                percentage[dataIndex].asignedVsUpload +
                "%<br/>";
            }
          }
        });
        return tooltip;
      },
    },
    legend: {
      orient: "horizontal",
      right: 10,
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
            return (value / 1000000).toFixed(0) + "M";
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + "K";
          } else {
            return value.toFixed(0);
          }
        },
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

  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  );
};

export default StackedHorizontalBarChart;
