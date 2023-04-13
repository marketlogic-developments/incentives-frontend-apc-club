import { Modal } from "@mantine/core";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../../components/containerContent";
import { policyAndPassword } from "../../store/reducers/users.reducer";
import ModalPassword from "../../components/user/modalPassword";

const user = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const userAll = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [nInputs, setNInputs] = useState(0);
  const [modal, setModal] = useState(0);
  const [image, setImage] = useState({});
  const [viewimage, setviewImage] = useState("");
  const [t, i18n] = useTranslation("global");

  const [formData, setFormData] = useState({
    names: "",
    lastname: "",
    email: "",
    role: "",
    position: "",
    region: "",
    imgProfile: "",
    birthDate: "",
    phone: "",
  });

  useEffect(() => {
    setFormData({
      names: user?.names,
      lastname: user?.lastName,
      email: user?.email,
      role: user?.roleId,
      position: user?.position,
      region: user?.region,
      imgProfile: user?.profilePhotoPath,
      birthDate: user?.birthDate,
      phone: user?.phoneNumber,
    });

    const num = Object.values({
      name: user.names,
      lastname: user.lastName,
      imgProfile: user.profilePhotoPath,
      birthDate: user.birthDate,
      phone: user.phoneNumber,
    }).filter((e) => e !== "" && e !== null).length;

    setNInputs(parseInt((num * 100) / 5));
  }, [user]);

  const handleChangeInputs = () => {
    const num = Object.values({
      name: formData.names,
      lastname: formData.lastname,
      imgProfile: formData.imgProfile,
      birthDate: formData.birthDate,
      phone: formData.phone,
    }).filter((e) => e !== "" && e !== null).length;

    setNInputs(parseInt((num * 100) / 5));
  };

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

    const jsonData = () => {
      return {
        names: formData.name,
        lastName: formData.lastname,
        birthDate: formData.birthDate,
        phoneNumber: formData.phone,
        region: formData.region,
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
        setModal(0);
        setOpened(true);
      });
  };

  const handleImgProfile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (e) => {
      const dataURL = e.target.result;
      setviewImage({ path: dataURL });
    };

    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleSubmitImgProfile = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", "ADOBEAPC");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        form
      )
      .then((res) => {
        axios
          .patch(
            `${process.env.BACKURL}/users/${user.id}`,
            { profilePhotoPath: res.data.url },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res2) => {
            setFormData({
              ...formData,
              imgProfile: res.data.url,
            });
          });
      })
      .catch((error) => console.log(error));
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <div>
          <p>¡Tus datos fueron actualizados!</p>
        </div>
      );
    }
    if (modal === 1) {
      return (
        <div className="flex flex-col w-full justify-center items-center gap-10">
          <div className="w-1/5">
            <figure className="imgPhoto border-red-600 border rounded-full">
              <img
                src={
                  viewimage === ""
                    ? formData.imgProfile === null || formData.imgProfile === ""
                      ? "/assets/Icons/user.webp"
                      : formData.imgProfile
                    : viewimage.path
                }
              />
            </figure>
          </div>
          <div className="max-w-xl">
            <label className="flex flex-col justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex flex-col jusitfy-center items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600 text-center">
                  Arrastra tu foto aquí o selecciona una de tu equipo
                </span>
              </span>
              <input
                type="file"
                name="file_upload"
                className="hidden"
                onChange={handleImgProfile}
              />
            </label>
          </div>
          <button className="btn btn-primary" onClick={handleSubmitImgProfile}>
            Subir mi nueva foto
          </button>
        </div>
      );
    }

    if (modal === 2) {
      return <ModalPassword setOpened={setOpened} />;
    }
  }, [modal, opened, image, viewimage]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setviewImage("");
          setOpened(false);
        }}
        centered
        size={"50%"}
      >
        {typeModal}
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
                    "--progress": `${nInputs * 3.6}deg`,
                  }}
                >
                  <div className="flip-card-imgPhoto">
                    <div className="flip-card-inner-imgPhoto">
                      <div className="flip-card-front-imgPhoto">
                        <figure className="imgPhoto">
                          <img
                            src={
                              formData.imgProfile || "/assets/Icons/user.webp"
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
                  Cambiar foto de perfil
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
                      Cambiar contraseña
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
          </form>
        </div>
      </ContainerContent>
    </>
  );
};

export default user;
