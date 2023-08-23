import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyUsers } from "../../../store/reducers/users.reducer";
import UserItemListTeams from "./UserItemListTeams";
import { useTranslation } from "react-i18next";

const ModalTargetParticipants = ({
  checkboxes,
  setCheckboxes,
  setModifiedValues,
  modifiedValues,
}) => {
  const token = useSelector((state) => state.user.token);
  const [t, i18n] = useTranslation("global");
  const usersCompany = useSelector((state) => state.user.companyUsers);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [searchByEmail, setSearchByEmail] = useState("");

  useEffect(() => {
    const compOrDist =
      user.company === null
        ? {
            endpoint: "distri-all-users-by-id",
            byId: user.distributionChannelId,
          }
        : { endpoint: "company-all-users-by-id", byId: user.companyId };

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/${compOrDist.endpoint}/${compOrDist.byId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(setCompanyUsers(data));
      });
  }, [token]);

  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="!text-base font-bold">
          Participantes {checkboxes.length !== 0 && `(${checkboxes.length})`}
        </p>
        <div className="relative flex w-1/2">
          <input
            className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full bg-[]"
            placeholder="Buscar"
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
              ? setCheckboxes(usersCompany)
              : setCheckboxes([])
          }
        >
          {t("modalEquipos.select")} todos
        </p>
        <div className="flex flex-col gap-4 items-start groupUserTeams">
          {usersCompany
            .filter((item) => {
              if (searchByEmail !== "") {
                return (
                  item.email.startsWith(searchByEmail.toLocaleLowerCase()) &&
                  item.role_id === 5
                );
              }

              return item && item.role_id === 5;
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
