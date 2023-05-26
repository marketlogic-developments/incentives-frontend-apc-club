import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalTargetParticipants from "./ModalTargetParticipants";
import ModalTableParticipants from "./ModalTableParticipants";

const ModalCreateTeam = ({ infoModal, setInfoModal }) => {
  const [t, i18n] = useTranslation("global");
  const [openParticipants, setOpenParticipants] = useState({
    component: false,
    openEnter: false,
  });
  const [checkboxes, setCheckboxes] = useState([]);
  const componenteRef = useRef(null);

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

  return (
    <div>
      <div className="flex flex-col w-2/3 items-center mx-auto">
        <div>
          <p className="!text-xl font-bold text-center">
            {t("digipoints.Crear")}
          </p>
          <p className="text-[#2C2C2C] text-xs text-center m-4">
            {t("modalEquipos.cEquiposDeTrabajo")}
          </p>
        </div>
        <form
          className="flex flex-col gap-5 p-10 w-full"
          autoComplete="off"
          onSubmit={(e) => handleButtonNext(e)}
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
                className="textarea textarea-lg textarea-primary text-xs"
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
                />
              )}
            </div>
          </div>

          {!openParticipants.component && (
            <div className="flex flex-col gap-5 font-bold">
              <p className="!text-sm text-[#333333]">
                {t("modalEquipos.pAgregados")}
              </p>
              <ModalTableParticipants dataUsers={checkboxes} />
            </div>
          )}

          <div className="relative justify-items-center grid grid-flow-col mt-8">
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
              {t("modalEquipos.gEquipo")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateTeam;
