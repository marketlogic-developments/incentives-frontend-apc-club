import React from 'react';
import ReactEcharts from "echarts-for-react";

const LineChart = ({title = '', subtext = '', color = '', xValues = [], data = []}) => {
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
          trigger: 'axis'
        },
        xAxis: {
          minorSplitLine: {
            show: true
          },
          type: 'category',
          data: xValues
        },
        yAxis: {
          minorSplitLine: {
            show: true
          },
          type: 'value',
        },
        series: [
          {
            color: color,
            symbolSize: 8,
            data: data,
            type: 'line'
          }
        ]
      };
  return (
    <div className="w-full">
      <ReactEcharts option={option} />
    </div>
  )
}

export default LineChart