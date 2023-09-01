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
  const [partner, setPartner] = useState();
  const multiSelect = [
    {
      placeholder: "Partner Level",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "partner_level",
    },
    {
      placeholder: "Partner",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "partner",
    },
    {
      placeholder: "Market Segment",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "market_segment",
    },
    {
      placeholder: "Business Unit",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "business_unit",
    },
    {
      placeholder: "Business Type",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "business_type",
    },
    {
      placeholder: "Licensing Type",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "licensing_type",
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

  const addTotalColumn = (data) => {
    return data.map((item) => {
      const total = item.BRAZIL + item.MEXICO + item.NOLA + item.SOLA;
      return {
        ...item,
        TOTAL: total,
      };
    });
  };

  useEffect(() => {
    dispatch(getOrganizations(token, filters)).then((res) => {
      setIsDataLoading(false);
      /* REGISTER COMPANIES */
      setRegisterCompanies(addTotalColumn(res.payload.registeredCompanies));
      setRegisterUsers(addTotalColumn(res.payload.registeredUsers));
      /* Partners */
      setPartner(res.payload.partners)
      setIsDataLoading(true);
    });
  }, [filters]);

  return (
    <div className="m-5">
      <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        {/* <SelectSection multiSelect={multiSelect} /> */}
      </div>
      <RegisteredSection
        isDataLoading={isDataLoading}
        registerCompanies={registerCompanies}
        registerUsers={registerUsers}
      />
      <PartnerSection isDataLoading={isDataLoading} partner={partner} />
    </div>
  );
};

export default Organization;
