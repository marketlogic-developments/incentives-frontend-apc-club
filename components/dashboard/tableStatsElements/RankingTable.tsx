import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NoDataRanking from "./NoDataRanking";
import { RootState } from "store/store";

const RankingTable = () => {
  const [t, i18n] = useTranslation("global");
  const ranking = useSelector(
    (state: RootState) => state.dashboardReport.userRaking.global
  );
  const dispatch = useDispatch();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const Months = [
    t("meses.enero"),
    t("meses.febrero"),
    t("meses.marzo"),
    t("meses.abril"),
    t("meses.mayo"),
    t("meses.junio"),
    t("meses.julio"),
    t("meses.agosto"),
    t("meses.septiembre"),
    t("meses.octubre"),
    t("meses.noviembre"),
    t("meses.diciembre"),
  ];

  useEffect(() => {
    //Peticion Ranking
  }, []);

  return (
    <div className="flex flex-col w-full p-6 gap-6 targetDashboard">
      <div>
        <h2 className="!text-xl font-bold">TOP Sales Rep LATAM</h2>
        <p className="!text-xs">{`${Months[month]} ${year}`}</p>
      </div>
      <div className="flex flex-col gap-6 h-full">
        {/* {ranking.length === 0 ? (
          <NoDataRanking />
        ) : (
          [...ranking]
            .slice(0, 3)
            .map((data, index) => <UserRanking data={data} index={index + 1} />)
        )} */}
        <NoDataRanking />
      </div>
    </div>
  );
};

export default RankingTable;
