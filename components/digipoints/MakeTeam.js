import { Menu, Modal } from "@mantine/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useId } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { changeLoadingData } from "../../store/reducers/loading.reducer";
import { teamsPush, teamsUpdate } from "../../store/reducers/teams.reducer";
import { getUsersData } from "../../store/reducers/users.reducer";
import ModalTargetParticipants from "./MakeTeam/ModalTargetParticipants";
import ModalCreateTeam from "./MakeTeam/ModalCreateTeam";

const MakeTeam = () => {
  const token = useSelector((state) => state.user.token);
  const teams = useSelector((state) => state.teams.teams);
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.companyUsers);
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [searchByEmail, setSearchByEmail] = useState("");
  const [dataModal, setDataModal] = useState([]);
  const [listUsers, setListUsers] = useState(false);
  const [hover, setHover] = useState(false);
  const [infoModal, setInfoModal] = useState({});
  const [modifiedValues, setModifiedValues] = useState([]);
  const [modal, setModal] = useState(0);
  const [selectDate, setSelectDate] = useState("");

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

  const componentMenuUsers = useMemo(() => {
    if (listUsers) {
      return (
        <div className="w-full absolute bg-[#e6e6e6] p-5 max-h-52 flex flex-col gap-3 overflow-y-auto">
          {searchUser()}
        </div>
      );
    }
  }, [listUsers, searchByEmail]);

  const getTeamData = (data) => {
    dispatch(changeLoadingData(true));

    axios
      .get(`${process.env.BACKURL}/partner-admin-group-headers/${data.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res1) => {
        console.log(res1.data);
        setInfoModal(res1.data);
        setOpened(true);
        setDataModal(
          res1.data.PartnerAdminGroupD.map((data) => ({
            ...data.member,
            ...data,
          }))
        );
      })
      .finally(() => dispatch(changeLoadingData(false)));
  };

  //This function skips to the next modal, if infoModal.id exist then response previousData and new values

  //This function sends

  function handleSaveChanges(event) {
    event.preventDefault();

    const newData = dataModal.map((user) => {
      const modifiedUser = modifiedValues.find((obj) => obj.id === user.id);

      if (user.memberId !== undefined) {
        return { memberId: user.memberId, percentage: modifiedUser.percentage };
      }

      return { memberId: user.id, percentage: modifiedUser.percentage };
    });

    // calculatePercentage function defines if the result of the sum of the inputs is equal to 100
    const calculatePercentage = newData
      .map(({ percentage }) => percentage)
      .reduce((prev, counter) => prev + counter);

    if (calculatePercentage > 100 || calculatePercentage < 100) {
      return Toast.fire({
        icon: "error",
        title: t("modalEquipos.suma"),
      });
    }

    //Function updates the teams if the team has an id

    if (infoModal?.id !== undefined) {
      const teamUpdate = {
        nameGroup: infoModal.nameGroup,
        description: infoModal.description,
        partnerAdminId: user.id,
        PartnerAdminGroupD: {
          members: newData,
        },
      };

      axios
        .patch(
          `${process.env.BACKURL}/partner-admin-group-headers/${infoModal.id}`,
          teamUpdate,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          const update = teams.filter(({ id }) => id !== infoModal?.id);

          dispatch(
            teamsUpdate([
              ...update,
              {
                id: infoModal.id,
                name_group: infoModal.nameGroup,
                description: infoModal.description,
                partner_admin_id: user.id,
                created_at: infoModal.CreatedAt,
                total_users: newData.length,
              },
            ])
          );

          setDataModal([]);
          setModifiedValues([]);
          setModal(0);
          setInfoModal({});
          return setOpened(false);
        });
    }

    //Function makes a team if the team doesn't have an id

    if (infoModal?.id === undefined) {
      dispatch(changeLoadingData(true));

      axios
        .post(
          `${process.env.BACKURL}/partner-admin-group-headers`,
          {
            ...infoModal,
            partnerAdminId: user.id,
            PartnerAdminGroupD: {
              members: newData,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          dispatch(
            teamsPush({
              ...data,
              total_users: data.PartnerAdminGroupD.length,
              name_group: data.nameGroup,
            })
          );
          setInfoModal({});
          setDataModal([]);
          setModifiedValues([]);
          setModal(0);
          Toast.fire({
            icon: "success",
            title: t("modalEquipos.teamCre"),
          });
          return setOpened(false);
        })
        .catch(() =>
          Toast.fire({
            icon: "error",
            title: t("tabla.notiError"),
          })
        )
        .finally(() => dispatch(changeLoadingData(false)));
    }
  }

  const handleDeleteTeam = (data) => {
    Swal.fire({
      title: t("digipoints.deleteTeam"),
      text: t("digipoints.copyDeleteTeam"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb1000",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("digipoints.delete"),
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${process.env.BACKURL}/partner-admin-group-headers/${data.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            const teamsFiltered = teams.filter((i) => i.id !== data.id);
            dispatch(teamsUpdate(teamsFiltered));
            return Toast.fire({
              icon: "success",
              title: t("digipoints.teamDeleteNoti"),
            });
          })
          .catch(() => {
            Toast.fire({
              icon: "error",
              title: t("digipoints.errorNotiTeams"),
            });
          });
      }
    });
  };

  const tableTeams = useMemo(() => {
    return (
      <tbody>
        {teams.map((data) => {
          const time = new Date(data?.CreatedAt || data?.created_at);

          return (
            <tr className="bg-white border-b dark:border-gray-500">
              <td className="py-4 px-6">{data?.name_group}</td>
              <td className="py-4 px-6">{data?.description}</td>
              <td className="py-4 px-6">{data?.total_users}</td>
              <td className="py-4 px-6">{time.toLocaleDateString("en-GB")}</td>
              <td className="py-4 px-6">
                <Menu>
                  <Menu.Target>
                    <svg
                      width={20}
                      height={20}
                      className="optionsTeams cursor-pointer"
                      fill="#00000"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.625 12A2.625 2.625 0 1 1 12 9.375 2.634 2.634 0 0 1 14.625 12ZM4.5 9.375A2.625 2.625 0 1 0 7.125 12 2.634 2.634 0 0 0 4.5 9.375Zm15 0A2.625 2.625 0 1 0 22.125 12 2.634 2.634 0 0 0 19.5 9.375Z" />
                    </svg>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        return getTeamData(data);
                      }}
                    >
                      <p className="text-[#000000]">Editar</p>
                    </Menu.Item>
                    <Menu.Item onClick={() => handleDeleteTeam(data)}>
                      <p className="text-[#eb1000]">{t("digipoints.delete")}</p>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }, [teams, selectDate]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setModifiedValues([]);
          setInfoModal({});
          setSearchByEmail("");
          setDataModal([]);
          setOpened(false);
          setModal(0);
        }}
        centered
        size={"100%"}
        className="modal100"
      >
        <ModalCreateTeam infoModal={infoModal} setInfoModal={setInfoModal} />
      </Modal>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
        <div className="w-full grid grid-cols-3 gap-1 mb-4">
          <div className="relative">
            <div className="absolute flex items-center ml-4 h-full">
              <img
                className="mb-3"
                src="/assets/Icons/search.png"
                alt="search"
              />
            </div>
            <input
              type="text"
              placeholder="Buscar"
              className="px-11 py-3 w-11/12 rounded-full bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
          </div>
          <div className="relative">
            <select
              className="block px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              onChange={(e) => setSelectDate(e.target.value)}
            >
              <option value="">{t("tabla.ordenarPor")}</option>
              <option value="upDown">{t("tabla.recienteA")}</option>
              <option value="downUp">{t("tabla.antiguoR")}</option>
            </select>
          </div>
          <div className="relative justify-items-center grid grid-flow-col">
            <div className="flex items-center ml-4 h-full gap-1">
              <img src="/assets/Icons/download.png" alt="search" />
              <p className="text-[#1473E6] font-semibold cursor-pointer textShadowHTW">
                {t("digipoints.descargar")}
              </p>
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={() => {
                setOpened(true);
              }}
            >
              {t("digipoints.Crear")}
            </button>
          </div>
        </div>
        <br></br>
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-black-500">
              {/* <thead className="text-xs text-black-500 uppercase"> */}
              <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5 table-fixed tableJustify">
                <th scope="col" className="py-5 px-6">
                  {t("tabla.nEquipo")}
                </th>
                <th scope="col" className="py-5 px-6">
                  {t("tabla.descripcion")}
                </th>
                <th scope="col" className="py-5 px-6">
                  {t("tabla.nParticipantes")}
                </th>
                <th scope="col" className="py-5 px-6">
                  {t("tabla.fechaCreacion")}
                </th>
                {/*<th scope="col" className="py-3 px-6">
                  Opciones
                </th>
                */}
                <th scope="col" className="py-3 px-6"></th>
              </thead>
              {tableTeams}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeTeam;
