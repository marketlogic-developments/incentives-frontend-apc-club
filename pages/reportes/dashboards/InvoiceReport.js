import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  CloudDownload,
  SearchIcon,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesAll,
  getSalesAllByChannel,
  getSalesAllByDist,
} from "../../../store/reducers/sales.reducer";
import {
  BtnFilter,
  BtnWithImage,
  Table,
  SelectInputValue,
  SearchInput,
} from "../../../components";

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
  const clearSelects = () => {
    setSelectOne("");
    setSelectTwo("");
  };

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
      <div className="grid grid-rows-1 justify-items-center">
        <Table
          containerStyles={
            "mt-4 !rounded-tl-lg !rounded-tr-lg !overflow-x-auto max-h-[300px]"
          }
          tableStyles={"table-zebra !text-sm"}
          thStyles={"sticky text-white"}
          cols={[
            t("Reportes.compania"),
            t("Reportes.region"),
            t("Reportes.pais"),
            t("Reportes.membership_Id"),
            t("Reportes.tipo"),
            t("Reportes.nivel"),
            t("Reportes.status"),
            t("Reportes.registrado"),
            t("Reportes.cc_Renewal"),
            t("Reportes.cc_New_business"),
            t("Reportes.dc_Renewal"),
          ]}
        >
          {/* {example.length !== 0 &&
            example.map((data, index) => (
              <tr>
                <th>
                  <label className="text-left px-2">
                    <input
                      type="checkbox"
                      className="!checkbox-xs mt-1 border-white bg-base-200"
                    />
                  </label>
                </th>
                <td className="text-left py-2">{data.compania}</td>
                <td className="text-left py-2">{data.region}</td>
                <td className="text-left py-2">{data.pais}</td>
                <td className="text-left py-2">{data.membership_Id}</td>
                <td className="text-left py-2">{data.tipo}</td>
                <td className="text-left py-2">{data.nivel}</td>
                <td className="text-left py-2">
                  {data.status === t("Reportes.inactivo") ? (
                    <div class="badge bg-red-200 text-red-600 text-sm text-left py-2">
                      {t("Reportes.inactivo")}
                    </div>
                  ) : (
                    <div class="badge bg-green-200 text-green-600 text-sm border-green-300 text-left py-2">
                      {t("Reportes.activo")}
                    </div>
                  )}
                </td>
                <td className="text-left py-2">{data.registrado}</td>
                <td className="text-left py-2">{data.cc_renewal}</td>
                <td className="text-left py-2">{data.cc_new_business}</td>
                <td className="text-left py-2">
                  <div className="grid grid-cols-2 items-center py-2">
                    <div className="grid text-left">{data.dc_renewal}</div>
                    <div className="grid justify-items-end mr-3 cursor-pointer">
                      {tableMenu(data.id)}
                    </div>
                  </div>
                </td>
              </tr>
            ))} */}
        </Table>
      </div>
    </div>
  );
};

export default InvoiceReport;
