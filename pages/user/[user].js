import { Modal } from "@mantine/core";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../../components/containerContent";
import { policyAndPassword } from "../../store/reducers/users.reducer";

const user = () => {
  const user = useSelector((state) => state.user.user);
  const userAll = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [nInputs, setNInputs] = useState(0);
  const [t, i18n] = useTranslation("global");

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    role: "",
    position: "",
    emailP: "",
    region: "",
    imgProfile: "",
    birthDate: "",
    phone: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.person[0]?.names,
      lastname: user?.person[0]?.lastName,
      email: user?.email,
      role: user?.roleId,
      position: user?.person[0]?.position,
      emailP: user?.person[0]?.secondaryEmail,
      region: user?.region,
      imgProfile: user?.profilePhotoPath,
      birthDate: user?.person[0]?.birthDate,
      phone: user?.person[0]?.phoneNumber,
    });

    const num = Object.values({
      name: user?.person[0]?.names,
      lastname: user?.person[0]?.lastName,
      email: user?.email,
      role: user?.roleId,
      position: user?.person[0]?.position,
      emailP: user?.person[0]?.secondaryEmail,
      region: user?.region,
      imgProfile: user?.profilePhotoPath,
      birthDate: user?.person[0]?.birthDate,
      phone: user?.person[0]?.phoneNumber,
    }).filter((e) => e !== null).length;

    setNInputs(num * 10);
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "roleId") {
      return setFormData({
        ...formData,
        [e.target.name]: Number(e.target.value),
      });
    }

    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${process.env.BACKURL}/users/${user.id}`,
        {
          person: {
            names: formData.name,
            lastName: formData.lastname,
            birthDate: formData.birthDate,
            phoneNumber: formData.phone,
            personId: user.person[0].id,
          },
          region: formData.region,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userAll.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          policyAndPassword({
            ...res.data,
            person: [{ ...user.person[0], ...res.data.person[0] }],
          })
        );
        setOpened(true);
      });
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <div>
          <p>¡Tus datos fueron actualizados!</p>
        </div>
      </Modal>
      <ContainerContent pageTitle={"Ajustes de perfil"}>
        <div className="m-6 flex flex-col">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">{t("user.ajustesdeperfil")}</h1>
          </div>
          <form
            className="flex flex-col gap-5 items-center"
            onSubmit={handleSubmit}
          >
            <div className="p-5">
              <h2 className="font-bold">{t("user.informaciongeneral")}</h2>
            </div>
            <div className="w-full flex justify-between">
              <div className="containerProgress">
                <div
                  className="circular-progress"
                  style={{
                    background: `conic-gradient(#d75050 ${
                      nInputs * 3.6
                    }deg, #ededed 0deg)`,
                  }}
                >
                  <div className="flip-card-imgPhoto">
                    <div className="flip-card-inner-imgPhoto">
                      <div className="flip-card-front-imgPhoto">
                        <figure className="imgPhoto">
                          <img
                            src={
                              formData.imgProfile || "/assets/Icons/avatar.png"
                            }
                          />
                        </figure>
                      </div>
                      <div className="flip-card-back-imgPhoto">
                        <p className="title-imgPhoto">{nInputs}%</p>
                        <p>del porcentaje de tu perfil</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-4/6 flex items-center">
                <div className="w-full grid grid-cols-2 h-fit">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.nombre")}</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.apellido")}</span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.correo1")}</span>
                    </label>
                    <span
                      type="text"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs p-3"
                    >
                      {formData.email}
                    </span>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.rol")}</span>
                    </label>
                    <span
                      type="text"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs p-3"
                    >
                      {formData.role === 1
                        ? "SuperAdmin"
                        : formData.role === 2
                        ? "Partner Principal"
                        : formData.role === 3
                        ? "Partner Admin"
                        : formData.role === 5
                        ? "Sales Rep"
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="p-5">
                <h2 className="font-bold">{t("user.informacionpersonal")}</h2>
              </div>
              <div className="w-full flex items-center">
                <div className="w-full grid grid-cols-3 h-fit gap-y-5">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.correo2")}</span>
                    </label>
                    <input
                      type="text"
                      name="emailP"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs"
                      value={formData.emailP}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.region")}</span>
                    </label>
                    <select
                      type="text"
                      name="region"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs"
                      value={formData.region}
                      onChange={handleChange}
                    >
                      <option value="BRAZIL">BRAZIL</option>
                      <option value="NOLA">NOLA</option>
                      <option value="SOLA">SOLA</option>
                      <option value="MEXICO">MEXICO</option>
                    </select>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.posicion")}</span>
                    </label>
                    <span
                      type="text"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs p-3"
                    >
                      {formData.position}
                    </span>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.cel")}</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs"
                      value={formData.phone}
                      onChange={handleChange}
                      name="phone"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">
                        {t("user.FechaNacimiento")}
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs"
                      value={formData.birthDate}
                      onChange={handleChange}
                      name="birthDate"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary w-2/4">{t("user.boton")}</button>
          </form>
        </div>
      </ContainerContent>
    </>
  );
};

export default user;
