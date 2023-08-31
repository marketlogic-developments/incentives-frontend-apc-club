import React, { useState, useEffect } from "react";
import { ArrowDown } from "../../../icons";
import { useTranslation } from "react-i18next";
import SelectSection from "../DigipointsPerformance/SelectSection";
import { RegisteredSection } from "./RegisteredSection";
import PartnerSection from "./PartnerSection";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../../../../store/reducers/sales.reducer";

const Organization = () => {
  /* Variable and const */
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [filters, setFilters] = useState({
    quarter: "",
    month: "",
    region: "",
    country: "",
    partner_level: "",
    partner: "",
    market_segment: "",
    business_unit: "",
    business_type: "",
    licensing_type: "",
  });
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [registerCompanies, setRegisterCompanies] = useState();
  const [registerUsers, setRegisterUsers] = useState();
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
      region: "Distributor",
      brazil: 1,
      mexico: 2,
      nola: 2,
      sola: 8,
      total: 13,
    },
    {
      region: "Reseller",
      brazil: 21,
      mexico: 12,
      nola: 23,
      sola: 54,
      total: 110,
    },
  ];

  useEffect(() => {
    dispatch(getOrganizations(token, filters)).then((res) => {
      /* REGISTER COMPANIES */
      setRegisterCompanies(res.payload.registeredCompanies);
      setRegisterUsers(res.payload.registeredUsers);
    });
  }, [filters]);

  return (
    <div className="m-5">
      <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SelectSection multiSelect={multiSelect} />
      </div>
      <RegisteredSection
        isDataLoading={isDataLoading}
        registerCompanies={registerCompanies}
        registerUsers={registerUsers}
      />
      <PartnerSection isDataLoading={isDataLoading} dataTable={dataTable} />
    </div>
  );
};

export default Organization;
