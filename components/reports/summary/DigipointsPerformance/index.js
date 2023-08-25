import React from "react";
import { ArrowDown } from "../../../icons";
import { useTranslation } from "react-i18next";
import SelectSection from "./SelectSection";
import DigipointSection from "./DigipointSection";
import DigipointRedemptionSection from "./DigipointRedemptionSection";

const DigipoinstPerformance = () => {
  /* Variables and const */
  const [t, i18n] = useTranslation("global");
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
  const xValuesLine = [50, 100, 200, 300, 400, 500];
  const redempion = [0, 100, 200, 300, 400];
  return (
    <div className="m-5">
      <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SelectSection multiSelect={multiSelect} />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointSection />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointRedemptionSection
          redempion={redempion}
          xValuesLine={xValuesLine}
        />
      </div>
    </div>
  );
};

export default DigipoinstPerformance;
