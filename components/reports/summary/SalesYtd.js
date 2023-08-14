import React from "react";
import { SearchInput } from "../../inputs";
import { ArrowDown, CloudDownload, SearchIcon } from "../../icons";
import SelectInputValue from "../../inputs/SelectInputValue";
import BtnFilter from "../../cardReportes/BtnFilter";
import { useTranslation } from "react-i18next";
import BtnWithImage from "../../cardReportes/BtnWithImage";

const SalesYtd = () => {
  const [t, i18n] = useTranslation("global");
  return (
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
        /* value={selectOne}
          data={dataSelectOne} */
        icon={<ArrowDown />}
        searchable={true}
        /* onChange={handleSelectOneChange} */
        name={"quarter"}
      />
      <SelectInputValue
        placeholder={"Month"}
        /* value={selectOne}
          data={dataSelectOne} */
        icon={<ArrowDown />}
        searchable={true}
        /* onChange={handleSelectOneChange} */
        name={"month"}
      />
      <SelectInputValue
        placeholder={"Region"}
        /* value={selectOne}
          data={dataSelectOne} */
        icon={<ArrowDown />}
        searchable={true}
        /* onChange={handleSelectOneChange} */
        name={"region"}
      />
      <BtnWithImage
        text={t("Reportes.descargar")}
        icon={<CloudDownload />}
        styles={
          "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
        }
        /* onClick={() => importFile(data)} */
      />
      <div className="w-4/5 justify-end">
      <BtnFilter
        text={t("Reportes.limpiar_filtros")}
        styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
        /* onClick={clearSelects} */
      />
      </div>
    </div>
  );
};

export default SalesYtd;
