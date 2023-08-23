import React, { useState } from "react";
import { SearchInput } from "../../../inputs";
import { ArrowDown, Check, Circle } from "../../../icons";
import { useTranslation } from "react-i18next";
import HorizontalBar from "../../../charts/HorizontalBar";
import CardChart from "../../../cardReportes/CardChart";
import BarCircleChart from "../../../charts/BarCircleChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSalesBySegmentAll,
  getSalesPerformance,
} from "../../../../store/reducers/sales.reducer";
import { useMemo } from "react";
import GraphMarketVIP from "./GraphMarketVIP";
import FilterSection from "./FilterSection";
import SortedTable from "../../../table/SortedTable";
import SalesGoalsSection from "./SalesGoalsSection";

const SalesYtd = () => {
  /* Variable and const */
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const goalYear = useSelector((state) => state.user.user.company.goalsPerYear);
  const sales = useSelector((state) => state.sales.salesgement);
  const token = useSelector((state) => state.user.token);
  const [regionVsGoals, setRegionVsGoals] = useState({
    name: "",
    value: 0,
    color: "",
  });
  const [totalSales, setTotalSales] = useState(0);
  const dataTable = [
    {
      segmento: "Commercial",
      total_sales: 1760017,
      digipoints: 1760017,
    },
    {
      segmento: "Goverment",
      total_sales: 208991,
      digipoints: 208991,
    },
    {
      segmento: "Education",
      total_sales: 244656,
      digipoints: 244656,
    },
  ];
  const multiSelect = [
    {
      placeholder: "Year",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "year",
    },
    {
      placeholder: "Quater",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "quater",
    },
    {
      placeholder: "Month",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "Month",
    },
    {
      placeholder: "Region",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "region",
    },
    {
      placeholder: "Country",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "country",
    },
    {
      placeholder: "Partner level",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "partner_level",
    },
    {
      placeholder: "Partner",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "partner",
    },
    {
      placeholder: "Market segment",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "market_segment",
    },
    {
      placeholder: "Business unit",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "business_unit",
    },
    {
      placeholder: "Business type",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "business_type",
    },
    {
      placeholder: "Licensing type",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "licensiong",
    },
  ];
  const colorMapping = {
    NOLA: "#2799F6",
    SOLA: "#1473E6",
    MEXICO: "#1C2226",
    BRAZIL: "#21A5A2",
  };
  const dataTotalSaleGoal = useMemo(
    () => ({
      expected: goalYear,
      reached: totalSales,
      progress: `${Math.floor(Math.round((totalSales * 100) / goalYear))}%`,
    }),
    [totalSales, goalYear]
  );

  const getColorForField = (value, mapping, defaultColor = "#828282") => {
    return mapping[value] || defaultColor;
  };

  const calculateTotalRevenueByRegion = (data) => {
    const regions = ["NOLA", "SOLA", "MEXICO", "BRAZIL"];

    const revenueByRegion = {};

    regions.forEach((region) => {
      const totalRevenue = data.reduce((total, obj) => {
        if (obj.region === region) {
          const revenue = parseFloat(Number(obj.total_revenue).toFixed(2));
          return total + revenue;
        }
        return total;
      }, 0);
      revenueByRegion[region] = totalRevenue;
    });

    return revenueByRegion;
  };

  const salesReduce = () => {
    const totalSalesReduce = Math.round(
      sales.reduce(
        (acc, { total_sales_amount }) => acc + Number(total_sales_amount),
        0
      )
    );

    setTotalSales(totalSalesReduce);
  };

  const formattedNumber = (numero) => {
    // Redondear el número hacia abajo para eliminar la parte decimal
    numero = Math.floor(numero);

    // Convertir el número a cadena de texto
    let numeroStr = numero.toString();

    // Dividir la cadena en grupos de tres caracteres desde la derecha
    let grupos = [];
    while (numeroStr.length > 0) {
      grupos.unshift(numeroStr.slice(-3));
      numeroStr = numeroStr.slice(0, -3);
    }

    // Unir los grupos con comas y retornar el resultado
    return grupos.join(",");
  };

  useEffect(() => {
    dispatch(getSalesPerformance(token)).then((res) => {
      const revenueByRegion = calculateTotalRevenueByRegion(res.payload);
      const formattedData = Object.keys(revenueByRegion).map((region) => ({
        name: region,
        value: Number(revenueByRegion[region]).toFixed(2),
        color: getColorForField(region, colorMapping),
      }));
      setRegionVsGoals(formattedData);
    });
  }, []);

  useEffect(() => {
    if (sales.length === 0) {
      dispatch(getSalesBySegmentAll(token));
    }

    if (sales.length !== 0) {
      salesReduce();
    }
  }, [sales]);

  return (
    <div className="m-5">
      {multiSelect.length && <FilterSection multiSelect={multiSelect} />}
      {dataTotalSaleGoal && (
        <SalesGoalsSection
          totalSaleGoal={{
            expected: formattedNumber(dataTotalSaleGoal.expected),
            reached: formattedNumber(dataTotalSaleGoal.reached),
            progress: dataTotalSaleGoal.progress,
          }}
        />
      )}
      {/* REGION VS GOALS SECTION */}
      <div className="grid">
        <CardChart title={"Region vs Goals"} paragraph="">
          {regionVsGoals.length && <HorizontalBar datas={regionVsGoals} />}
        </CardChart>
      </div>
      {/* TARGET SALES SECTION */}
      <div className="flex flex-col w-full gap-6 mt-5 mb-5">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
          <CardChart>
            {/* <TargetSales
              data={CC}
              goal={goals.filter(
                ({ business_unit }) => business_unit === "Creative Cloud"
              )}
            /> */}
          </CardChart>
          <CardChart>
            {/* <TargetSales
              data={DC}
              goal={goals.filter(
                ({ business_unit }) => business_unit === "Document Cloud"
              )}
            /> */}
          </CardChart>
          <CardChart>
            {/* <PerformaceSales CC={CC} DC={DC} goals={goals} /> */}
          </CardChart>
        </div>
      </div>
      {/* MARKET PLACE SECTION */}
      <div className="flex flex-col">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <BarCircleChart
            datas={[
              { data: 0.25, color: "#232B2F" },
              { data: 0.5, color: "#1473E6" },
              { data: 0.75, color: "#21A5A2" },
            ]}
          />
          {/* <GraphMarketVIP token={token} /> */}
        </div>
      </div>
      {/* TABLE SECTION */}
      <div className="justify-items-center pt-5">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && (
          <SortedTable
            containerStyles={
              "mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max !w-full"
            }
            tableStyles={"table-zebra !text-sm"}
            colStyles={"p-2"}
            thStyles={"sticky text-white"}
            cols={[
              {
                rowStyles: "",
                sort: false,
                symbol: "",
                identity: "segmento",
                columnName: "Segmento",
              },
              {
                symbol: "USD",
                identity: "total_sales",
                columnName: "Total Sales USD",
              },
              {
                symbol: "USD",
                identity: "digipoints",
                columnName: "DigiPoints",
              },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            currentItems={dataTable}
            sumColum={true}
          />
        )}
      </div>
    </div>
  );
};

export default SalesYtd;
