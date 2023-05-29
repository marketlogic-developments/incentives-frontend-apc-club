import React from "react";
import { useTranslation } from "react-i18next";
import TargetInvoice from "./TargetInvoice";

const ModalDistribution = ({
  salesOption,
  teams,
  setTeamInfo,
  setOpened,
  dataToTable,
  loading,
}) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col w-full col-start-2">
        <h2 className="!text-xl font-bold text-center">
          {t("tabla.aDigipoints")}
        </h2>
        <p className="text-[#2C2C2C] text-xs text-center mt-4">
          {t("digipoints.sDistribuicionDigiPoints")}
        </p>
        <p className="text-[#333333] text-xs mt-10 mb-3 pl-10 font-bold">
          {t("digipoints.aDistribuicion")}
        </p>
        <div className="pl-10">
          <input
            className="!bg-[#D9D9D9]"
            type="radio"
            value="option1"
            checked={true}
          />
          <label className="ml-3 align-middle !text-xs">
            {t("digipoints.represV")}
          </label>
        </div>
        <div className="pl-10">
          <input type="radio" value="option2" checked={false} />
          <label className="ml-3 align-middle !text-xs">
            {t("digipoints.teamV")}
          </label>
        </div>
        {salesOption === "salesTeam" && (
          <select
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => {
              const team = teams.find(
                (data) => Number(e.target.value) === data.id
              );
              return setTeamInfo(team);
            }}
          >
            <option value="">{t("digipoints.elegirTeam")}</option>
            {teams.map((data) => (
              <option value={data.id} key={data.id}>
                {data.name_group}
              </option>
            ))}
          </select>
        )}

        <div className="flex flex-col gap-5 font-bold p-10">
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
                      <p className="text-[#2C2C2C] text-xs font-normal w-3/12 text-center">
                        {t("digipoints.sOpcionListadoUsuarios")}
                      </p>
                    </div>
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="w-full gap-1 mb-4">
            <div className="relative">
              <div className="absolute flex items-center ml-4 h-full w-full">
                <img src="/assets/Icons/search.png" alt="search" />
              </div>
              <input
                type="text"
                placeholder="Buscar"
                className="px-11 py-3 w-11/12 rounded-full bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              />
            </div>
            <div>Holis</div>
            <div className="relative">
              <div className="container w-full flex justify-center">
                <div className="overflow-x-auto">
                  <table className="text-sm text-left text-black-500">
                    <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5 table-radius-cstm">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          {t("user.nombre")}
                        </th>
                        <th scope="col" className="py-5 px-6">
                          {t("tabla.correo")}
                        </th>
                      </tr>
                    </thead>
                    {loading ? (
                      <div className="lds-dual-ring"></div>
                    ) : (
                      <tbody>
                        {dataToTable.map((data, index) => (
                          <tr
                            className="bg-white border-b dark:border-gray-500"
                            key={data?.invoices_included}
                          >
                            <td className="py-4 px-6">
                              <input
                                type="radio"
                                value="option1"
                                checked={false}
                              />
                              {/*<label className="ml-3 align-middle">
                                  {t("digipoints.teamV")}
                                  </label>*/}

                              {data?.description}
                            </td>
                            <td className="py-4 px-6 min-w-[130px]">
                              a.dubon@adobe.com
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full flex justify-center gap-10 p-10">
          <button
            type="cancel"
            className="btn btn-cancel w-48"
            onClick={() => {
              setOpened(false);
            }}
          >
            {t("modalEquipos.cancelar")}
          </button>
          <button type="submit" className="btn btn-info w-48">
            {t("digipoints.cAsignacion")}
          </button>
        </div>
      </div>
      <TargetInvoice />
    </div>
  );
};

export default ModalDistribution;
