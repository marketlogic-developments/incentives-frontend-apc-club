import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TargetInvoice from "./TargetInvoice";
import PerUsers from "./PerUsers";
import PerTeams from "./PerTeams";

const ModalDistribution = ({ setOpened, invoiceData, handleSubmit }) => {
  const [t, i18n] = useTranslation("global");
  const [salesOption, setSalesOption] = useState("");

  console.log(invoiceData);

  const typeContent = useMemo(() => {
    if (salesOption === "") {
      return (
        <div className="flex flex-col gap-5 font-bold">
          <div className="container">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-black-500">
                <tbody>
                  <div className="border border-color">
                    <div className="w-full flex justify-center mt-16">
                      <img
                        src="/assets/Icons/no_agregados.png"
                        alt="noAgregados"
                      />
                    </div>
                    <div className="w-full flex justify-center mt-6 text-[#333333] text-sm">
                      <span>{t("digipoints.asignacionDigipoints")}</span>
                    </div>
                    <div className="w-full flex justify-center mt-2 mb-16">
                      <p className="text-[#2C2C2C] text-xs font-normal w-full text-center">
                        {t("digipoints.sOpcionListadoUsuarios")}
                      </p>
                    </div>
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (salesOption === "team") {
      return (
        <PerTeams
          invoiceData={invoiceData}
          handleSubmit={handleSubmit}
          setOpened={setOpened}
        />
      );
    }

    if (salesOption === "salesRep") {
      return (
        <PerUsers
          invoiceData={invoiceData}
          handleSubmit={handleSubmit}
          setOpened={setOpened}
        />
      );
    }
  }, [salesOption]);

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col w-full col-start-2 gap-10 min-h-[90vh]">
        <div className="flex flex-col gap-4">
          <h2 className="!text-2xl font-bold text-center">
            {t("tabla.aDigipoints")}
          </h2>
          <p className="text-[#2C2C2C] !text-sm text-center">
            {t("digipoints.sDistribuicionDigiPoints")}
          </p>
        </div>
        <form
          onChange={(e) => setSalesOption(e.target.value)}
          className="flex flex-col gap-4"
        >
          <p className="text-[#333333] !text-xs font-bold">
            {t("digipoints.aDistribuicion")}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <input
                className="radio radio-xs checked:bg-blue-500"
                type="radio"
                value="salesRep"
                name="distribution"
              />
              <label className="ml-3 align-middle !text-xs">
                {t("digipoints.represV")}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="team"
                name="distribution"
                className="radio checked:bg-blue-500 radio-xs"
              />
              <label className="ml-3 align-middle !text-xs">
                {t("digipoints.teamV")}
              </label>
            </div>
          </div>
        </form>
        {typeContent}
      </div>
      <TargetInvoice invoiceData={invoiceData} />
    </div>
  );
};

export default ModalDistribution;
