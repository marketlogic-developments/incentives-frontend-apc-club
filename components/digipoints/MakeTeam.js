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

  const searchUser = () => {
    const searchValue = users.filter(
      ({ email, role_id }) =>
        email.startsWith(searchByEmail.toLocaleLowerCase()) && role_id === 5
    );

    if (searchValue.length !== 0) {
      return searchValue.map((data) => (
        <div
          className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer"
          onClick={() => verifyUserInToTable(data)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>
            <strong className="text-primary">Nombre:</strong>
            <strong>{data.name}</strong>
          </p>
          <p>
            <strong className="text-primary">Email:</strong> {data.email}
          </p>
        </div>
      ));
    }

    if (searchByEmail === "") {
      return users.map((data) => (
        <div
          className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer"
          onClick={() => verifyUserInToTable(data)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>
            <strong className="text-primary">Nombre:</strong>
            <strong>{data.name}</strong>
          </p>
          <p>
            <strong className="text-primary">Email:</strong> {data.email}
          </p>
        </div>
      ));
    }

    if (searchValue.length === 0 && searchByEmail !== "") {
      return (
        <div className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer">
          <p>No hay concidencias encontradas</p>
        </div>
      );
    }
  };

  const componentMenuUsers = useMemo(() => {
    if (listUsers) {
      return (
        <div className="w-full absolute bg-[#e6e6e6] p-5 max-h-52 flex flex-col gap-3 overflow-y-auto">
          {searchUser()}
        </div>
      );
    }
  }, [listUsers, searchByEmail]);

  const verifyUserInToTable = (data) => {
    const dataModalFilter = dataModal.map(({ email }) => email);

    if (dataModalFilter.includes(data.email)) {
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

      return Toast.fire({
        icon: "error",
        title: t("modalEquipos.lista"),
      });
    } else {
      setSearchByEmail("");
      setListUsers(false);
      setDataModal([...dataModal, { ...data, percentage: 0 }]);
    }
  };

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

  const handleButtonNext = (e) => {
    e.preventDefault();

    if (infoModal?.id) {
      setInfoModal({
        ...infoModal,
        nameGroup: e.target[0].value,
        description: e.target[1].value,
      });
    } else {
      setInfoModal({
        nameGroup: e.target[0].value,
        description: e.target[1].value,
      });
    }

    return setModal(1);
  };

  function handleInputChange(e, id) {
    const { value } = e.target;
    const existingIndex = modifiedValues.findIndex((obj) => obj.id === id);
    if (existingIndex !== -1) {
      const newValues = [...modifiedValues];
      newValues[existingIndex] = { id, percentage: Number(value) };
      setModifiedValues(newValues);
    } else {
      setModifiedValues((prevState) => [
        ...prevState,
        { id, percentage: Number(value) },
      ]);
    }
  }

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
          console.log(infoModal);

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

  const handleChange = (e) => {
    return setInfoModal({
      ...infoModal,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteTeam = (data) => {
    Swal.fire({
      title: "Eliminar Equipo",
      text: "Esta acción eliminará permanentemente tu equipo. ¿Está seguro de continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb1000",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
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
              title: "Tu equipo ha sido eliminado",
            });
          })
          .catch(() => {
            Toast.fire({
              icon: "error",
              title:
                "Hubo un error al momento eliminar tu equipo intentalo más tarde",
            });
          });
      }
    });
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <form
          className="flex flex-col gap-5 p-10 w-full"
          autoComplete="off"
          onSubmit={(e) => handleButtonNext(e)}
        >
          <div className="flex flex-col gap-5">
            <p>{t("modalEquipos.nequipo")}</p>
            {infoModal?.nameGroup === undefined ? (
              <input
                className="input input-primary"
                type="text"
                name="nameGroup"
                placeholder={t("modalEquipos.nequipo")}
                required
                minLength={5}
              />
            ) : (
              <input
                className="input input-primary"
                type="text"
                placeholder={t("modalEquipos.nequipo")}
                required
                name="nameGroup"
                value={infoModal?.nameGroup}
                onChange={handleChange}
                minLength={5}
              />
            )}
          </div>
          <div className="flex flex-col gap-5">
            <p>{t("modalEquipos.descripcion")}</p>
            {infoModal?.description === undefined ? (
              <textarea
                className="textarea textarea-lg textarea-primary"
                type="text"
                name="description"
                placeholder={t("modalEquipos.dEquipo")}
                required
                minLength={5}
              />
            ) : (
              <textarea
                className="textarea textarea-lg textarea-primary"
                type="text"
                placeholder={t("modalEquipos.dEquipo")}
                required
                name="description"
                value={infoModal?.description}
                onChange={handleChange}
                minLength={5}
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary w-max">
            {t("modalEquipos.next")}
          </button>
        </form>
      );
    }

    if (modal === 1) {
      return (
        <form
          className="grid grid-cols-5 h-[400px] w-full p-[50px]"
          onSubmit={handleSaveChanges}
        >
          <div className="flex flex-col gap-5 relative p-5 h-full justify-evenly col-span-2">
            <div>
              <p>{t("modalEquipos.pEquipo")}</p>
              <div className="relative w-full">
                <input
                  value={searchByEmail}
                  className="input input-primary w-full"
                  type="text"
                  placeholder={t("tabla.buscarEmail")}
                  onChange={(e) => setSearchByEmail(e.target.value)}
                  onFocus={() => setListUsers(true)}
                  onBlur={() => {
                    if (hover === false) {
                      return setListUsers(false);
                    }
                  }}
                  autoComplete="off"
                />
                {componentMenuUsers}
              </div>
            </div>
            <button className="btn btn-primary w-max" type="submit">
              {t("modalEquipos.guardar")}
            </button>
          </div>
          <div className="col-span-3">
            <div className="text-xs text-black-500 uppercase border-2 w-full grid grid-cols-4 place-items-center tableHeader">
              <p scope="col" className="py-3 px-6">
                {t("tabla.nomParticipantes")}
              </p>
              <p scope="col" className="py-3 px-6">
                {t("login.Email")}
              </p>
              <p scope="col" className="py-3 px-6">
                {t("modalEquipos.porcentajes")}
              </p>
              <p scope="col" className="py-3 px-6">
                Borrar
              </p>
            </div>
            <div className="w-full overflow-y-scroll">
              <table className="border-2 w-full text-sm">
                <tbody>
                  {dataModal?.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b dark:border-gray-500"
                    >
                      <td className="py-[1.1rem] w-1/3">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <input
                          type="text"
                          value={
                            modifiedValues.find((obj) => obj.id === user.id)
                              ? modifiedValues.find((obj) => obj.id === user.id)
                                  .percentage
                              : user.percentage
                          }
                          onChange={(e) => handleInputChange(e, user.id)}
                          className="input input-xs w-1/2 text-center"
                        />
                        %
                      </td>
                      <td
                        className="w-1/5"
                        onClick={() => {
                          const usersDelete = dataModal.filter(
                            ({ id }) => id !== user.id
                          );
                          setDataModal(usersDelete);
                        }}
                      >
                        <svg
                          width="30"
                          height="30"
                          fill="#eb1000"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full cursor-pointer"
                        >
                          <path d="M20.25 4.5H16.5v-.75a2.26 2.26 0 0 0-2.25-2.25h-4.5A2.26 2.26 0 0 0 7.5 3.75v.75H3.75a.75.75 0 0 0 0 1.5h.75v13.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V6h.75a.75.75 0 1 0 0-1.5ZM10.5 15.75a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 1.5 0v6Zm4.5 0a.75.75 0 1 1-1.5 0v-6a.75.75 0 1 1 1.5 0v6ZM15 4.5H9v-.75A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .75.75v.75Z"></path>
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      );
    }
  }, [
    searchByEmail,
    dataModal,
    listUsers,
    hover,
    infoModal,
    infoModal,
    modifiedValues,
    modal,
  ]);

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
                      <p className="text-[#eb1000]">Eliminar</p>
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
        size={modal === 0 ? "50%" : "90%"}
      >
        <div className="flex flex-col w-full items-center">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a>{t("modalEquipos.informacion")}</a>
              </li>
              <li>{t("modalEquipos.porcentajes")}</li>
            </ul>
          </div>
          {typeModal}
        </div>
      </Modal>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
        <div className="flex justify-between w-full">
          <div className="w-max">
            <button
              className="btn btn-primary"
              onClick={() => {
                setOpened(true);
              }}
            >
              {t("digipoints.Crear")}
            </button>
          </div>
          <select
            className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value="">{t("tabla.ordenarFecha")}</option>
            <option value="upDown">{t("tabla.recienteA")}</option>
            <option value="downUp">{t("tabla.antiguoR")}</option>
          </select>
        </div>
        <br></br>
        <div className="container">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="text-xs text-black-500 uppercase">
                <th scope="col" className="py-3 px-6">
                  {t("tabla.nEquipo")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("tabla.descripcion")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("tabla.nParticipantes")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("tabla.fechaCreacion")}
                </th>
                <th scope="col" className="py-3 px-6">
                  Opciones
                </th>
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
