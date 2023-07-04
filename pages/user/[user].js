import { Modal } from "@mantine/core";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../../components/containerContent";
import {
  policyAndPassword,
  userUpdate,
} from "../../store/reducers/users.reducer";
import ModalPassword from "../../components/user/modalPassword";
import Swal from "sweetalert2";
import { DateInput } from "@mantine/dates";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import UserPhoto from "../../components/user/UserPhoto";

const user = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [nInputs, setNInputs] = useState(0);
  const [t, i18n] = useTranslation("global");
  const [menu, setMenu] = useState(false);
  const [editInfo, setEditInfo] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    names: "",
    lastname: "",
    email: "",
    role: "",
    position: "",
    region: "",
    imgProfile: "",
    birthDate: "",
    phone: "",
    languageId: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name,
      names: user?.names,
      lastname: user?.lastName,
      email: user?.email,
      role: user?.roleId,
      position: user?.position,
      region: user?.region,
      imgProfile: user?.profilePhotoPath,
      birthDate: user?.birthDate,
      phone: user?.phoneNumber.includes("+") ? user?.phoneNumber : "",
      languageId: user?.languageId,
    });

    const num = Object.values({
      name: user.name,
      names: user.names,
      lastname: user.lastName,
      imgProfile: user.profilePhotoPath,
      birthDate: user.birthDate,
      phone: user.phoneNumber,
      languageId: user.languageId,
    }).filter((e) => e !== "" && e !== null).length;

    setNInputs(parseInt((num * 100) / 5));
  }, [user]);

  const handleChangeInputs = () => {
    const num = Object.values({
      name: formData.name,
      names: formData.names,
      lastname: formData.lastname,
      imgProfile: formData.imgProfile,
      birthDate: formData.birthDate,
      phone: formData.phone,
      languageId: user.languageId,
    }).filter((e) => e !== "" && e !== null).length;

    setNInputs(parseInt((num * 100) / 5));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "languageId") {
      const languageValue = value === "es" ? 2 : 1;
      setFormData({
        ...formData,
        [name]: languageValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleChangeDate = (value) => {
    setFormData({
      ...formData,
      birthDate: value.toISOString(), // Asegúrate de convertir el valor en un formato válido para la API
    });
  };

  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
  function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  const [phone, setPhone] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.phone = phone !== "" ? phone : formData.phone;
    const jsonData = () => {
      phone;
      return {
        name: formData.name,
        names: formData.names,
        lastName: formData.lastname,
        birthDate: formData.birthDate,
        phoneNumber: formData.phone,
        region: formData.region,
        languageId: formData?.languageId,
      };
    };

    axios
      .patch(`${process.env.BACKURL}/users/${user.id}`, jsonData(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(policyAndPassword(res.data));
        setEditInfo(!editInfo);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        return Toast.fire({
          icon: "success",
          title: "Datos actualizados",
          background: "#000000",
          color: "#fff",
          customClass: {
            content: "sw2Custom",
          },
        });
      });
  };

  return (
    <>
      <ContainerContent pageTitle={"Ajustes de perfil"}>
        <div className="flex flex-col">
          <div className="w-full gap-5 flex bg-white rounded-lg shadow-xl overflow-hidden ring-slate-900/5 p-5">
            <UserPhoto formData={formData} />
            <div className="flex flex-col description gap-3 justify-center">
              <h1 className="font-bold text-3xl">
                {formData.names} {formData.lastname}
              </h1>
              <h2 className="font-bold">
                {formData.role === 1
                  ? "Administrador"
                  : formData.role === 2
                  ? "Partner Principal"
                  : formData.role === 3
                  ? "Partner Admin"
                  : formData.role === 5
                  ? "Sales Rep"
                  : ""}
              </h2>
              <div className="flex flex-row gap-x-4">
                <div className="flex flex-row gap-x-1">
                  <img
                    className="icons-user"
                    src="/assets/perfil/earth-outline.png"
                  ></img>
                  <p>{formData.region}</p>
                </div>
                <div className="flex flex-row gap-x-1">
                  <img
                    className="icons-user"
                    src="/assets/perfil/mail-outline.png"
                  ></img>
                  <p>{formData.email}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <form
            className="flex flex-col gap-5 items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex justify-between">
              <div className="containerProgress">
                <div
                  className="circular-progress"
                  style={{
                    "--progress": `${nInputs * 3.6}deg`,
                  }}
                >
                  <div className="flip-card-imgPhoto">
                    <div className="flip-card-inner-imgPhoto">
                      <div className="flip-card-front-imgPhoto">
                        <figure className="imgPhoto">
                          <img
                            src={
                              formData.imgProfile === null ||
                                formData.imgProfile === "" ||
                                formData.imgProfile === "noImage"
                                ? "/assets/Icons/user.webp"
                                : formData.imgProfile
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
                <div
                  className="btn btn-primary"
                  onClick={() => {
                    setModal(1);
                    setOpened(true);
                  }}
                >
                  {t("user.cambiarFoto")} foto de perfil
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
                      className="input input-ghost w-full max-w-xs border border-accent"
                      name="names"
                      value={formData.names}
                      onChange={handleChange}
                      onBlur={handleChangeInputs}
                      required
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
                      className="input input-ghost w-full max-w-xs border border-accent"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      onBlur={handleChangeInputs}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">{t("user.correo1")}</span>
                    </label>
                    <span
                      type="text"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs p-3 border"
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
                  <div className="form-control w-full max-w-xs py-10">
                    <span
                      className="btn btn-primary"
                      onClick={() => {
                        setModal(2);
                        setOpened(true);
                      }}
                    >
                      {t("dashboard.cambiarpass")}
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
                      <span className="label-text">{t("user.region")}</span>
                    </label>
                    <span
                      type="text"
                      placeholder={t("user.escriba")}
                      className="input input-ghost w-full max-w-xs p-3"
                    >
                      {formData.region}
                    </span>
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
                      className="input input-ghost w-full max-w-xs border border-accent"
                      value={formData.phone}
                      onChange={handleChange}
                      name="phone"
                      required
                      onBlur={handleChangeInputs}
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
                      placeholder="AAAA-MM-DD"
                      className="input input-ghost w-full max-w-xs border border-accent"
                      value={formData.birthDate}
                      onChange={handleChange}
                      name="birthDate"
                      required
                      onBlur={handleChangeInputs}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary w-2/4">{t("user.boton")}</button>
          </form> */}
        </div>
        <div className="flex flex-row">
          <div className="w-1/4 gap-5 flex p-5">
            <div className="containerItemLayoutUser flex flex-col gap-y-3">
              <div
                className={!menu ? "itemLayoutSelect" : "itemLayout"}
                onClick={() => {
                  setMenu(false);
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.10196 1.68745C4.98938 1.6319 1.63196 4.98932 1.68751 9.1019C1.74235 13.0461 4.95388 16.2576 8.89806 16.3124C13.0113 16.3687 16.3681 13.0113 16.3118 8.8987C16.2577 4.95381 13.0461 1.74229 9.10196 1.68745ZM13.5464 13.1923C13.5324 13.2075 13.5152 13.2194 13.4961 13.2271C13.477 13.2349 13.4564 13.2384 13.4358 13.2373C13.4152 13.2362 13.3951 13.2306 13.3769 13.2209C13.3587 13.2112 13.3429 13.1976 13.3306 13.1811C13.0161 12.7697 12.631 12.4174 12.1932 12.1408C11.2982 11.5664 10.164 11.2499 9.00001 11.2499C7.83598 11.2499 6.70184 11.5664 5.80677 12.1408C5.36903 12.4173 4.98393 12.7694 4.66946 13.1807C4.65711 13.1972 4.64127 13.2108 4.62307 13.2206C4.60488 13.2303 4.58477 13.2359 4.56417 13.2369C4.54357 13.238 4.52299 13.2345 4.50388 13.2268C4.48477 13.219 4.46761 13.2071 4.4536 13.192C3.422 12.0784 2.83764 10.6232 2.81251 9.10542C2.7552 5.68436 5.56243 2.82088 8.98489 2.81245C12.4074 2.80401 15.1875 5.58311 15.1875 8.99995C15.1887 10.5543 14.6025 12.0518 13.5464 13.1923Z"
                    fill="black"
                  />
                  <path
                    d="M9 5.0625C8.30672 5.0625 7.67988 5.3223 7.23445 5.79445C6.78902 6.2666 6.56649 6.91945 6.61676 7.62012C6.71871 9 7.78781 10.125 9 10.125C10.2122 10.125 11.2792 9 11.3832 7.62047C11.4353 6.92648 11.2145 6.27961 10.7617 5.79867C10.3145 5.32406 9.68871 5.0625 9 5.0625Z"
                    fill="black"
                  />
                </svg>
                <p className="whitespace-nowrap">Información personal</p>
              </div>
              <div
                className={menu ? "itemLayoutSelect" : "itemLayout"}
                onClick={() => {
                  setMenu(true);
                }}
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_121_2261)">
                    <path
                      d="M10.5 7.14771V4.17896C10.5 3.51591 10.2366 2.88003 9.76777 2.41119C9.29893 1.94235 8.66304 1.67896 8 1.67896C7.33696 1.67896 6.70107 1.94235 6.23223 2.41119C5.76339 2.88003 5.5 3.51591 5.5 4.17896V7.14771"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 7.14771H4.5C3.67157 7.14771 3 7.81928 3 8.64771V14.1477C3 14.9761 3.67157 15.6477 4.5 15.6477H11.5C12.3284 15.6477 13 14.9761 13 14.1477V8.64771C13 7.81928 12.3284 7.14771 11.5 7.14771Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_121_2261">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0 0.647705)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="whitespace-nowrap">Seguridad</p>
              </div>
            </div>
          </div>
          {!menu && (
            <div className="w-3/4 gap-5 flex flex-col p-5">
              <div className="w-full flex description">
                <div className="w-full flex justify-between">
                  <h2 className="font-bold">{t("user.informacionpersonal")}</h2>
                  <div
                    className="text-sky-500 cursor-pointer flex"
                    onClick={() => {
                      setEditInfo(!editInfo);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 8.75V15.9375C15 16.1427 14.9596 16.3459 14.8811 16.5354C14.8025 16.725 14.6874 16.8973 14.5424 17.0424C14.3973 17.1874 14.225 17.3025 14.0354 17.3811C13.8459 17.4596 13.6427 17.5 13.4375 17.5H4.0625C3.6481 17.5 3.25067 17.3354 2.95765 17.0424C2.66462 16.7493 2.5 16.3519 2.5 15.9375V6.5625C2.5 6.1481 2.66462 5.75067 2.95765 5.45765C3.25067 5.16462 3.6481 5 4.0625 5H10.6047"
                        stroke="#1473E6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.9665 2.08009C17.9094 2.01737 17.8402 1.96688 17.763 1.93166C17.6859 1.89644 17.6024 1.87723 17.5176 1.87518C17.4328 1.87314 17.3485 1.8883 17.2698 1.91976C17.191 1.95122 17.1195 1.99832 17.0594 2.05821L16.5762 2.53907C16.5177 2.59767 16.4848 2.67713 16.4848 2.75997C16.4848 2.84282 16.5177 2.92227 16.5762 2.98087L17.0192 3.42306C17.0482 3.45223 17.0827 3.47538 17.1207 3.49118C17.1588 3.50697 17.1995 3.5151 17.2407 3.5151C17.2818 3.5151 17.3226 3.50697 17.3606 3.49118C17.3986 3.47538 17.4331 3.45223 17.4622 3.42306L17.9333 2.95431C18.1715 2.71642 18.1938 2.32892 17.9665 2.08009ZM15.5993 3.51564L8.5477 10.5547C8.50495 10.5973 8.47387 10.6501 8.45747 10.7082L8.1313 11.6797C8.12348 11.7061 8.12293 11.734 8.1297 11.7607C8.13646 11.7873 8.15029 11.8117 8.16973 11.8311C8.18918 11.8505 8.2135 11.8644 8.24015 11.8711C8.2668 11.8779 8.29478 11.8774 8.32114 11.8695L9.29184 11.5434C9.34991 11.527 9.40278 11.4959 9.44536 11.4531L16.4844 4.40079C16.5495 4.33497 16.5861 4.24612 16.5861 4.15353C16.5861 4.06094 16.5495 3.97208 16.4844 3.90626L16.0958 3.51564C16.0298 3.44992 15.9406 3.41302 15.8475 3.41302C15.7544 3.41302 15.6652 3.44992 15.5993 3.51564Z"
                        fill="#1473E6"
                      />
                    </svg>
                    Editar
                  </div>
                </div>
              </div>
              <div className="w-full">
                <form
                  className="flex flex-col gap-5 items-center"
                  onSubmit={handleSubmit}
                >
                  <div className="w-full flex justify-between">
                    <div className="w-4/6 flex items-center">
                      <div className="w-full h-fit">
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">
                              {t("user.nombre")}
                            </span>
                          </label>
                          {editInfo ? (
                            <input
                              type="text"
                              placeholder={t("user.escriba")}
                              className="input input-ghost w-full bg-[#F4F4F4]"
                              name="names"
                              value={formData.names}
                              onChange={handleChange}
                              required
                            />
                          ) : (
                            <span
                              type="text"
                              placeholder={t("user.escriba")}
                              className="input input-ghost w-full flex items-center"
                              name="names"
                              value={formData.names}
                              onChange={handleChange}
                              onBlur={handleChangeInputs}
                              required
                            >
                              {formData.names}
                            </span>
                          )}
                        </div>
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">
                              {t("user.apellido")}
                            </span>
                          </label>
                          {editInfo ? (
                            <input
                              type="text"
                              name="lastname"
                              placeholder={t("user.escriba")}
                              className="input input-ghost w-full bg-[#F4F4F4]"
                              value={formData.lastname}
                              onChange={handleChange}
                              required
                              onBlur={handleChangeInputs}
                            />
                          ) : (
                            <span
                              type="text"
                              name="lastname"
                              placeholder={t("user.escriba")}
                              className="input input-ghost w-full flex items-center"
                              value={formData.lastname}
                              onChange={handleChange}
                              required
                              onBlur={handleChangeInputs}
                            >
                              {formData.lastname}
                            </span>
                          )}
                        </div>
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">{t("user.cel")}</span>
                          </label>
                          {editInfo ? (
                            <PhoneInput
                              defaultCountry="co"
                              value={formData.phone ? formData.phone : phone}
                              onChange={(phone) => {
                                setPhone(phone);
                              }}
                              inputClassName="!ml-1 !input !input-ghost !w-full !rounded-r-lg !bg-[#F4F4F4]"
                              inputProps={{
                                placeholder: t("user.escriba"),
                                name: "phone",
                                onBlur: handleChangeInputs,
                              }}
                              countrySelectorStyleProps={{
                                className:
                                  "!input !flex !items-center !rounded-l-lg !bg-[#F4F4F4]",
                                buttonClassName: "!bg-[#F4F4F4] !border-none",
                                buttonContentWrapperClassName: "!bg-trasparent",
                              }}
                            />
                          ) : (
                            <span
                              type="text"
                              placeholder={t("user.escriba")}
                              className="input input-ghost w-full flex items-center"
                              value={formData.phone}
                              onChange={handleChange}
                              name="phone"
                              required
                              onBlur={handleChangeInputs}
                            >
                              {formData.phone}
                            </span>
                          )}
                        </div>
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">
                              {t("user.FechaNacimiento")}
                            </span>
                          </label>
                          {editInfo ? (
                            <DateInput
                              name="birthDate"
                              valueFormat="MM/DD/YYYY"
                              onChange={handleChangeDate}
                              onBlur={handleChangeInputs}
                              value={
                                isValidDate(formData.birthDate)
                                  ? new Date(formData.birthDate)
                                  : ""
                              }
                              variant="datepickerInput"
                              className="datepickerInput"
                            />
                          ) : (
                            formData.birthDate && (
                              <span className="input input-ghost w-full flex items-center">
                                {isValidDate(formData.birthDate)
                                  ? new Date(
                                      formData.birthDate
                                    ).toLocaleDateString("en-US")
                                  : ""}
                              </span>
                            )
                          )}
                        </div>
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Idioma</span>
                          </label>
                          {editInfo ? (
                            <select
                              className="select w-full bg-[#F4F4F4]"
                              onChange={(e) => {
                                handleChange(e);
                                i18n.changeLanguage(e.target.value);
                              }}
                              value={i18n.resolvedLanguage}
                              name="languageId"
                            >
                              <option value="es">Español</option>
                              <option value="por">Português</option>
                            </select>
                          ) : (
                            <span className="input input-ghost w-full flex items-center">
                              {formData.languageId === 1
                                ? "Portugués"
                                : "Español"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {editInfo && (
                    <div className="w-full flex flex-row gap-x-4">
                      <button
                        className="btn bg-gray-300 hover:bg-black border-none w-1/4"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditInfo(!editInfo);
                        }}
                      >
                        Cancelar
                      </button>
                      <button className="btn btn-info hover:bg-black w-1/4">
                        Guardar cambios
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
          {menu && (
            <div className="w-3/4 gap-5 flex flex-col p-5">
              <div className="w-full flex description">
                <div className="w-full flex justify-between">
                  <h2 className="font-bold">{t("dashboard.cambiarpass")}</h2>
                </div>
              </div>
              <div className="w-4/6 flex items-center">
                <ModalPassword setOpened={setOpened} />
              </div>
            </div>
          )}
        </div>
      </ContainerContent>
    </>
  );
};

export default user;
