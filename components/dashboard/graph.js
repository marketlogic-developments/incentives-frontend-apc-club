import React, { PureComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Graph = () => {
  const week = "Semana";

  const data = [
    {
      name: `${week} 1`,
      CC: 4000,
      DC: 2400,
    },
    {
      name: `${week} 2`,
      CC: 3000,
      DC: 1398,
    },
    {
      name: `${week} 3`,
      CC: 2000,
      DC: 9800,
    },
    {
      name: `${week} 4`,
      CC: 2780,
      DC: 3908,
    },
    {
      name: `${week} 5`,
      CC: 1890,
      DC: 4800,
    },
    {
      name: `${week} 6`,
      CC: 2390,
      DC: 3800,
    },
    // {
    //   name: "Semana 7",
    //   CCI: 3490,
    //   CCT: 4300,
    //   amt: 2100,
    // },
  ];

  return (
    <ResponsiveContainer width="90%" height={300} className="bg-base-100">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis name="Semanas" dataKey="name" />
        <YAxis name="Dolares" type="number" unit="$" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          name="Creative Cloud"
          dataKey="CC"
          stroke="#eb1000"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          name="Document Cloud"
          dataKey="DC"
          stroke="#3273DE"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
