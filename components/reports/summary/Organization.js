import React from "react";
import SelectInputValue from "../../inputs/SelectInputValue";
import { ArrowDown } from "../../icons";
import SalesYtdMultiselectModal from "../../ModalStateProducts/SalesYtdMultiselectModal";
import BtnFilter from "../../cardReportes/BtnFilter";
import { useTranslation } from "react-i18next";
import SortedTable from "../../table/SortedTable";
import { useState } from "react";

const Organization = () => {
  /* Variable and const */
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);
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

export default Organization;
