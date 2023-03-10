import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const GraphSales = () => {
  const user = useSelector((state) => state.user.user);
  const [content, setContent] = useState(0);
  const [renewalCC, setRenewalCC] = useState("");
  const [nbusinessCC, setNbusinessCC] = useState("");
  const [renewalDC, setRenewalDC] = useState("");
  const [nbusinessDC, setNbusinessDC] = useState("");

  const [t, i18n] = useTranslation("global");

  const typeOfData = useMemo(() => {
    if (content === 0) {
      return (
        <div className="grid grid-cols-3 place-items-center">
          <div className="justify-evenly flex w-1/2">
            <div className="flex flex-col items-center w-full gap-5">
              <p className="text-secondary text-xs">
                {t("dashboard.renovaciones")}
              </p>
              <div
                className={`radial-progress text-secondary flex items-center ${renewalCC}`}
                style={{
                  "--value": 0,
                  "--size": "7rem",
                  "--thickness": "5px",
                }}
              >
                <div className="flip-card-Graph">
                  <div className="flip-card-inner-Graph">
                    <div className="flip-card-front-Graph">
                      <div className="flip-card-front-Graph text-xs ">
                        <p className="text-black">0%</p>
                        <p className="text-black">$0</p>
                      </div>
                    </div>
                    <div className="flip-card-back-Graph text-xs text-black">
                      <p className="text-primary">
                        {t("dashboard.dpObtenidos")}:
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-sm btn-secondary w-max"
                onClick={() => {
                  renewalCC === ""
                    ? setRenewalCC("activeButton")
                    : setRenewalCC("");
                }}
              >
                Ver Digipoints
              </button>
            </div>
          </div>
          <div className="flex w-1/2 justify-center items-center  ">
            <div className="flex flex-col items-center justify-evenly w-full">
              <p className="font-bold text-xl text-secondary text-center">
                {user.roleId === 5 ? t("dashboard.mvCC") : t("dashboard.vCC")}
                <br />
                Creative Cloud
              </p>
              <p>${0}</p>
            </div>
          </div>
          <div className="justify-evenly flex w-full">
            <div className="flex flex-col items-center w-1/2 gap-5">
              <p className="text-secondary text-xs">
                {t("dashboard.nbusiness")}
              </p>
              <div
                className={`radial-progress text-secondary flex items-center ${nbusinessCC}`}
                style={{
                  "--value": 0,
                  "--size": "7rem",
                  "--thickness": "5px",
                }}
              >
                <div className="flip-card-Graph">
                  <div className="flip-card-inner-Graph">
                    <div className="flip-card-front-Graph text-xs text-black">
                      <p className="text-black">0%</p>
                      <p className="text-black">$0</p>
                    </div>
                    <div className="flip-card-back-Graph text-xs text-black">
                      <p className="text-primary">
                        {t("dashboard.dpObtenidos")}:
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-sm btn-secondary w-max"
                onClick={() => {
                  nbusinessCC === ""
                    ? setNbusinessCC("activeButton")
                    : setNbusinessCC("");
                }}
              >
                Ver Digipoints
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (content === 1) {
      return (
        <div className="grid grid-cols-3 place-items-center">
          <div className="justify-evenly flex w-1/2">
            <div className="flex flex-col items-center w-full gap-5">
              <p className="text-xs text-primary">
                {t("dashboard.renovaciones")}
              </p>
              <div
                className={`radial-progress text-primary flex items-center ${renewalDC}`}
                style={{
                  "--value": 0,
                  "--size": "7rem",
                  "--thickness": "5px",
                }}
              >
                <div className="flip-card-Graph">
                  <div className="flip-card-inner-Graph">
                    <div className="flip-card-front-Graph">
                      <div className="flip-card-front-Graph text-xs ">
                        <p className="text-black">0%</p>
                        <p className="text-black">$0</p>
                      </div>
                    </div>
                    <div className="flip-card-back-Graph text-xs text-black">
                      <p className="text-primary">
                        {t("dashboard.dpObtenidos")}:
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-sm btn-primary w-max"
                onClick={() => {
                  renewalDC === ""
                    ? setRenewalDC("activeButton")
                    : setRenewalDC("");
                }}
              >
                Ver Digipoints
              </button>
            </div>
          </div>
          <div className="flex w-[60%] justify-center items-center  ">
            <div className="flex flex-col items-center justify-evenly w-full">
              <p className="font-bold text-xl text-primary text-center">
                {user.roleId === 5 ? t("dashboard.mvDC") : t("dashboard.vDC")}
                <br />
                Document Cloud
              </p>
              <p>${0}</p>
            </div>
          </div>
          <div className="justify-evenly flex w-full">
            <div className="flex flex-col items-center w-1/2 gap-5">
              <p className="text-xs text-primary">{t("dashboard.nbusiness")}</p>
              <div
                className={`radial-progress text-primary flex items-center ${nbusinessDC}`}
                style={{
                  "--value": 0,
                  "--size": "7rem",
                  "--thickness": "5px",
                }}
              >
                <div className="flip-card-Graph">
                  <div className="flip-card-inner-Graph">
                    <div className="flip-card-front-Graph text-xs text-black">
                      <p className="text-black">0%</p>
                      <p className="text-black">$0</p>
                    </div>
                    <div className="flip-card-back-Graph text-xs text-black">
                      <p className="text-primary">
                        {t("dashboard.dpObtenidos")}:
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-sm btn-primary w-max"
                onClick={() => {
                  nbusinessDC === ""
                    ? setNbusinessDC("activeButton")
                    : setNbusinessDC("");
                }}
              >
                Ver Digipoints
              </button>
            </div>
          </div>
        </div>
      );
    }
  }, [content, renewalCC, nbusinessCC, renewalDC, nbusinessDC]);
  return (
    <div className="flex flex-col w-[90%] gap-2">
      <div className="flex justify-around">
        <p
          className={`font-bold  ${
            content === 0 ? "titleGraphCarouselSelected" : "titleGraphCarousel"
          } cursor-pointer`}
          onClick={() => setContent(0)}
        >
          Creative Cloud
        </p>
        <p
          className={`font-bold  ${
            content === 1 ? "titleGraphCarouselSelected" : "titleGraphCarousel"
          } cursor-pointer`}
          onClick={() => setContent(1)}
        >
          Document Cloud
        </p>
      </div>
      {content === 0 ? <hr id="hrCC" /> : <hr id="hrDC" />}

      {typeOfData}
    </div>
  );
};

export default GraphSales;
