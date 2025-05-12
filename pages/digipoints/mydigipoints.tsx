import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import TargetMyDigiPoints from "../../components/digipoints/MyDigiPoints/TargetMyDigiPoints";
import { RootState } from "store/store";
import { IconCurrentDigiPoints, IconHistoricDigipoints, IconRedeemedDigiPoints } from "public/assets/Icons/Digipoints/DigipointsIcons";

const mydigipoints = () => {
  const digipoints = useSelector((state:RootState) => state.currentUser.digipoints);
  const [t, i18n] = useTranslation("global");
  const mydigipointsobject = [
    {
      icon: (
        <IconHistoricDigipoints/>
      ),
      num: digipoints?.history_points ?? 0,
      type: t("digipoints.historicos"),
    },
    {
      icon: (
        <IconRedeemedDigiPoints/>
      ),
      num: digipoints?.redeemed_points ?? 0,
      type: t("digipoints.Dredimidos"),
    },
    {
      icon: (
        <IconCurrentDigiPoints />
      ),
      num: digipoints?.current_points ?? 0,
      type: t("digipoints.actuales"),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 xl:grid-cols-3 max-sm:grid-cols-1 gap-4 mt-20 digiCards">
        {mydigipointsobject.map(({ icon, type, num }, index) => (
          <TargetMyDigiPoints icon={icon} type={type} num={num} index={index} />
        ))}
      </div>
    </div>
  );
};

export default mydigipoints;
