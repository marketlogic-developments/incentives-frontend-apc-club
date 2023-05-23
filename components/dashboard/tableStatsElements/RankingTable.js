import React from "react";
import UserRanking from "./userRanking";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const RankingTable = () => {
  const [t, i18n] = useTranslation("global");
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [participantes, setParticipantes] = useState([]);

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
    const compOrDist =
      user.company === null
        ? {
            endpoint: "digipoints-redeem-status-all-distri",
            byId: user.distribuitorChannelId,
            endpointUsers: "distri-all-users-by-id",
          }
        : {
            endpoint: "digipoints-redeem-status-all-compa",
            byId: user.companyId,
            endpointUsers: "company-all-users-by-id",
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
        .then(({ data }) => {
          if (data.length === 0) {
            return axios
              .get(
                `${process.env.BACKURL}/reporters/${compOrDist.endpointUsers}/${compOrDist.byId}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(({ data }) => setParticipantes(data));
          }

          return setParticipantes(data);
        });
    }
  }, [token]);

  console.log(participantes);

  return (
    <div className="flex flex-col w-full p-6 gap-6 targetDashboard">
      <div>
        <h2 className="!text-xl font-bold">Ranking</h2>
      </div>
      <div>
        {participantes.map((data, index) => (
          <UserRanking data={data} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default RankingTable;
