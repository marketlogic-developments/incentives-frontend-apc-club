import React, { useState, useEffect } from "react";
import { ArrowDown } from "../../../icons";
import { useTranslation } from "react-i18next";

import { RegisteredSection } from "./RegisteredSection";
import PartnerSection from "./PartnerSection";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../../../../store/reducers/sales.reducer";
import SelectSection from "./SelectSection";

const Organization = () => {
  /* Variable and const */
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [filters, setFilters] = useState({
    region: "",
    country: "",
    company_name: "",
    level: "",
  });
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [region, setRegion] = useState([]);
  const [country, setCountry] = useState([]);
  const [company, setCompany] = useState([]);
  const [level, setlevel] = useState([]);
  const [registerUsers, setRegisterUsers] = useState();
  const [registerCompanies, setRegisterCompanies] = useState();
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

  const handleFilters = (name, value) => {
    return setFilters({ ...filters, [name]: value === null ? "" : value });
  };

  const clearSelects = () => {
    setFilters({
      company_name: "",
      region: "",
      country: "",
      level: "",
    });
  };

  const getUniqueFieldValues = (data, fieldName) => {
    const uniqueValues = new Set();

    data.forEach((item) => {
      const fieldValue = item[fieldName];
      if (fieldValue !== null && fieldValue !== "") {
        uniqueValues.add(fieldValue);
      }
    });

    return Array.from(uniqueValues);
  };

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
    setIsDataLoading(false);
    dispatch(getOrganizations(token, filters)).then((res) => {
      /* REGISTER COMPANIES */
      setRegisterCompanies(addTotalColumn(res.payload.registeredCompanies));
      setRegisterUsers(addTotalColumn(res.payload.registeredUsers));
      /* Partners */
      setPartner(res.payload.partners);
      setRegion(getUniqueFieldValues(res.payload.partners, "region"));
      setCompany(getUniqueFieldValues(res.payload.partners, "organization"));
      setCountry(getUniqueFieldValues(res.payload.partners, "country"));
      setlevel(getUniqueFieldValues(res.payload.partners, "medal"));
      setIsDataLoading(true);
    });
  }, [filters]);
  return (
    <div className="m-5">
      <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SelectSection
          filters={filters}
          region={region}
          country={country}
          company={company}
          level={level}
          multiSelect={multiSelect}
          handleFilters={handleFilters}
          clearSelects={clearSelects}
        />
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
