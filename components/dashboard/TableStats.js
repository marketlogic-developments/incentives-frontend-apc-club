import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesBySegment,
  getSalesBySegmentComp,
  getSalesBySegmentDist,
  getSalesBySegmentAll,
} from "../../store/reducers/sales.reducer";
import BarBySegment from "./tableStatsElements/BarBySegment";
import Meta from "./tableStatsElements/Meta";
import RankingTable from "./tableStatsElements/RankingTable";

const TableStats = () => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [totalSales, setTotalSales] = useState([]);
  const [percentageTotal, setpercentageTotal] = useState(0);
  const [goalSales, setGoalSales] = useState(0);
  const [percentageCC, setpercentageCC] = useState([]);
  const [percentageDC, setpercentageDC] = useState([]);
  const [sales, setSales] = useState(0);
  const [goal, setGoal] = useState(0);
  const [loading, setLoading] = useState(0);
  const dataFromAxios = useSelector((state) => state.sales.salesgement);
  const golprogram = useSelector((state) => state.user.company.goalsPerYear);

  useEffect(() => {
    setLoading(true);

    const obj =
      user.companyId === null
        ? `/reporters/goalsbydistri/${user?.distributionChannel?.soldToParty}`
        : `/reporters/goalsbycompanies/${user?.company?.resellerMasterId}`;

    if (user) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${obj}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (user.roleId === 1) {
            setGoal(golprogram);
          } else {
            if (res.data.length !== 0) {
              setGoal(res.data[0].meta);
            }
          }
        });
    }

    if (token && dataFromAxios.length === 0) {
      if (user.roleId === 1) {
        dispatch(getSalesBySegmentAll(token));
      }

      if (user.companyId === null) {
        dispatch(
          getSalesBySegmentDist(token, user.distributionChannel.soldToParty)
        );
      } else {
        dispatch(getSalesBySegmentComp(token, user.company.resellerMasterId));
      }
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (dataFromAxios.length !== 0) {
      setLoading(true);

      setTotalSales(dataFromAxios);

      const totalSalesReduce = Math.round(
        dataFromAxios.reduce(
          (acc, { total_sales_amount }) => acc + Number(total_sales_amount),
          0
        )
      );

      setSales(totalSalesReduce);

      const percentageTotal = Math.round(
        (totalSalesReduce * 100) / Number(goal)
      );
      setpercentageTotal(Number(goal) === 0 ? 100 : percentageTotal);

      const goalSales = dataFromAxios
        .reduce(
          (previous, { total_sales_amount }) =>
            previous + Number(total_sales_amount),
          0
        )
        .toLocaleString();

      setGoalSales(goalSales);

      infoPercentages(
        dataFromAxios.filter(
          ({ business_unit }) => business_unit === "Creative Cloud"
        ),
        dataFromAxios.filter(
          ({ business_unit }) => business_unit === "Document Cloud"
        )
      );

      setLoading(false);
    }
  }, [dataFromAxios, goal]);

  //This Function calculates the percentage of all CC business type and DC business type
  const infoPercentages = (ccInfoFilter, dcInfoFilter) => {
    const order = ["Teams", "Enterprise", "Education"];

    const compareObjectsCC = (a, b) => {
      const indexA = order.indexOf(a.typeCC);
      const indexB = order.indexOf(b.typeCC);
      return indexA - indexB;
    };
    const compareObjectsDC = (a, b) => {
      const indexA = order.indexOf(a.typeDC);
      const indexB = order.indexOf(b.typeDC);
      return indexA - indexB;
    };

    const arrayPercentageCC = ccInfoFilter
      .map((data) => {
        const allSalesCC = dataFromAxios
          .filter(({ business_unit }) => business_unit === "Creative Cloud")
          .map(({ total_sales_amount }) => Number(total_sales_amount))
          .reduce((previous, currently) => previous + currently);

        const percentage = (data.total_sales_amount * 100) / allSalesCC;

        return {
          typeCC: data.sub_bu,
          tablePercentage: percentage,
          sales: Number(data.total_sales_amount),
        };
      })
      .sort(compareObjectsCC);

    const arrayPercentageDC = dcInfoFilter
      .map((data) => {
        const allSalesCC = dataFromAxios
          .filter(({ business_unit }) => business_unit === "Document Cloud")
          .map(({ total_sales_amount }) => Number(total_sales_amount))
          .reduce((previous, currently) => previous + currently);

        const percentage = (data.total_sales_amount * 100) / allSalesCC;

        return {
          typeDC: data.sub_bu,
          tablePercentage: percentage,
          sales: Number(data.total_sales_amount),
        };
      })
      .sort(compareObjectsDC);

    setpercentageCC(arrayPercentageCC);
    setpercentageDC(arrayPercentageDC);
  };

  if (loading) {
    return <div className="lds-dual-ring"></div>;
  }
  function formatNumber(number) {
    const formattedNumber =
      number >= 1000000
        ? (number / 1000000).toFixed(1) + "M"
        : number >= 1000
        ? (number / 1000).toFixed(1) + "K"
        : number.toLocaleString("en-US");
    return formattedNumber;
  }

  return (
    <div className="w-full h-full bg-base-100 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      <BarBySegment
        percentageCC={percentageCC}
        percentageDC={percentageDC}
        formatNumber={formatNumber}
      />
      <Meta
        user={user}
        formatNumber={formatNumber}
        goal={goal}
        percentageTotal={percentageTotal}
        sales={sales}
      />
      <RankingTable />
    </div>
  );
};

export default TableStats;
