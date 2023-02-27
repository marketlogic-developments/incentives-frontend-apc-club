import { Modal } from "@mantine/core";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../../components/containerContent";
import { policyAndPassword } from "../../store/reducers/users.reducer";

const user = () => {
  const user = useSelector((state) => state.user.user.user);
  const userAll = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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
      name: user?.person[0]?.names,
      lastname: user?.person[0]?.lastName,
      email: user?.email,
      role: user?.roleId,
      position: user?.person[0]?.position,
      region: user?.region,
      imgProfile: user?.profilePhotoPath,
      birthDate: user?.person[0]?.birthDate,
      phone: user?.person[0]?.phoneNumber,
    });
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

    Cookies.remove("userDt");

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
        Cookies.set(
          "userDt",
          JSON.stringify({
            ...userAll,
            user: {
              ...res.data,
              person: [{ ...user.person[0], ...res.data.person[0] }],
            },
          }),
          { expires: 365 }
        );

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
            <h1 className="font-bold text-3xl">Ajustes de perfil</h1>
          </div>
          <form
            className="flex flex-col gap-5 items-center"
            onSubmit={handleSubmit}
          >
            <div className="p-5">
              <h2 className="font-bold">Información General</h2>
            </div>
            <div className="w-full flex justify-between">
              <div className="containerProgress">
                <div
                  className="circular-progress"
                  style={{
                    background: `conic-gradient(#d75050 ${
                      100 * 3.6
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
                        <p className="title-imgPhoto">90%</p>
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
                      <span className="label-text">Nombre</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-ghost w-full max-w-xs"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Apellido</span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Type here"
                      className="input input-ghost w-full max-w-xs"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Correo Electrónico</span>
                    </label>
                    <span
                      type="text"
                      placeholder="Type here"
                      className="input input-ghost w-full max-w-xs p-3"
                    >
                      {formData.email}
                    </span>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Rol</span>
                    </label>
                    <span
                      type="text"
                      placeholder="Type here"
                      className="input input-ghost w-full max-w-xs p-3"
                    >
                      {formData.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="p-5">
                <h2 className="font-bold">Información Personal</h2>
              </div>
              <div className="w-full flex items-center">
                <div className="w-full grid grid-cols-3 h-fit gap-y-5">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Región</span>
                    </label>
                    <input
                      type="text"
                      name="region"
                      placeholder="Type here"
                      className="input input-ghost w-full max-w-xs"
                      value={formData.region}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Posición</span>
                    </label>
                    <span
                      type="text"
                      placeholder="Type here"
                      className="input input-ghost w-full max-w-xs p-3"
                    >
                      {formData.position}
                    </span>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Teléfono</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-ghost w-full max-w-xs"
                      value={formData.phone}
                      onChange={handleChange}
                      name="phone"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Fecha de nacimiento</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-ghost w-full max-w-xs"
                      value={formData.birthDate}
                      onChange={handleChange}
                      name="birthDate"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary w-2/4">Actualizar Datos</button>
          </form>
        </div>
      </ContainerContent>
    </>
  );
};

export default user;
