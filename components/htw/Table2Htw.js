import React, { useState } from "react";
import HTW24 from "../../public/assets/htw/htw-24";
import { useTranslation } from "react-i18next";
import { Select } from "@mantine/core";

const Table2Htw = ({ user, dataHTW }) => {
  const [t, i18n] = useTranslation("global");
  const typeSegment = [t("htw.renovaciones"), t("htw.nuevosn")];

  const htwRes =
    dataHTW === "Q3-Q4"
      ? {
          AcrobatPro: ["30", "20"],
          AcrobatSign: ["30", "20"],
          ForTeam: ["40", "30"],
          SDL: ["30", "25"],
          SLP: ["30", "25"],
        }
      : {
          AcrobatPro: ["24", "12"],
          AcrobatSign: ["24", "12"],
          ForTeam: ["24", "12"],
          SDL: ["24", "12"],
          SLP: ["-", "12", "24", "-"],
        };

  const htwDist =
    dataHTW === "Q3-Q4"
      ? {
          AcrobatPro: ["15", "10"],
          AcrobatSign: ["15", "10"],
          ForTeam: ["15", "10"],
          SDL: ["15", "10"],
          SLP: ["15", "10"],
        }
      : {
          AcrobatPro: ["10", "10"],
          AcrobatSign: ["10", "10"],
          ForTeam: ["10", "10"],
          SDL: ["10", "10"],
          SLP: ["-", "10", "10", "-"],
        };

  const htwData = user.companyId !== null ? htwRes : htwDist;

  return (
    <div className="flex flex-col gap-6 shadow-xl rounded-lg lg:p-6 p-3">
      <div className="w-full grid grid-cols-4 lg:gap-0 gap-6">
        <div className="flex col-span-3 lg:col-span-2 lg:gap-2 xl:gap-6">
          <div className="lg:px-2 xl:px-6">
            <HTW24 />
          </div>
          <div className="flex flex-col justify-end gap-3 px-3">
            <p className="lg:!text-xl text-primary font-bold">
              {t("htw.tabletitle2")}
            </p>
            <hr />
            <p className="lg:!text-[10px] xl:!text-sm text-[#1473E6] font-semibold">
              {t("htw.tabledescription1")}
            </p>
            <p className="lg:!text-[10px] xl:!text-sm font-semibold">
              {t("htw.business2")}
            </p>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2 grid grid-cols-2 lg:gap-x-6 gap-x-4 gap-y-2 place-items-center">
          {typeSegment.map((text, idx) => (
            <div
              className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
                (idx + 1) % 2 === 0
                  ? "border-info"
                  : (idx + 1) % 2 === 0
                  ? "border-[#2C2C2C]"
                  : "border-primary"
              }`}
            >
              <p className="!text-xs lg:!text-sm font-bold text-center py-3">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:grid flex flex-col-reverse grid-cols-4">
        <div className="flex flex-col lg:flex-row w-full col-span-1 justify-center">
          <div className="w-full flex lg:flex-col flex-row gap-6 justify-center">
            <div className="flex items-center">
              <div className="flex flex-col items-center gap-3 w-1/2 lg:w-1/3 lg:h-1/2 justify-center">
                <figure className="w-[40px]">
                  <img src="/assets/dashboard/DC.webp"></img>
                </figure>
                <p className="font-bold xl:!text-base lg:!text-xs text-center">
                  Document <br /> Cloud
                </p>
              </div>
              <div className="lg:w-2/3 flex flex-col gap-3">
                <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#D5D5D5]">
                  Acrobat Pro
                </p>
                <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
                  Acrobat Sign
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center gap-3 w-1/2 lg:w-1/3 lg:h-1/2 justify-center">
                <figure className="w-[40px]">
                  <img src="/assets/dashboard/cc.webp"></img>
                </figure>
                <p className="font-bold xl:!text-base lg:!text-xs text-center">
                  Creative <br /> Cloud
                </p>
              </div>
              <div className="lg:w-2/3 flex flex-col gap-3">
                <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#D5D5D5]">
                  For Teams
                </p>
                <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
                  SDL/Named/Device
                </p>
                <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
                  SLP
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-6 ">
          <div className="flex flex-col gap-2">
            <div className="col-span-full grid grid-cols-6">
              <div className="col-span-2 flex flex-col justify-center gap-3">
                <p className="text-center py-5">+ 5 {t("htw.licences")}</p>
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-2">
                {htwData.AcrobatPro.map((text, idx) => (
                  <div
                    className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-full border-l-4 ${
                      idx % 2 === 0
                        ? "border-primary"
                        : idx % 2 === 1
                        ? "border-info"
                        : "border-[#2C2C2C]"
                    }`}
                  >
                    <p className="!text-xs lg:!text-sm font-bold text-center py-1">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="col-span-full grid grid-cols-6">
              <div className="col-span-2 flex flex-col justify-center gap-3">
                <p className="text-center py-5">
                  + 3000 {t("htw.transactions")}
                </p>
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-2">
                {htwData.AcrobatSign.map((text, idx) => (
                  <div
                    className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-full border-l-4 ${
                      idx % 2 === 0
                        ? "border-primary"
                        : idx % 2 === 1
                        ? "border-info"
                        : "border-[#2C2C2C]"
                    }`}
                  >
                    <p className="!text-xs lg:!text-sm font-bold text-center py-1">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="col-span-full grid grid-cols-6">
              <div className="col-span-2 flex flex-col justify-center gap-3">
                <p className="text-center py-5">+ 10 {t("htw.licences")}</p>
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-2">
                {htwData.ForTeam.map((text, idx) => (
                  <div
                    className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-full border-l-4 ${
                      idx % 2 === 0
                        ? "border-primary"
                        : idx % 2 === 1
                        ? "border-info"
                        : "border-[#2C2C2C]"
                    }`}
                  >
                    <p className="!text-xs lg:!text-sm font-bold text-center py-1">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="col-span-full grid grid-cols-6">
              <div className="col-span-2 flex flex-col justify-center gap-3">
                <p className="text-center py-5">+ 50 {t("htw.licences")}</p>
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-2">
                {htwData.SDL.map((text, idx) => (
                  <div
                    className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-full border-l-4 ${
                      idx % 2 === 0
                        ? "border-primary"
                        : idx % 2 === 1
                        ? "border-info"
                        : "border-[#2C2C2C]"
                    }`}
                  >
                    <p className="!text-xs lg:!text-sm font-bold text-center py-1">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="col-span-full grid grid-cols-6">
              <div className="col-span-2 flex flex-col justify-center gap-3">
                {dataHTW === "Q1-Q2" && (
                  <p className="text-center">+ 25 {t("htw.licences")}</p>
                )}
                <p className={`text-center ${dataHTW === "Q3-Q4" && "py-5"}`}>
                  + 100 {t("htw.licences")}
                </p>
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-2">
                {htwData.SLP.map((text, idx) => (
                  <div
                    className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 ${
                      dataHTW === "Q1-Q2" ? "h-fit" : "h-full"
                    }  border-l-4 ${
                      idx % 2 === 0
                        ? "border-primary"
                        : idx % 2 === 1
                        ? "border-info"
                        : "border-[#2C2C2C]"
                    }`}
                  >
                    <p className="!text-xs lg:!text-sm font-bold text-center py-1">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex flex-col items-center my-6">
        <p className="font-bold">
          <span className="font-bold text-[#eb1000]">{t("htw.pr1")}</span> TEAMS
          * ENTERPRISE * EDUCATION
        </p>
      </div>
    </div>
  );
};

export default Table2Htw;
