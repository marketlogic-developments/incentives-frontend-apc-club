"use client"

import { type FC, useMemo } from "react"
import ReactEcharts from "echarts-for-react"

interface TotalData {
  total: number
  expected: number
  totalColor: string
  expectedColor: string
}

interface Props {
  totalDatas: TotalData[]
  yNames: string[]
}

const StackedBarChart: FC<Props> = ({ totalDatas = [], yNames = ["NOLA", "SOLA", "BRAZIL", "MEXICO"] }) => {
  const { totalData, expectedData, commonTotalColor } = useMemo(() => {
    if (totalDatas.length === 0) {
      return { totalData: [], expectedData: [], commonTotalColor: "" }
    }

    const commonTotalColor = totalDatas[0].totalColor

    const totalData = totalDatas.map((item) => ({
      value: item.total,
      itemStyle: {
        color: commonTotalColor,
      },
    }))

    const expectedData = totalDatas.map((item) => ({
      value: Math.max(0, item.expected - item.total),
      itemStyle: { color: item.expectedColor },
      aux: item.expected,
    }))

    return { totalData, expectedData, commonTotalColor }
  }, [totalDatas])

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any[]) => {
        if (!Array.isArray(params) || params.length < 2) {
          return ""
        }

        const totalValue = params[0]?.data?.value ?? 0
        const expectedValue = params[1]?.data?.aux ?? 0

        if (expectedValue === 0) {
          return `Signed: ${totalValue} / Expected: ${expectedValue} - Progress: N/A`
        }

        const progress = ((totalValue / expectedValue) * 100).toFixed(2)
        return `Signed: ${totalValue} / Expected: ${expectedValue} - Progress: ${progress}%`
      },
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
        formatter: (value: number) => {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(0) + "M"
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + "K"
          } else {
            return value.toFixed(0)
          }
        },
      },
    },
    yAxis: {
      type: "category",
      data: yNames,
    },
    series: [
      {
        name: "Signed",
        type: "bar",
        stack: "total",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        data: totalData,
        itemStyle: {
          color: commonTotalColor,
        },
      },
      {
        name: "Expected",
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
  }

  return (
    <div className="w-full">
      <ReactEcharts option={option} className="w-auto h-auto" />
    </div>
  )
}

export default StackedBarChart

