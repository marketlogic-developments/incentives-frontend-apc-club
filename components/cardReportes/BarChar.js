import React, { useEffect, useRef, useState } from "react";
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
  onLegendSelect = () => {},
}) => {
  const chartRef = useRef(null);
  const [selectedLegends, setSelectedLegends] = useState(
    dataLeyend.map(() => false)
  );

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current
        .getEchartsInstance()
        .on("legendselectchanged", function (params) {
          const selected = params.selected;
          const newlySelected = Object.keys(selected).filter(
            (key) => selected[key]
          );
          setSelectedLegends(newlySelected);
          onLegendSelect(newlySelected);
        });
    }
  }, []);

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
      selected: {
        selected: selectedLegends.reduce(
          (selected, legend) => ({ ...selected, [legend]: true }),
          {}
        ),
      },
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
      <ReactEcharts ref={chartRef} option={option} />
    </div>
  );
};

export default BarChar;
