import { useTranslation } from "react-i18next";
import SalesYtdMultiselectModal from "../../../ModalStateProducts/SalesYtdMultiselectModal";
import BtnFilter from "../../../cardReportes/BtnFilter";
import { ArrowDown } from "../../../icons";
import SelectInputValue from "../../../inputs/SelectInputValue";
import { useState } from "react";
import { useEffect } from "react";
import MultiSelectInput from "../../../inputs/MultiSelectInput";
import { Button } from "primereact/button";
import MultiSelectPrime from "../../../inputs/MultiSelectPrime";

const FilterSection = ({
  year,
  companyName,
  levels,
  region,
  countries,
  quarters,
  multiFilterButton,
  multiFilter,
  handleFilters,
  handleMultiFilters,
  filters,
  multiSelect,
  clearSelects,
}) => {
  const [t, i18n] = useTranslation("global");
  const [screen, setScreen] = useState();

  useEffect(() => {
    setScreen(window.innerWidth);
    const handleWindowResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div className="pt-2 grid items-center sm:grid-cols-6 grid-cols-2 gap-3">
      <div className={screen < 639 ? "hidden" : "col-span-6 grid gap-2"}>
        <div className={screen < 639 ? "hidden" : "col-span-6"}>
          <MultiSelectPrime
            placeholder={"Company Name"}
            value={multiFilter}
            data={companyName.map((company_name) => ({
              label: company_name.name,
              value: encodeURIComponent(company_name.id),
            }))}
            icon={<ArrowDown />}
            selectionLimit={99}
            searchable={true}
            onChange={handleMultiFilters}
            name={"company_name"}
            handleFilter={multiFilterButton}
          />
        </div>
        <SelectInputValue
          placeholder={"Region"}
          value={filters.region}
          data={region.map((region) => ({ label: region, value: region }))}
          icon={<ArrowDown />}
          searchable={true}
          onChange={handleFilters}
          name={"region"}
        />

        <SelectInputValue
          placeholder={"Country"}
          value={filters.country_id}
          data={countries.map((country_id) => ({
            label: country_id.name,
            value: country_id.name,
          }))}
          icon={<ArrowDown />}
          searchable={true}
          onChange={handleFilters}
          name={"country_id"}
        />

      <SelectInputValue
        placeholder={"Quarter"}
        value={filters.quarter}
        data={quarters.map((quarter) => ({
          label: quarter.name,
          value: quarter.name,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"quarter"}
      />

        {/* <SelectInputValue
          placeholder={"Partner level"}
          value={filters.level}
          data={levels.map((level) => ({ label: level, value: level }))}
          icon={<ArrowDown />}
          searchable={true}
          onChange={handleFilters}
          name={"level"}
        /> */}
        {/* <SalesYtdMultiselectModal
          title={
            <p className="text-black font-bold text-lg">
              {t("Reportes.filter_by")}
            </p>
          }
          datas={multiSelect}
          clearSelects={clearSelects}
          multiFilterButton={multiFilterButton}
        /> */}
        {/* <div className="w-4/5 justify-end">
          <BtnFilter
            text={t("Filter")}
            styles="bg-white !text-gray-400 sm:!text-base hover:bg-white hover:!text-blue-500 border-none hover:border-none m-1"
            onClick={multiFilterButton}
          />
        </div> */}
        <div className="w-4/5 justify-end">
          <BtnFilter
            text={t("Reportes.clean_filters")}
            styles="bg-white !text-gray-400 sm:!text-base hover:bg-white hover:!text-blue-500 border-none hover:border-none m-1"
            onClick={clearSelects}
          />
        </div>
      </div>
      <div className={screen > 639 ? "hidden" : "block"}>
        <SalesYtdMultiselectModal
          title={
            <p className="text-black font-bold text-lg">
              {t("Reportes.filter_by")}
            </p>
          }
          datas={multiSelect}
          clearSelects={clearSelects}
          multiFilterButton={multiFilterButton}
        />
      </div>
      <div className={screen > 639 ? "hidden" : "block"}>
        <div className="w-4/5 justify-end">
          <BtnFilter
            text={t("Reportes.clean_filters")}
            styles="bg-white !text-gray-400 sm:!text-base hover:bg-white hover:!text-blue-500 border-none hover:border-none m-1"
            onClick={clearSelects}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
