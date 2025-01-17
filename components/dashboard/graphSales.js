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
  getAllGoals,
} from "../../store/reducers/sales.reducer";
import TargetSales from "./GraphSales/TargetSales";
import PerformaceSales from "./GraphSales/PerformaceSales";

const GraphSales = () => {
  const { user, token } = useSelector((state) => state.currentUser);
  const sales = useSelector((state) => state.sales.salesbType);
  const goals = useSelector((state) => state.sales.goals);
  const dispatch = useDispatch();
  const [content, setContent] = useState(0);
  const [CC, setCC] = useState([]);
  const [DC, setDC] = useState([]);

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    // console.log(goals);
    // if (token && sales.length === 0) {
    //   if (user?.roles[0].name === "administrador") {
    //     dispatch(getSalesByTypeAll(token));
    //     dispatch(getAllGoals(token));
    //   } else if (user.company === null) {
    //     dispatch(
    //       getGoalsByDistri(token, user?.distributionChannel?.soldToParty)
    //     );
    //     dispatch(
    //       getSalesByTypeDist(token, user?.distributionChannel?.soldToParty)
    //     );
    //   } else {
    //     dispatch(getGoalsByChannel(token, user.company.resellerMasterId));
    //     dispatch(getSalesByTypeComp(token, user.company.resellerMasterId));
    //   }
    // }
  }, [token]);

  useEffect(() => {
    // Check if the sales state is an array before filtering and setting CC state
    if (Array.isArray(sales) && typeof setCC === "function") {
      setCC(
        sales.filter(({ business_unit }) => business_unit === "Creative Cloud")
      );
    }

    // Check if the sales state is an array before filtering and setting DC state
    if (Array.isArray(sales) && typeof setDC === "function") {
      setDC(
        sales.filter(({ business_unit }) => business_unit === "Document Cloud")
      );
    }
  }, [sales]);

  return (
    <div className="flex flex-col w-full gap-6">
      <div>
        <h2 className="text-xl font-bold">
          {user?.roles[0].name === "sales_rep"
            ? t("dashboard.misVentas")
            : t("dashboard.ventasOrg")}
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <TargetSales
          data={CC}
          goal={goals.filter(
            ({ business_unit }) => business_unit === "Creative Cloud"
          )}
          goalNew={goals.filter(
            ({ business_unit, business_type }) =>
              business_unit === "Creative Cloud" &&
              business_type === "New Business"
          )}
          goalRenew={goals.filter(
            ({ business_unit, business_type }) =>
              business_unit === "Creative Cloud" && business_type === "Renewal"
          )}
        />
        <TargetSales
          data={DC}
          goal={goals.filter(
            ({ business_unit }) => business_unit === "Document Cloud"
          )}
          goalNew={goals.filter(
            ({ business_unit, business_type }) =>
              business_unit === "Document Cloud" &&
              business_type === "New Business"
          )}
          goalRenew={goals.filter(
            ({ business_unit, business_type }) =>
              business_unit === "Document Cloud" && business_type === "Renewal"
          )}
        />
        <PerformaceSales CC={CC} DC={DC} goals={goals} />
      </div>
    </div>
  );
};

export default GraphSales;
