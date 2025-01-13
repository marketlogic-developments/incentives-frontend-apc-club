import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import UserItemListTeams from "./UserItemListTeams";
import { useTranslation } from "react-i18next";
import { RootState } from "store/store";
import { CurrentUser } from "services/User/user.service.js";

interface Props {
  checkboxes: CurrentUser[];
  setCheckboxes: Dispatch<SetStateAction<CurrentUser[]>>;
  modifiedValues: any;
  setModifiedValues: Dispatch<SetStateAction<any[]>>;
}

const ModalTargetParticipants: FC<Props> = ({
  checkboxes,
  setCheckboxes,
  setModifiedValues,
  modifiedValues,
}) => {
  const [t, i18n] = useTranslation("global");
  const usersCompany = useSelector((state: RootState) => state.user.allUsers);
  const [searchByEmail, setSearchByEmail] = useState("");

  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="!text-base font-bold">
          Participantes {checkboxes.length !== 0 && `(${checkboxes.length})`}
        </p>
        <div className="relative flex w-1/2">
          <input
            className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full bg-[]"
            placeholder={String(t("tabla.buscar"))}
            type="text"
            value={searchByEmail}
            onChange={(e) => setSearchByEmail(e.target.value)}
          />
          <div className="absolute h-full items-center flex ml-2">
            <AiOutlineSearch color="#eb1000" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p
          className="font-bold text-[#1473E6] cursor-pointer w-fit"
          onClick={() =>
            checkboxes.length === 0
              ? setCheckboxes(usersCompany?.content || [])
              : setCheckboxes([])
          }
        >
          {t("modalEquipos.select")} todos
        </p>
        <div className="flex flex-col gap-4 items-start groupUserTeams">
          {usersCompany?.content
            .filter((item) => {
              if (searchByEmail !== "") {
                return item.email.startsWith(searchByEmail.toLocaleLowerCase());
              }

              return item;
            })
            .map((data) => (
              <UserItemListTeams
                data={data}
                setCheckboxes={setCheckboxes}
                checkboxes={checkboxes}
                setModifiedValues={setModifiedValues}
                modifiedValues={modifiedValues}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModalTargetParticipants;
