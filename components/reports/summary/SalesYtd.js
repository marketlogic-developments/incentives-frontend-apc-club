import React, { useState } from "react";
import { SearchInput } from "../../inputs";
import {
  ArrowDown,
  Check,
  Circle,
  CloudDownload,
  Filter,
  SearchIcon,
} from "../../icons";
import SelectInputValue from "../../inputs/SelectInputValue";
import BtnFilter from "../../cardReportes/BtnFilter";
import { useTranslation } from "react-i18next";
import BtnWithImage from "../../cardReportes/BtnWithImage";
import HorizontalBar from "../../charts/HorizontalBar";
import CardChart from "../../cardReportes/CardChart";
import TargetSales from "../../dashboard/GraphSales/TargetSales";
import PerformaceSales from "../../dashboard/GraphSales/PerformaceSales";
import BarCircleChart from "../../charts/BarCircleChart";
import BarChar from "../../cardReportes/BarChar";
import SortedTable from "../../table/SortedTable";
import SalesYtdMultiselectModal from "../../ModalStateProducts/SalesYtdMultiselectModal";

const SalesYtd = () => {
  /* Variable and const */
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const [goalAmount, setGoalAmount] = useState([100, 200, 300, 400]);
  const [totalSales, setTotalSales] = useState([150, 250, 350, 450]);
  const dataTotalSaleGoal = {
    expected: "61,910,384",
    reached: "50,866,384",
    progress: "82%",
  };
  const xValuesLine = ["Q1", "Q2", "Q3", "Q4"];
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

  return (
    <div className="m-5">
      <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SelectInputValue
          placeholder={"Year"}
          /* value={selectOne}
          data={dataSelectOne} */
          icon={<ArrowDown />}
          searchable={true}
          /* onChange={handleSelectOneChange} */
          name={"year"}
        />
        <SelectInputValue
          placeholder={"Quarter"}
          icon={<ArrowDown />}
          searchable={true}
          name={"quarter"}
        />
        <SelectInputValue
          placeholder={"Month"}
          icon={<ArrowDown />}
          searchable={true}
          name={"month"}
        />
        <SelectInputValue
          placeholder={"Region"}
          icon={<ArrowDown />}
          searchable={true}
          name={"region"}
        />
        <SalesYtdMultiselectModal
          title={<p className="text-black font-bold text-lg">Filtrar por</p>}
          datas={multiSelect}
        />
        <div className="w-4/5 justify-end">
          <BtnFilter
            text={t("Reportes.limpiar_filtros")}
            styles="bg-white !text-gray-400 sm:!text-base hover:bg-white hover:!text-blue-500 border-none hover:border-none m-1"
            /* onClick={clearSelects} */
          />
        </div>
      </div>
      <div className="p-3">
        <h1 className="text-black font-bold">Total Sales vs Goals</h1>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 divide-x">
        <div className="flex justify-center gap-3">
          <Circle />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Expected</h3>
            <h1 className="text-black font-bold">
              $ {dataTotalSaleGoal.expected}
            </h1>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Check />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Reached</h3>
            <h1 className="text-black font-bold">
              $ {dataTotalSaleGoal.reached}
            </h1>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Circle />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Progress</h3>
            <h1 className="text-black font-bold">
              {dataTotalSaleGoal.progress}
            </h1>
          </div>
        </div>
      </div>
      <div className="grid">
        <CardChart title={"Region vs Goals"} paragraph="">
          <HorizontalBar
            yNames={["Nola", "Sola", "Mexico", "Brazil"]}
            datas={[
              { value: 250, color: "#2799F6" },
              { value: 230, color: "#1473E6" },
              { value: 200, color: "#1C2226" },
              { value: 180, color: "#21A5A2" },
            ]}
          />
        </CardChart>
      </div>
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
      <div className="flex flex-col">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <BarCircleChart
            datas={[
              { data: 0.25, color: "#232B2F" },
              { data: 0.5, color: "#1473E6" },
              { data: 0.75, color: "#21A5A2" },
            ]}
          />
          <CardChart title={"Marketplace & VIP"} paragraph="">
            <BarChar
              title={"Monthly sales"}
              colorBarOne={"black"}
              colorBarTwo={"#2799F6"}
              dataLeyend={["VIP", "Marketplace"]}
              dataOne={goalAmount}
              dataTwo={totalSales}
              xValues={xValuesLine}
            />
          </CardChart>
        </div>
      </div>
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
