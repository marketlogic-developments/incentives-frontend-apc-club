import React from "react";
import SelectInputValue from "../../../inputs/SelectInputValue";
import { ArrowDown } from "../../../icons";
import SalesYtdMultiselectModal from "../../../ModalStateProducts/SalesYtdMultiselectModal";
import BtnFilter from "../../../cardReportes/BtnFilter";
import { useTranslation } from "react-i18next";

const SelectSection = ({
  year,
  companiesName = [],
  countries = [],
  regions = [],
  handleFilters,
  clearSelects,
  filters,
  multiSelect,
}) => {
  const [t, i18n] = useTranslation("global");
  return (
    <>
        <SelectInputValue
          placeholder={"Year"}
          value={filters.year}
          data={year.map((year) => ({
            label: year,
            value: year,
          }))}
          icon={<ArrowDown />}
          searchable={false}
          onChange={handleFilters}
          name={"year"}
        />
       <SelectInputValue
        placeholder={"Company Name"}
        value={filters.company_name}
        data={companiesName.map((company_name) => ({
          label: company_name.name,
          value: company_name.name,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"company_name"}
      />
      <SelectInputValue
        placeholder={"Country"}
        value={filters.country}
        data={countries.map((country) => ({
          label: country.name,
          value: country.name,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"country"}
      />
      <SelectInputValue
        placeholder={"Region"}
        value={filters.region}
        data={regions.map((region) => ({
          label: region.name,
          value: region.name,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"region"}
      />
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
