import React, { useState } from "react";
import SelectInputValue from "../../inputs/SelectInputValue";
import { ArrowDown, Circle } from "../../icons";
import BtnFilter from "../../cardReportes/BtnFilter";
import SalesYtdMultiselectModal from "../../ModalStateProducts/SalesYtdMultiselectModal";
import { useTranslation } from "react-i18next";
import CardChart from "../../cardReportes/CardChart";
import HorizontalDoubleChart from "../../charts/HorizontalDoubleChart";
import SortedTable from "../../table/SortedTable";

const SalesYoy = () => {
  /* Variable and const */
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const dataTotalSaleGoal = {
    sales_ago: "61,910,384",
    sale_now: "50,866,384",
  };
  const dataTable = [
    {
      level: "Gold",
      partners_ly: "Partner 1",
      partners_ytd: "Platinum certified",
      sales_ly: 1760017,
      sales_ytd: 1760017,
    },
    {
      level: "Platinum",
      partners_ly: "Partner 2",
      partners_ytd: "Gold certified",
      sales_ly: 208991,
      sales_ytd: 208991,
    },
    {
      level: "Distris",
      partners_ly: "Partner 3",
      partners_ytd: "Gold certified",
      sales_ly: 244656,
      sales_ytd: 244656,
    },
    {
      level: "SOLA",
      partners_ly: "Partner 4",
      partners_ytd: "Gold certified",
      sales_ly: 222374,
      sales_ytd: 222374,
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
  const date = new Date();
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
        <h1 className="text-black font-bold">Total sales vs Sales Last Year</h1>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 divide-x">
        <div className="flex justify-center gap-3">
          <Circle />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">
              Ventas {date.getFullYear() - 1}
            </h3>
            <h1 className="text-black font-bold">
              $ {dataTotalSaleGoal.sales_ago}
            </h1>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Circle />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">
              Ventas {date.getFullYear()}
            </h3>
            <h1 className="text-black font-bold">
              $ {dataTotalSaleGoal.sale_now}
            </h1>
          </div>
        </div>
      </div>
      <div className="grid pt-4 pb-4">
        <CardChart
          title={"Region vs Goals"}
          paragraph=""
          content={
            <div className="grid justify-items-end">
              <SelectInputValue
                placeholder={"Period"}
                /* value={selectOne}
                data={dataSelectOne} */
                icon={<ArrowDown />}
                searchable={true}
                /* onChange={handleSelectOneChange} */
                name={"period"}
              />
            </div>
          }
        >
          <HorizontalDoubleChart
            yNames={["Nola", "Sola", "Mexico", "Brazil"]}
            datas={[
              {
                leyend: "Current year",
                values: [18203, 23489, 29034, 104970],
                color: "#1473E6",
              },
              {
                leyend: "Last year",
                values: [19325, 23438, 31000, 121594],
                color: "#1C2226",
              },
            ]}
          />
        </CardChart>
      </div>
      <div className="grid pt-4 pb-4 sm:grid-cols-2 grid-rows-1 gap-4">
        <CardChart
          title={"Business Type vs Sales LY"}
          paragraph=""
          content={
            <div className="grid justify-items-end">
              <SelectInputValue
                placeholder={"Period"}
                /* value={selectOne}
                data={dataSelectOne} */
                icon={<ArrowDown />}
                searchable={true}
                /* onChange={handleSelectOneChange} */
                name={"period"}
              />
            </div>
          }
        >
          <HorizontalDoubleChart
            yNames={["New business", "Renewal"]}
            datas={[
              {
                leyend: "Current year",
                values: [18203, 23489],
                color: "#1473E6",
              },
              {
                leyend: "Last year",
                values: [19325, 23438],
                color: "#1C2226",
              },
            ]}
          />
        </CardChart>
        <CardChart
          title={"Business unit vs Sales LY"}
          paragraph=""
          content={
            <div className="grid justify-items-end">
              <SelectInputValue
                placeholder={"Period"}
                /* value={selectOne}
                data={dataSelectOne} */
                icon={<ArrowDown />}
                searchable={true}
                /* onChange={handleSelectOneChange} */
                name={"period"}
              />
            </div>
          }
        >
          <HorizontalDoubleChart
            yNames={["Document cloud", "Creative cloud"]}
            datas={[
              {
                leyend: "Current year",
                values: [29034, 104970],
                color: "#1473E6",
              },
              {
                leyend: "Last year",
                values: [31000, 121594],
                color: "#1C2226",
              },
            ]}
          />
        </CardChart>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-black font-bold text-3xl">
          Market Segment vs Last Year
        </p>
        <SelectInputValue
          placeholder={"Quarter"}
          icon={<ArrowDown />}
          searchable={true}
          name={"quarter"}
        />
        <SelectInputValue
          placeholder={"Business type"}
          icon={<ArrowDown />}
          searchable={true}
          name={"business_type"}
        />
        <SelectInputValue
          placeholder={"Business unit"}
          icon={<ArrowDown />}
          searchable={true}
          name={"business_unit"}
        />
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
                identity: "level",
                columnName: "Level",
              },
              {
                symbol: "",
                identity: "partners_ly",
                columnName: "Partners LY(#)",
              },
              {
                symbol: "",
                identity: "partners_ytd",
                columnName: "Partners YTD(#)",
              },
              {
                symbol: "USD",
                identity: "sales_ly",
                columnName: "Sales LY(#)",
              },
              {
                symbol: "USD",
                identity: "sales_ytd",
                columnName: "Sales YTD(#)",
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

export default SalesYoy;
