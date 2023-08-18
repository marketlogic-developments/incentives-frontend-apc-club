import React from "react";
import { useState } from "react";
import CardChart from "../../../cardReportes/CardChart";
import BarChar from "../../../cardReportes/BarChar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSalesPerformance } from "../../../../store/reducers/sales.reducer";

const GraphMarketVIP = ({ token }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [vip, setVip] = useState([100, 200, 300, 400]);
  const xValuesLine = ["Q1", "Q2", "Q3", "Q4"];
  const [marketplace, setMarketplace] = useState([150, 250, 350, 450]);

  useEffect(() => {
    dispatch(getSalesPerformance(token))
      .then((response) => {
        const onlympVip = response.payload.map(
          ({
            vip_revenue_q1,
            vip_revenue_q2,
            vip_revenue_q3,
            vip_revenue_q4,
          }) => ({
            vip_revenue_q1,
            vip_revenue_q2,
            vip_revenue_q3,
            vip_revenue_q4,
          })
        );
        const onlympVipQ1 = "";
        const onlympVipQ2 = "";
        const onlympVipQ3 = "";
        const onlympVipQ4 = "";
        const onlymp = response.payload.map(
          ({
            vmp_revenue_q1,
            vmp_revenue_q2,
            vmp_revenue_q3,
            vmp_revenue_q4,
          }) => ({
            vmp_revenue_q1,
            vmp_revenue_q2,
            vmp_revenue_q3,
            vmp_revenue_q4,
          })
        );
        console.log(onlympVip, onlymp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(vip, marketplace);

  return (
    <CardChart title={"Marketplace & VIP"} paragraph="">
      <BarChar
        title={"Monthly sales"}
        colorBarOne={"black"}
        colorBarTwo={"#2799F6"}
        dataLeyend={["VIP", "Marketplace"]}
        dataOne={vip}
        dataTwo={marketplace}
        xValues={xValuesLine}
      />
    </CardChart>
  );
};

export default GraphMarketVIP;
