import { useTranslation } from "react-i18next";
import SalesYtdMultiselectModal from "../../../ModalStateProducts/SalesYtdMultiselectModal";
import BtnFilter from "../../../cardReportes/BtnFilter";
import { ArrowDown } from "../../../icons";
import SelectInputValue from "../../../inputs/SelectInputValue";

const FilterSection = ({
  companyName,
  levels,
  region,
  countries,
  quarter,
  month,
  marketSegment,
  businessUnit,
  companyType,
  handleFilters,
  filters,
  multiSelect,
  clearSelects,
  dataLoaded
}) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
      {!dataLoaded && <div className="lds-dual-ring"></div>}
      <SelectInputValue
        placeholder={"Company"}
        value={filters.company_type}
        data={companyType.map((company_type) => ({
          label: company_type,
          value: company_type,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"company_type"}
      />

      {/* <SelectInputValue
        placeholder={"Company Name"}
        value={filters.company_name}
        data={companyName.map((company_name) => ({
          label: company_name,
          value: company_name,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"company_name"}
      /> */}

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
          label: country_id,
          value: country_id,
        }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"country_id"}
      />

      <SelectInputValue
        placeholder={"Partner level"}
        value={filters.level}
        data={levels.map((level) => ({ label: level, value: level }))}
        icon={<ArrowDown />}
        searchable={true}
        onChange={handleFilters}
        name={"level"}
      />

      <SalesYtdMultiselectModal
        title={<p className="text-black font-bold text-lg">Filtrar por</p>}
        datas={multiSelect}
      />
      <div className="w-4/5 justify-end">
        <BtnFilter
          text={t("Reportes.limpiar_filtros")}
          styles="bg-white !text-gray-400 sm:!text-base hover:bg-white hover:!text-blue-500 border-none hover:border-none m-1"
          onClick={clearSelects}
        />
      </div>
    </div>
  );
};

export default FilterSection;
