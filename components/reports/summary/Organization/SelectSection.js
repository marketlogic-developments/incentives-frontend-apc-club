import React from "react";
import SelectInputValue from "../../../inputs/SelectInputValue";
import { ArrowDown } from "../../../icons";
import SalesYtdMultiselectModal from "../../../ModalStateProducts/SalesYtdMultiselectModal";
import BtnFilter from "../../../cardReportes/BtnFilter";
import { useTranslation } from "react-i18next";

const SelectSection = ({
  region,
  country,
  company,
  multiSelect,
  handleFilters,
  filters,
  clearSelects,
}) => {
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <SelectInputValue
        placeholder={"Region"}
        value={filters.region}
        data={region.map((region) => ({
          label: region,
          value: region,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"region"}
      />
      <SelectInputValue
        placeholder={"Organization"}
        value={filters.company_name}
        data={company.map((company) => ({
          label: company,
          value: company,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"company_name"}
      />
      <SelectInputValue
        placeholder={"Country"}
        value={filters.country}
        data={country.map((country) => ({
          label: country,
          value: country,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"country"}
      />
      {/* <SelectInputValue
        placeholder={"Level"}
        icon={<ArrowDown />}
        searchable={true}
        name={"level"}
      /> */}
      {/* <SalesYtdMultiselectModal
        title={<p className="text-black font-bold text-lg">Filtrar por</p>}
        datas={multiSelect}
      /> */}
      <div className="w-4/5 justify-end">
        <BtnFilter
          text={t("Reportes.limpiar_filtros")}
          styles="bg-white !text-gray-400 sm:!text-base hover:bg-white hover:!text-blue-500 border-none hover:border-none m-1"
          onClick={clearSelects}
        />
      </div>
    </>
  );
};

export default SelectSection;
