import React from "react";
import SelectInputValue from "../../../inputs/SelectInputValue";
import { ArrowDown } from "../../../icons";
import SalesYtdMultiselectModal from "../../../ModalStateProducts/SalesYtdMultiselectModal";
import BtnFilter from "../../../cardReportes/BtnFilter";
import { useTranslation } from "react-i18next";

const SelectSection = ({ multiSelect }) => {
    const [t, i18n] = useTranslation("global");
  return (
    <>
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
    </>
  );
};

export default SelectSection;
