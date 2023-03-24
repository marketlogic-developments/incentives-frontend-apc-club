import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Información = () => {
  const [t, i18n] = useTranslation("global");

  const dataDummy = {
    name: "MICRO COMPUTER CARIBBEAN LTD TT",
    representativeId: 1,
    phoneNumber: "45321465522",
    operationStatusId: 4,
    distChannelsId: 1,
    CreatedAt: "2023-03-17T19:17:04.683Z",
    maxDayAssign: 15,
    resellerMasterId: "AM05537179",
    goalsPerQuarter: "25000",
    goalsPerYear: "300000",
    distChannels: {
      id: 1,
      name: "GOLD",
      CreatedAt: "2023-03-14T06:00:00.000Z",
    },
  };

  useEffect(() => {});
  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <label className="label">
            <span className="label-text">Pick the best fantasy franchise</span>
          </label>
          <p className="text-xl">{dataDummy.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Información;
