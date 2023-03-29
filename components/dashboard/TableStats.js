import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TableStats = () => {
  const token = useSelector((state) => state.user.token);
  const company = useSelector((state) => state.user.company);
  const [totalSales, setTotalSales] = useState([]);
  const [percentageTotal, setpercentageTotal] = useState(0);
  const [goalSales, setGoalSales] = useState(0);
  const [percentageCC, setpercentageCC] = useState([]);
  const [percentageDC, setpercentageDC] = useState([]);

  console.log(company);

  const dataFromAxios = [
    {
      sale_type: "CC",
      market_segment: "TEAMS",
      total_sales: "358047.61",
    },
    {
      sale_type: "CC",
      market_segment: "ENTERPRISE",
      total_sales: "250982.55",
    },
    { sale_type: "CC", market_segment: "EDUCATION", total_sales: "26982.55" },
    {
      sale_type: "DC",
      market_segment: "TEAMS",
      total_sales: "336919.26",
    },
    {
      sale_type: "DC",
      market_segment: "ENTERPRISE",
      total_sales: "250573.91",
    },
    { sale_type: "DC", market_segment: "EDUCATION", total_sales: "76573.91" },
  ];

  useEffect(() => {
    // axios
    //   .get(`${process.env.BACKURL}/reporters/salesbysegment`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    setTotalSales(dataFromAxios);
    setpercentageTotal(
      parseInt(
        (dataFromAxios
          .map(({ total_sales }) => Number(total_sales))
          .reduce((previous, currently) => previous + currently) *
          100) /
          company.goalsPerQuarter
      )
    );
    setGoalSales(
      new Intl.NumberFormat().format(
        parseInt(
          dataFromAxios
            .map(({ total_sales }) => Number(total_sales))
            .reduce((previous, currently) => previous + currently)
        )
      )
    );
    infoPercentages(
      dataFromAxios.filter(({ sale_type }) => sale_type === "CC"),
      dataFromAxios.filter(({ sale_type }) => sale_type === "DC")
    );
  }, []);

  //This Function calculates the percentage of all CC business type and DC business type
  const infoPercentages = (ccInfoFilter, dcInfoFilter) => {
    const arrayPercentageCC = ccInfoFilter.map((data) => {
      const allSalesCC = dataFromAxios
        .filter(({ sale_type }) => sale_type === "CC")
        .map(({ total_sales }) => Number(total_sales))
        .reduce((previous, currently) => previous + currently);

      const percentage = (data.total_sales * 100) / allSalesCC;

      return {
        typeCC: data.market_segment,
        tablePercentage: percentage,
        sales: Number(data.total_sales),
      };
    });

    const arrayPercentageDC = dcInfoFilter.map((data) => {
      const allSalesCC = dataFromAxios
        .filter(({ sale_type }) => sale_type === "DC")
        .map(({ total_sales }) => Number(total_sales))
        .reduce((previous, currently) => previous + currently);

      const percentage = (data.total_sales * 100) / allSalesCC;

      return {
        typeDC: data.market_segment,
        tablePercentage: percentage,
        sales: Number(data.total_sales),
      };
    });

    setpercentageCC(arrayPercentageCC);
    setpercentageDC(arrayPercentageDC);
  };

  return (
    <div className="container w-full h-full bg-base-100 flex flex-col sm:flex-row justify-between max-sm:justify-center">
      <div className="w-8/12 max-sm:mx-auto flex flex-col gap-5 progressiveBar justify-center">
        <div className="w-full h-16 flex items-center gap-10 gapBar">
          <div className="flex items-center h-full cct max-sm:w-64 w-32 text-center">
            <img src="/assets/dashboard/cc.webp" width={100}></img>
          </div>
          <div className="w-10/12 flex flex-col items-center justify-around h-full">
            <div className="w-full flex justify-around">
              <p className="text-sm font-semibold border-b-2 border-b-orange-500">
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
                    data.typeCC === "TEAMS"
                      ? "tooltip-primary bg-primary"
                      : data.typeCC === "ENTERPRISE"
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
              <p className="text-sm font-semibold border-b-2 border-b-orange-500">
                Teams
              </p>
              <p className="text-sm font-semibold border-b-sky-600 border-b-2">
                Enterprise
              </p>
              <p className="text-sm font-semibold border-b-2 border-b-red-600">
                Education
              </p>
            </div>
            <div className="w-full bg-base-200 h-4 flex">
              {percentageDC.map((data) => (
                <div
                  className={`tooltip ${
                    data.typeDC === "TEAMS"
                      ? "tooltip-primary bg-primary"
                      : data.typeDC === "ENTERPRISE"
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
        <div className="flex flex-col gap-5">
          <p className="font-semibold text-center">Partner Goal:</p>
          <p className="text-center font-bold text-2xl">{`$${new Intl.NumberFormat().format(
            parseInt(Number(company.goalsPerQuarter))
          )}`}</p>
        </div>
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
              <p className="font-bold text-md">${goalSales}</p>
              <p className="text-sm">{percentageTotal}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableStats;
