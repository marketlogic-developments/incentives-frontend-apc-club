import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { userBlockCatalogo } from "../../block/UsersBlockCatalogo";
import { DigipointsUser } from "services/User/user.service";
import { RootState } from "store/store";
import { IconCurrentDigiPoints } from "public/assets/Icons/Digipoints/DigipointsIcons";

const DigiPointsCard = () => {
  const [t, i18n] = useTranslation("global");
  const router = useRouter();
  const { digipoints } = useSelector((state: RootState) => state.currentUser);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="flex px-3 py-3.5 bg-base-100 border-[1px] border-[#E0E0E0] rounded-[10px] w-full">
      <div className="flex flex-col w-full gap-6">
        <div className="flex gap-3 items-center">
          <IconCurrentDigiPoints w={43} h={43} />
          <div>
            <p className="!text-xl font-bold">{isMounted ? (digipoints?.current_points ?? 0) : 0}</p>
            <p className="text-[9.5px] 2xl:text-xs whitespace-nowrap">
              {t("dashboard.dpObtenidos")}
            </p>
          </div>
        </div>
        <button
          className="btn btn-info !btn-outline w-full whitespace-nowrap min-h-[2.563rem] h-[2.563rem]"
          onClick={() => {
            if (isMounted) {
              router.push("/catalogo");
            }
          }}
        >
          {t("menu.vercatalogo")}
        </button>
      </div>
    </div>
  );
};

export default DigiPointsCard;
