import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../../../store/reducers/teams.reducer";
import Swal from "sweetalert2";
import { Triangle } from "react-loader-spinner";

const PerTeams = ({ invoiceData, handleSubmit, setOpened }) => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const teams = useSelector((state) => state.teams.teams);
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const [searchByName, setSearchByName] = useState("");
  const [thisTeam, setThisTeam] = useState("");
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/all-users-by-groupname-where-id/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.length !== 0) dispatch(getAllTeams(data));
      });
  }, [token]);

  const handleAssign = () => {
    if (!thisTeam.id) {
      return Toast.fire({
        icon: "error",
        title: t("digipoints.errorNoTeam"),
      });
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee-poits-collects/assign-points/`,
        {
          partnerAdminId: user.id,
          assignType: "group",
          isGold: user.companyId === null ? true : false,
          assignValues: [
            {
              invoiceId: invoiceData.invoices_included.toString(),
              groupId: thisTeam.id,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleSubmit(invoiceData);
        return Toast.fire({
          icon: "success",
          title: t("digipoints.successFact"),
        });
      })
      .catch((err) => {
        console.log(err);
        return Toast.fire({
          icon: "error",
          title: "An error has occurred",
        });
      });
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <p className="font-bold !text-base self-center">
            {t("digipoints.teamV")} ({teams.length})
          </p>
          <div className="relative flex w-full">
            <input
              className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full bg-[]"
              placeholder="Buscar"
              type="text"
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
            <div className="absolute h-full items-center flex ml-2">
              <AiOutlineSearch color="#eb1000" />
            </div>
          </div>
          <p className="col-span-2">{t("digipoints.selectTeam")}</p>
        </div>
        <div className="w-full">
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm text-left text-black-500 tableJustify table-fixed overflow-hidden"
              style={{ borderRadius: "10px" }}
            >
              <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-1 ">
                <th scope="col" className="py-5 px-6">
                  {t("tabla.nEquipo")}
                </th>
                <th scope="col" className="py-5 px-6">
                  {t("tabla.nParticipantes")}
                </th>
              </thead>
              {teams.length !== 0 && (
                <tbody className="min-h-[15rem]">
                  {teams
                    .filter((item) => {
                      if (searchByName !== "") {
                        return item.name_group.startsWith(
                          searchByName.toLocaleLowerCase()
                        );
                      }

                      return item;
                    })
                    .map((item, index) => (
                      <tr
                        className={
                          index % 2 !== 0 ? "bg-[#F5F5F5]" : "bg-white"
                        }
                      >
                        <td className="py-3">
                          <div className="flex gap-6 items-center">
                            <input
                              className="radio radio-xs checked:bg-blue-500"
                              type="radio"
                              value={item}
                              name="salesTeam"
                              onChange={() => setThisTeam(item)}
                            ></input>

                            {item.name_group}
                          </div>
                        </td>
                        <td className="py-3">{item.total_users}</td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="relative w-full flex justify-center justify-around mt-auto mb-6">
        <button
          type="cancel"
          className="btn btn-cancel w-48"
          onClick={() => {
            setOpened(false);
          }}
        >
          {t("modalEquipos.cancelar")}
        </button>
        <button
          className="btn btn-info w-48"
          onClick={handleAssign}
          disabled={loading}
        >
          {loading ? (
            <Triangle
              height="30"
              width="30"
              color="#ffff"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            t("digipoints.cAsignacion")
          )}
        </button>
      </div>
    </>
  );
};

export default PerTeams;
