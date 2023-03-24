import { Modal } from "@mantine/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useId } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { teamsPush, teamsUpdate } from "../../store/reducers/teams.reducer";
import { getUsersData } from "../../store/reducers/users.reducer";

const MakeTeam = () => {
  const token = useSelector((state) => state.user.token);
  const teams = useSelector((state) => state.teams.teams);
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.users);
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

  const searchUser = () => {
    const searchValue = users.filter(({ email }) =>
      email.startsWith(searchByEmail.toLocaleLowerCase())
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

  const getUsers = (token) => {
    if (users.length === 0) {
      return dispatch(getUsersData(token));
    }

    return;
  };

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

  const tableTeams = useMemo(() => {
    return (
      <tbody>
        {teams?.map((data) => {
          const time = new Date(data?.CreatedAt);

          return (
            <tr
              className="bg-white border-b dark:border-gray-500 hover:bg-base-200 cursor-pointer"
              onClick={() => {
                setInfoModal(data);
                setDataModal(data?.participants);
                setOpened(true);
              }}
            >
              <td className="py-4 px-6">{data?.nameGroup}</td>
              <td className="py-4 px-6">{data?.description}</td>
              <td className="py-4 px-6">{data?.participants?.length}</td>
              <td className="py-4 px-6">{time.toLocaleDateString("en-GB")}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }, [teams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target[2].name === "update") {
      setInfoModal({
        ...infoModal,
        nameGroup: e.target[0].value,
        description: e.target[1].value,
      });
      return setModal(1);
    }

    if (e.target[2].name === "create") {
      setInfoModal({
        nameGroup: e.target[0].value,
        description: e.target[1].value,
      });
      return setModal(1);
    }
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

  function handleSaveChanges(event) {
    event.preventDefault();
    const newData = dataModal.map((user) => {
      const modifiedUser = modifiedValues.find((obj) => obj.id === user.id);
      if (modifiedUser) {
        return { memberId: user.id, percentage: modifiedUser.percentage };
      }
      return { memberId: user.id, percentage: user.percentage };
    });

    // calculatePercentage function defines if the result of the sum of the inputs is equal to 100
    const calculatePercentage = newData
      .map(({ percentage }) => percentage)
      .reduce((prev, counter) => prev + counter);

    if (calculatePercentage > 100 || calculatePercentage < 100) {
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
        title: t("modalEquipos.suma"),
      });
    }

    //Function updates the teams if the team has an id

    if (infoModal?.id !== undefined) {
      const teamUpdate = {
        ...infoModal,
        participants: newData,
        creation: new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        }),
      };

      const update = teams.filter(({ id }) => id !== infoModal?.id);

      dispatch(teamsUpdate([...update, teamUpdate]));

      setDataModal([]);
      setModifiedValues([]);
      setModal(0);
      setInfoModal({});
      return setOpened(false);
    }

    //Function makes a team if the team doesn't have an id

    if (infoModal?.id === undefined) {
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
        .then((res) => {
          dispatch(teamsPush(res.data));
          setInfoModal({});
          setDataModal([]);
          setModifiedValues([]);
          setModal(0);
          return setOpened(false);
        });
    }
  }

  const handleChange = (e) => {
    return setInfoModal({
      ...infoModal,
      [e.target.name]: e.target.value,
    });
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <form
          className="flex flex-col gap-5 p-10 w-full"
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
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
              />
            )}
          </div>
          {infoModal?.nameGroup === undefined ? (
            <button
              type="submit"
              className="btn btn-primary w-max"
              name="create"
            >
              {t("modalEquipos.next")}
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary w-max"
              name="update"
            >
              {t("modalEquipos.next")}
            </button>
          )}
        </form>
      );
    }

    if (modal === 1) {
      return (
        <form
          className="grid grid-cols-2 h-[400px] w-full p-[50px]"
          onSubmit={handleSaveChanges}
        >
          <div className="flex flex-col gap-5 relative p-5 h-full justify-evenly">
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
          <div>
            <div className="text-xs text-black-500 uppercase border-2 w-full grid grid-cols-3 place-items-center tableHeader">
              <p scope="col" className="py-3 px-6">
                {t("tabla.nomParticipantes")}
              </p>
              <p scope="col" className="py-3 px-6">
                {t("login.Email")}
              </p>
              <p scope="col" className="py-3 px-6">
                {t("modalEquipos.porcentajes")}
              </p>
            </div>
            <div className="w-full overflow-y-scroll">
              <table className="border-2 w-full text-sm">
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
                  </tr>
                ))}
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
        size={modal === 0 ? "50%" : "70%"}
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
                getUsers(token);
                setOpened(true);
              }}
            >
              {t("digipoints.Crear")}
            </button>
          </div>
          <select className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            <option value="">{t("tabla.ordenarFecha")}</option>
            <option value="upDown">{t("tabla.recienteA")}</option>
            <option value="downUp">{t("tabla.antiguoR")}</option>
          </select>
        </div>
        <br></br>
        <div className="container">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="text-xs text-black-500 uppercase">
                <tr>
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
                </tr>
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
