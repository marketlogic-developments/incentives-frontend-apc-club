import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesByType,
  getSalesByTypeComp,
  getSalesByTypeDist,
  getSalesByTypeAll,
  getGoalsByDistri,
  getGoalsByChannel,
} from "../../store/reducers/sales.reducer";
import TargetSales from "./GraphSales/TargetSales";
import PerformaceSales from "./GraphSales/PerformaceSales";

const GraphSales = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const sales = useSelector((state) => state.sales.salesbType);
  const goals = useSelector((state) => state.sales.goals);
  const dispatch = useDispatch();
  const [content, setContent] = useState(0);
  const [CC, setCC] = useState([]);
  const [DC, setDC] = useState([]);

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    if (token && sales.length === 0) {
      if (user.roleId === 1) {
        dispatch(getSalesByTypeAll(token));
      } else if (user.company === null) {
        dispatch(getGoalsByDistri(token, user.distributionChannel.soldToParty));
        dispatch(
          getSalesByTypeDist(token, user.distributionChannel.soldToParty)
        );
      } else {
        dispatch(getGoalsByChannel(token, user.company.resellerMasterId));
        dispatch(getSalesByTypeComp(token, user.company.resellerMasterId));
      }
    }
  }, [token]);

  useEffect(() => {
    setCC(
      sales.filter(({ business_unit }) => business_unit === "Creative Cloud")
    );
    setDC(
      sales.filter(({ business_unit }) => business_unit === "Document Cloud")
    );
  }, [sales]);

  return (
    <div className="flex flex-col w-full gap-6">
      <div>
        <h2 className="text-xl font-bold">
          {user.roleId === 5
            ? t("dashboard.misVentas")
            : t("dashboard.ventasOrg")}
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <TargetSales
          data={CC}
          goal={goals.filter(
            ({ business_unit }) => business_unit === "Creative Cloud"
          )}
        />
        <TargetSales
          data={DC}
          goal={goals.filter(
            ({ business_unit }) => business_unit === "Document Cloud"
          )}
        />
        <PerformaceSales CC={CC} DC={DC} goals={goals} />
      </div>
    </div>
  );
};

export default GraphSales;
