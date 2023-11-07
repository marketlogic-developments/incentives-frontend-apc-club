import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalTargetParticipants from "./ModalTargetParticipants";
import ModalTableParticipants from "./ModalTableParticipants";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLoadingData } from "../../../store/reducers/loading.reducer";
import { teamsPush, teamsUpdate } from "../../../store/reducers/teams.reducer";
import { useMemo } from "react";

const ModalCreateTeam = ({ infoModal, setInfoModal, setOpened }) => {
  const [t, i18n] = useTranslation("global");
  const teams = useSelector((state) => state.teams.teams);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [openParticipants, setOpenParticipants] = useState({
    component: false,
    openEnter: false,
  });
  const [checkboxes, setCheckboxes] = useState([]);
  const [modifiedValues, setModifiedValues] = useState([]);
  const componenteRef = useRef(null);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (infoModal?.id !== undefined) {
      setModifiedValues(
        infoModal.PartnerAdminGroupD.map(({ memberId, percentage }) => ({
          memberId,
          percentage,
        }))
      );
      setCheckboxes(
        infoModal.PartnerAdminGroupD.map(({ member, percentage }) => ({
          ...member,
          percentage,
        }))
      );
    }
  }, []);

  useEffect(() => {
    const handleClickFuera = (event) => {
      if (
        componenteRef.current &&
        !componenteRef.current.contains(event.target)
      ) {
        // El clic se hizo fuera del componente
        setOpenParticipants({ ...openParticipants, component: false });
      }
    };

    document.addEventListener("mousedown", handleClickFuera);

    return () => {
      document.removeEventListener("mousedown", handleClickFuera);
    };
  }, []);

  const handleChange = (e) => {
    return setInfoModal({
      ...infoModal,
      [e.target.name]: e.target.value,
    });
  };

  function handleInputChange(e, id) {
    const { value } = e.target;
    const existingIndex = modifiedValues.findIndex(
      (obj) => obj.memberId === id
    );
    if (existingIndex !== -1) {
      const newValues = [...modifiedValues];
      newValues[existingIndex] = { memberId: id, percentage: Number(value) };
      setModifiedValues(newValues);
    } else {
      setModifiedValues((prevState) => [
        ...prevState,
        { memberId: id, percentage: Number(value) },
      ]);
    }
  }

  function handleSaveChanges(event) {
    event.preventDefault();

    //Function updates the teams if the team has an id

    if (infoModal?.id !== undefined) {
      const teamUpdate = {
        nameGroup: infoModal.nameGroup,
        description: infoModal.description,
        partnerAdminId: user.id,
        PartnerAdminGroupD: {
          members: modifiedValues,
        },
      };

      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/partner-admin-group-headers/${infoModal.id}`,
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
                total_users: modifiedValues.length,
              },
            ])
          );

          setModifiedValues([]);
          setInfoModal({});
          return setOpened(false);
        });
    }

    //Function makes a team if the team doesn't have an id

    if (infoModal?.id === undefined) {
      dispatch(changeLoadingData(true));

      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/partner-admin-group-headers`,
          {
            nameGroup: event.target[0].value,
            description: event.target[1].value,
            partnerAdminId: user.id,
            PartnerAdminGroupD: {
              members: modifiedValues,
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
              created_at: data.CreatedAt,
            })
          );
          Toast.fire({
            icon: "success",
            title: t("modalEquipos.teamCre"),
            background: "#000000",
            color: "#fff",
          });
          return setOpened(false);
        })
        .catch((e) =>
          Toast.fire({
            icon: "error",
            title: e,
            background: "#000000",
            color: "#fff",
          })
        )
        .finally(() => dispatch(changeLoadingData(false)));
    }
  }

  const percentage = useMemo(() => {
    return modifiedValues
      .map(({ percentage }) => percentage)
      .reduce((prev, counter) => prev + counter, 0);
  }, [modifiedValues]);

  return (
    <div>
      <div className="flex flex-col lg:w-2/3 w-full items-center mx-auto">
        <div>
          <p className="!text-xl font-bold text-center">
            {t("digipoints.Crear")}
          </p>
          <p className="text-[#2C2C2C] text-xs text-center m-4">
            {t("modalEquipos.cEquiposDeTrabajo")}
          </p>
        </div>
        <form
          className="flex flex-col gap-5 lg:p-10 p-2 w-full"
          autoComplete="off"
          onSubmit={handleSaveChanges}
        >
          <div className="flex flex-col gap-5 font-bold">
            <p className="!text-xs text-[#333333]">
              {t("modalEquipos.nequipo")}
            </p>
            {infoModal?.nameGroup === undefined ? (
              <input
                className="input rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white 
                focus:ring-0 text-xs text-[#828282]"
                type="text"
                name="nameGroup"
                placeholder={t("modalEquipos.dnequipo")}
                required
                minLength={5}
              />
            ) : (
              <input
                className="input rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white 
                focus:ring-0 text-xs text-[#828282]"
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
          <div className="flex flex-col gap-5 font-bold">
            <p className="!text-xs text-[#333333]">
              {t("modalEquipos.descripcion")}
            </p>
            {infoModal?.description === undefined ? (
              <textarea
                className="textarea textarea-lg rounded-md bg-gray-100 text-[#828282] 
                  focus:border-gray-500 focus:bg-white focus:ring-0 text-xs"
                type="text"
                name="description"
                placeholder={t("modalEquipos.dEquipo")}
                required
                minLength={5}
              />
            ) : (
              <textarea
                className="textarea textarea-lg rounded-md bg-gray-100 text-[#828282] 
                  focus:border-gray-500 focus:bg-white focus:ring-0 text-xs"
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

          <div
            className="w-full flex flex-col gap-5 font-bold"
            ref={componenteRef}
          >
            <p className="!text-xs text-[#333333]">
              {t("modalEquipos.aParticipantes")}
            </p>

            <div
              className={`block px-4 py-4 w-full rounded-md bg-gray-100 
              focus:border-[#1473E6] focus:ring-0 text-xs text-[#828282] h-12 ${
                openParticipants.component && "border border-[#1473E6]"
              }`}
              onClick={() =>
                setOpenParticipants({
                  ...openParticipants,
                  component: !openParticipants.component,
                })
              }
            >
              <span>
                {checkboxes.length === 0
                  ? t("modalEquipos.sParticipantesGrupo")
                  : `${checkboxes.length} ${t(
                      "modalEquipos.sParticipantesGrupo2"
                    )}`}
              </span>
            </div>

            <div
              className={`relative max-w-full rounded-md bg-white drop-shadow-lg`}
            >
              {openParticipants.component && (
                <ModalTargetParticipants
                  checkboxes={checkboxes}
                  setCheckboxes={setCheckboxes}
                  modifiedValues={modifiedValues}
                  setModifiedValues={setModifiedValues}
                />
              )}
            </div>
          </div>

          {!openParticipants.component && (
            <div className="flex flex-col gap-5 font-bold">
              <p className="!text-sm text-[#333333]">
                {t("modalEquipos.pAgregados")}
              </p>
              <ModalTableParticipants
                dataUsers={checkboxes}
                handleInputChange={handleInputChange}
              />
            </div>
          )}

          {percentage !== 100 &&
            modifiedValues.length !== 0 &&
            !openParticipants.component && (
              <div>
                <p className="!text-xs text-primary">
                  {t("digipoints.percentage")}
                </p>
              </div>
            )}

          <div className="relative justify-items-center lg:grid lg:grid-flow-col flex flex-col-reverse lg:gap-0 gap-3 mt-8">
            <button
              type="cancel"
              className="btn btn-cancel lg:w-48 w-full"
              onClick={() => {
                setOpened(false);
              }}
            >
              {t("modalEquipos.cancelar")}
            </button>
            <button
              type="submit"
              className="btn btn-info lg:w-48 w-full"
              disabled={percentage === 100 ? false : true}
            >
              {t("modalEquipos.gEquipo")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateTeam;
