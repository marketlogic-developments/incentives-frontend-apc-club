import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesBySegment,
  getSalesBySegmentComp,
  getSalesBySegmentDist,
  getSalesBySegmentAll,
} from "../../store/reducers/sales.reducer";

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

  console.log(user);

  useEffect(() => {
    setLoading(true);

    const obj =
      user.companyId === null
        ? `/reporters/goalsbydistri/${user.distributionChannel.soldToParty}`
        : `/reporters/goalsbycompanies/${user.company.resellerMasterId}`;

    axios
      .get(`${process.env.BACKURL}${obj}`, {
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
      console.log(dataFromAxios);
      const totalSalesReduce = Math.round(
        dataFromAxios.reduce(
          (acc, { total_sales_amount }) => acc + Number(total_sales_amount),
          0
        )
      );

      setSales(totalSalesReduce);
      console.log(goal)
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
  }, [dataFromAxios,goal]);

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
    const formattedNumber = number >= 1000000
      ? (number / 1000000).toFixed(1) + "M"
      : number >= 1000
        ? (number / 1000).toFixed(1) + "K"
        : number.toLocaleString("en-US");
    return formattedNumber;
  }

  return (
    <div className="container w-full h-full bg-base-100 flex flex-col sm:flex-row justify-between max-sm:justify-center">
      <div className="w-8/12 max-sm:mx-auto flex flex-col gap-5 progressiveBar justify-center">
        <div className="w-full h-16 flex items-center gap-10 gapBar">
          <div className="flex items-center h-full cct max-sm:w-64 w-32 text-center">
            <img src="/assets/dashboard/cc.webp" width={100}></img>
          </div>
          <div className="w-10/12 flex flex-col items-center justify-around h-full">
            <div className="w-full flex justify-around">
              <p className="text-sm font-semibold border-b-2 border-b-red-600">
                Teams
              </p>
              <p className="text-sm font-semibold border-b-sky-600 border-b-2 ">
                Enterprise
              </p>
              <p className="text-sm font-semibold border-b-2 border-b-green-600">
                Education
              </p>
            </div>
            <div className="w-full bg-base-200 h-4 flex">
              {percentageCC.map((data) => (
                <div
                  className={`tooltip ${
                    data.typeCC === "Teams"
                      ? "tooltip-primary bg-primary"
                      : data.typeCC === "Enterprise"
                      ? "tooltip-secondary bg-secondary"
                      : "tooltip-success bg-success"
                  } h-full`}
                  data-tip={`$${new Intl.NumberFormat().format(
                    parseInt(data.sales)
                  )}`}
                  style={{ width: `${data.tablePercentage}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-16 flex items-center gap-10 gapBar">
          <div className="flex items-center h-full cci max-sm:w-64 w-32 text-center">
            <img src="/assets/dashboard/DC.webp" width={100}></img>
          </div>
          <div className="w-10/12 flex flex-col items-center justify-around h-full">
            <div className="w-full flex justify-around">
              <p className="text-sm font-semibold border-b-2 border-b-red-600">
              Acrobat Pro
              </p>
              <p className="text-sm font-semibold border-b-sky-600 border-b-2">
                Enterprise
              </p>
              <p className="text-sm font-semibold border-b-2 border-b-green-600">
                Education
              </p>
            </div>
            <div className="w-full bg-base-200 h-4 flex">
              {percentageDC.map((data) => (
                <div
                  className={`tooltip ${
                    data.typeDC === "Teams"
                      ? "tooltip-primary bg-primary"
                      : data.typeDC === "Enterprise"
                      ? "tooltip-secondary bg-secondary"
                      : "tooltip-success bg-success"
                  } h-full`}
                  data-tip={`$${new Intl.NumberFormat().format(
                    parseInt(data.sales)
                  )}`}
                  style={{
                    width: `${data.tablePercentage}%`,
                    color: "#ffffff",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center w-4/12 max-sm:w-full justify-center gap-10">
        {user.roleId !== 1 && (
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-center">Meta:</p>
            <p className="text-center font-bold text-2xl">{formatNumber(goal)}</p>
          </div>
        )}
        {user.roleId == 1 && (
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-center">Meta:</p>
            <p className="text-center font-bold text-2xl">{formatNumber(goal)}</p>
          </div>
        )}

        <div className="h-full w-min">
          <div
            className="radial-progress flex justify-center items-center text-primary"
            style={{
              "--value": percentageTotal,
              "--size": "9rem",
              "--thickness": "2px",
            }}
          >
            <div className="w-5/6 h-5/6 bg-primary text-center p-5 flex flex-col items-center justify-center rounded-full text-white">
              <p className="font-bold text-md">${formatNumber(sales)}</p>
              <p className="text-sm">{percentageTotal}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableStats;
