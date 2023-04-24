import React from "react";
import { Autocomplete, Modal } from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ImportExcel from "./ImportExcel";
import ImportUsers from "./importaciones/ImportUsers";

const ButtonParticipants = () => {
  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(0);
  const token = useSelector((state) => state.user.token);
  const [pos, setPos] = useState([]);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    region: "",
    date: "",
    phone: "",
    posId: "",
  });
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    axios
      .get(`${process.env.BACKURL}/pos`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPos(
          res.data.map(({ id, description }) => ({
            value: description,
            id: id,
          }))
        );
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios.post(
    //   `${process.env.BACKURL}/pos`,
    //   {
    //     name: `${form.name} ${form.lastName}`,
    //     email: form.email,
    //     password: form.password,
    //     roleId: Number(form.role.split("-")[0]),
    //     policy: false,
    //     passwordReset: false,
    //     region: form.region,
    //     cpf: "N/A",
    //
    //       names: form.name,
    //       lastName: form.lastName,
    //       birthDate: form.date,
    //       position: form.role.split("-")[1],
    //       phoneNumber: form.phone,
    //       operationStatusId: 4,
    //       academicDegreeId: 1,
    //       languageId: form.region === "BRAZIL" ? 1 : 2,
    //
    //     employeePos: {
    //       posId: form.posId,
    //     },
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    console.log({
      name: `${form.name} ${form.lastName}`,
      email: form.email,
      password: form.password,
      roleId: Number(form.role.split("-")[0]),
      policy: false,
      passwordReset: false,
      region: form.region,
      cpf: "N/A",
      names: form.name,
      lastName: form.lastName,
      birthDate: form.date,
      position: form.role.split("-")[1],
      phoneNumber: form.phone,
      operationStatusId: 4,
      academicDegreeId: 1,
      languageId: form.region === "BRAZIL" ? 1 : 2,
    });

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
      icon: "success",
      title: "Usuario agregado con éxito",
    });
  };

  const handleChange = (e) => {
    return setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <div>
          <div className="flex flex-col items-center my-5">
            <div className="w-full flex flex-col items-center">
              <h3 className="text-lg font-bold text-red-500">
                Información del usuario
              </h3>
              <form
                className="grid grid-cols-2 gap-5 w-11/12"
                onSubmit={handleSubmit}
              >
                <label className="inputCreateUser">
                  <span className="label-text">Nombre</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    name="name"
                    onChange={handleChange}
                  />
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">Apellido</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    name="lastName"
                    onChange={handleChange}
                  />
                </label>

                <label className="inputCreateUser">
                  <span className="label-text">Correo Electrónico</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    name="email"
                    onChange={handleChange}
                  />
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">Contraseña</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    name="password"
                    onChange={handleChange}
                  />
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">Rol</span>
                  <select
                    className="select select-bordered w-full"
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="">Seleccione el rol</option>
                    <option value="1-SuperAdmin">SuperAdmin</option>
                    <option value="2-Partner Principal">
                      Partner Principal
                    </option>
                    <option value="3-Partner Admin">Partner Admin</option>
                    <option value="5-Sales Rep">Sales Rep</option>
                  </select>
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">Región</span>
                  <select
                    className="select select-bordered w-full"
                    name="region"
                    onChange={handleChange}
                  >
                    <option value="">Región</option>
                    <option value="NOLA">NOLA</option>
                    <option value="SOLA">SOLA</option>
                    <option value="MÉXICO">MÉXICO</option>
                    <option value="BRAZIL">BRAZIL</option>
                  </select>
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">Fecha de Nacimiento</span>
                  <input
                    type="text"
                    placeholder="AAAA-MM-DD"
                    className="input input-bordered w-full"
                    name="date"
                    onChange={handleChange}
                  />
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">Número de Teléfono</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    name="phone"
                    onChange={handleChange}
                  />
                </label>
                <label className="inputCreateUser col-span-2 w-full">
                  <span className="label-text">Canal</span>
                  <Autocomplete
                    size="md"
                    dropdownPosition="flip"
                    placeholder="Selecciona el Canal"
                    data={pos}
                    name="posId"
                    onItemSubmit={({ id }) =>
                      setForm({
                        ...form,
                        posId: id,
                      })
                    }
                  />
                </label>

                <button
                  type="submit"
                  className="btn btn-primary w-max col-span-2 justify-self-center"
                >
                  Enviar solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    if (modal === 1) {
      return <ImportExcel type={5} />;
    }

    if (modal === 2) {
      return <ImportUsers />;
    }
  }, [modal, pos, form]);

  // const isMobile = window.innerWidth <= 768;
  // const modalSize = isMobile ? "100%" : "60%";

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        centered
        size={"70%"}
      >
        <div className="grid grid-cols-1 place-items-center text-center border-b">
          {/* <p
            className={`h-full w-full p-3 cursor-pointer ${
              modal === 0 && "border-b-2 border-[#eb1000] text-[#eb1000]"
            }`}
            onClick={() => setModal(0)}
          >
            Agregar Participantes
          </p> */}
          <p
            className={`h-full w-full p-3 cursor-pointer ${
              modal === 1 && "border-b-2 border-[#eb1000] text-[#eb1000]"
            }`}
            onClick={() => setModal(1)}
          >
            Importar Participantes
          </p>
          {/* <p
            className={`h-full w-full p-3 cursor-pointer ${
              modal === 2 && "border-b-2 border-[#eb1000] text-[#eb1000]"
            }`}
            onClick={() => setModal(2)}
          >
            Actualizar Usuarios
          </p> */}
        </div>
        {typeModal}
      </Modal>
      <button
        onClick={() => {
          setOpened(true);
        }}
        className="btn bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-max justify-self-end"
      >
        {t("tabla.agregarP")}
      </button>
    </>
  );
};

export default ButtonParticipants;
