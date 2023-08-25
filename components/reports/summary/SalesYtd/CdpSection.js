import React, { useEffect, useState } from "react";
import TargetSales from "../../../dashboard/GraphSales/TargetSales";
import PerformaceSales from "../../../dashboard/GraphSales/PerformaceSales";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getAllGoals,
  getGoalsByChannel,
  getGoalsByDistri,
  getSalesByTypeAll,
  getSalesByTypeComp,
  getSalesByTypeDist,
} from "../../../../store/reducers/sales.reducer";

const CdpSection = ({ dataLoaded }) => {
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
        dispatch(getAllGoals(token));
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
    <div className="flex flex-col mb-4 mt-4 w-full gap-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        <TargetSales
          data={CC}
          goal={goals.filter(
            ({ business_unit }) => business_unit === "Creative Cloud"
          )}
        />
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        <TargetSales
          data={DC}
          goal={goals.filter(
            ({ business_unit }) => business_unit === "Document Cloud"
          )}
        />
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        <PerformaceSales CC={CC} DC={DC} goals={goals} />
      </div>
    </div>
  );
};

export default CdpSection;
