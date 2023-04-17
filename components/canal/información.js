import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Información = () => {
  const [t, i18n] = useTranslation("global");
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const company = useSelector((state) => state.user.company);
  const distribuitor = useSelector((state) => state.user.distribuitor);

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-3 w-8/12 gap-10">
        <div>
          <label className="label">
            <span className="label-text">
              {user.company === null
                ? t("tabla.nombreDist")
                : t("tabla.nombreCanal")}
            </span>
          </label>
          <p className="text-xl">
            {user.company === null ? distribuitor.nameDist : company.name}
          </p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">
              {user.company === null ? "Sold To Party" : "Reseller ID"}
            </span>
          </label>
          <p className="text-xl">
            {user.company === null
              ? distribuitor.soldToParty
              : company.resellerMasterId}
          </p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">{t("tabla.tipoDist")}</span>
          </label>
          <p className="text-xl">
            {company.distChannelsId === 1
              ? "Gold"
              : company.distChannelsId === 2
              ? "Platinum"
              : distribuitor.distChannelsId === 3
              ? "Distribuidor"
              : "No"}
          </p>
        </div>
        {/* <div>
          <label className="label">
            <span className="label-text">Meta por Q</span>
          </label>
          <p className="text-xl">
            $
            {user.company === null
              ? distribuitor.goalsPerQuarterDist
              : company.goalsPerQuarter}
          </p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Meta por Año</span>
          </label>
          <p className="text-xl">
            $
            {user.company === null
              ? distribuitor.goalsPerYearDist
              : company.goalsPerYear}
          </p>
        </div> */}
        <div>
          <label className="label">
            <span className="label-text">Partner Admin</span>
          </label>
          <p className="text-xl">
            {user.company === null
              ? distribuitor.partnerAdmin?.name
              : company.partnerAdmin?.name}
          </p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">{t("login.telefono")}</span>
          </label>
          <p className="text-xl">
            {user.company === null
              ? distribuitor.phoneNumberDist
              : company.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Información;
