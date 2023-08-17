import React from "react";
import ReactEcharts from "echarts-for-react";

const PieChart = () => {
    const option = {}
  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  )
}

export default PieChart