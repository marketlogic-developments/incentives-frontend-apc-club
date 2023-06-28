import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  CloudDownload,
  SearchIcon,
} from "../../../components/icons";
import { SearchInput } from "../../../components/inputs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesAll,
  getSalesAllByChannel,
  getSalesAllByDist,
} from "../../../store/reducers/sales.reducer";
import { BtnFilter, BtnWithImage } from "../../../components";
import SelectInputValue from "../../../components/inputs/SelectInputValue";

const InvoiceReport = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.sales.salesall);
  const [t, i18n] = useTranslation("global");
  const [selectOne, setSelectOne] = useState("");
  const [selectTwo, setSelectTwo] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (token && data.length === 0) {
      setLoading(true);
      if (user.roleId === 1) {
        dispatch(getSalesAll(token)).then((response) => {
          setLoading(false);
        });
      } else if (user.companyId === null) {
        dispatch(getSalesAllByDist(token, distribuitor.soldToParty)).then(
          (response) => {
            setLoading(false);
          }
        );
      } else {
        dispatch(getSalesAllByChannel(token, company.resellerMasterId)).then(
          (response) => {
            setLoading(false);
          }
        );
      }
    }
  }, [isLoaded, token]);


  /* Selects */
  const handleSelectOneChange = (name, value) => {
    setSelectOne(value);
  };

  const handleSelectTwoChange = (name, value) => {
    setSelectTwo(value);
  };

  const dataOne = [...new Set(data.map((user) => user.business_unit))];

  const dataSelectOne = dataOne.map((business) => ({
    value: business,
    label: business,
  }));

  const dataTwo = [...new Set(data.map((user) => user.business_unit))];

  const dataSelectTwo = dataTwo.map((business) => ({
    value: business,
    label: business,
  }));

  /* Filter */
  const clearSelects = () =>{
    setSelectOne('');
    setSelectTwo('');
  }

  return (
    <div className="mt-8">
      <div className="grid items-center sm:grid-cols-5 grid-rows-1 gap-3">
        <SearchInput
          image={<SearchIcon />}
          placeHolder={"Buscar"}
          stylesContainer={""}
          stylesInput={
            "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
          }
        />
        <SelectInputValue
          placeholder={t("tabla.unidadNegocio")}
          value={selectOne}
          data={dataSelectOne}
          icon={<ArrowDown />}
          onChange={handleSelectOneChange}
          name={"business"}
        />
        <SelectInputValue
          placeholder={t("organizacion.organizacion")}
          value={selectTwo}
          data={dataSelectTwo}
          icon={<ArrowDown />}
          onChange={handleSelectTwoChange}
          name={"email"}
        />
        <BtnFilter
          text={t("Reportes.limpiar_filtros")}
          styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
          onClick={clearSelects}
        />
        <BtnWithImage
          text={t("Reportes.descargar")}
          icon={<CloudDownload />}
          styles={
            "bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
          }
        />
      </div>
    </div>
  );
};

export default InvoiceReport;
