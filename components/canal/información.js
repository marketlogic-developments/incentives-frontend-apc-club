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

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-3 w-8/12 gap-10">
        <div>
          <label className="label">
            <span className="label-text">Nombre del Canal</span>
          </label>
          <p className="text-xl">{company.name}</p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Reseller ID</span>
          </label>
          <p className="text-xl">{company.resellerMasterId}</p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Tipo</span>
          </label>
          <p className="text-xl">
            {company.distChannelsId === 1
              ? "Gold"
              : company.distChannelsId === 2
              ? "Platinum"
              : company.distChannelsId === 3
              ? "Distribuidor"
              : "No"}
          </p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Meta por Q</span>
          </label>
          <p className="text-xl">${company.goalsPerQuarter}</p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Meta por Año</span>
          </label>
          <p className="text-xl">${company.goalsPerYear}</p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Partner Admin</span>
          </label>
          <p className="text-xl">{company.partnerAdmin?.name}</p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Número telefónico</span>
          </label>
          <p className="text-xl">{company.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Información;
