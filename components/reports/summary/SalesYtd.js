import React from "react";
import { SearchInput } from "../../inputs";
import { ArrowDown, CloudDownload, Filter, SearchIcon } from "../../icons";
import SelectInputValue from "../../inputs/SelectInputValue";
import BtnFilter from "../../cardReportes/BtnFilter";
import { useTranslation } from "react-i18next";
import BtnWithImage from "../../cardReportes/BtnWithImage";

const SalesYtd = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div>
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
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
};

export default SalesYtd;
