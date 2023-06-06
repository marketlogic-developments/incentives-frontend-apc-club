import React from "react";
import UserRanking from "./userRanking";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { setRanking } from "../../../store/reducers/users.reducer";
import NoDataRanking from "./NoDataRanking";

const RankingTable = () => {
  const [t, i18n] = useTranslation("global");
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const ranking = useSelector((state) => state.user.ranking);
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
    if (user.roleId === 1) {
      axios
        .get(`${process.env.BACKURL}/reporters/ranking-global`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          console.log(data);
          dispatch(setRanking(data));
        });
    } else {
      const compOrDist =
        user.company === null
          ? {
              endpoint: "digipoints-redeem-status-all-distri",
              byId: user.distribuitorChannelId,
            }
          : {
              endpoint: "digipoints-redeem-status-all-compa",
              byId: user.companyId,
            };

      if (token) {
        axios
          .get(
            `${process.env.BACKURL}/reporters/${compOrDist.endpoint}/${compOrDist.byId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(({ data }) => dispatch(setRanking(data)));
      }
    }
  }, [token]);

  return (
    <div className="flex flex-col w-full p-6 gap-6 targetDashboard">
      <div>
        <h2 className="!text-xl font-bold">Ranking</h2>
        <p className="!text-xs">{`${Months[month]} ${year}`}</p>
      </div>
      <div className="flex flex-col gap-6 h-full">
        {ranking.length === 0 ? (
          <NoDataRanking />
        ) : (
          ranking
            .slice(0, 3)
            .map((data, index) => <UserRanking data={data} index={index + 1} />)
        )}
      </div>
    </div>
  );
};

export default RankingTable;
