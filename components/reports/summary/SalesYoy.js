import React from "react";
import SelectInputValue from "../../inputs/SelectInputValue";
import { ArrowDown, Circle } from "../../icons";
import BtnFilter from "../../cardReportes/BtnFilter";
import SalesYtdMultiselectModal from "../../ModalStateProducts/SalesYtdMultiselectModal";
import { useTranslation } from "react-i18next";
import CardChart from "../../cardReportes/CardChart";
import HorizontalDoubleChart from "../../charts/HorizontalDoubleChart";

const SalesYoy = () => {
  /* Variable and const */
  const [t, i18n] = useTranslation("global");
  const dataTotalSaleGoal = {
    sales_ago: "61,910,384",
    sale_now: "50,866,384",
  };
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
      <div className="grid">
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
    </div>
  );
};

export default SalesYoy;
