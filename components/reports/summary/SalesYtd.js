import React from "react";
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
import GraphSales from "../../dashboard/graphSales";

const SalesYtd = () => {
  /* Variable and const */
  const [t, i18n] = useTranslation("global");
  const expected = "61,910,384";
  const reached = "50,866,384";
  const progress = "82%";

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
        <BtnWithImage
          text={t("Más filtros")}
          icon={<Filter />}
          styles={
            "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
          }
          /* onClick={() => importFile(data)} */
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
            <h1 className="text-black font-bold">$ {expected}</h1>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Check />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Reached</h3>
            <h1 className="text-black font-bold">$ {reached}</h1>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Circle />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Progress</h3>
            <h1 className="text-black font-bold">{progress}</h1>
          </div>
        </div>
      </div>
      <div className="grid">
        <CardChart title={"Region vs Goals"} paragraph="">
          <HorizontalBar />
        </CardChart>
      </div>
      <div className="flex flex-col w-full gap-6 mt-5">
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
    </div>
  );
};

export default SalesYtd;
