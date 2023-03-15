import { Autocomplete, Modal } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const AgregarParticipante = () => {
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
    //     person: {
    //       names: form.name,
    //       lastName: form.lastName,
    //       birthDate: form.date,
    //       position: form.role.split("-")[1],
    //       phoneNumber: form.phone,
    //       operationStatusId: 4,
    //       academicDegreeId: 1,
    //       languageId: form.region === "BRAZIL" ? 1 : 2,
    //     },
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

    return console.log({
      name: `${form.name} ${form.lastName}`,
      email: form.email,
      password: form.password,
      roleId: Number(form.role.split("-")[0]),
      policy: false,
      passwordReset: false,
      region: form.region,
      cpf: "N/A",
      person: {
        names: form.name,
        lastName: form.lastName,
        birthDate: form.date,
        position: form.role.split("-")[1],
        phoneNumber: form.phone,
        operationStatusId: 4,
        academicDegreeId: 1,
        languageId: form.region === "BRAZIL" ? 1 : 2,
      },
      employeePos: {
        posId: form.posId,
      },
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
          <div>
            <h3 className="text-lg font-bold text-red-500">
              Agregar Participante
            </h3>
            <p className="py-4">
              Indica la información del usuario que vas a registrar
            </p>
            <div className="w-full flex flex-col items-center">
              <h3 className="text-lg font-bold text-red-500">
                Información de la Cuenta
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
                    placeholder="AAAA/MM/DD"
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

    if (modal === 2) {
      return (
        <div>
          <div>
            <h3 className="text-lg font-bold text-red-500">Usuario agregado</h3>
            <p className="py-4">Usuario agregado con exito.</p>
          </div>
        </div>
      );
    }
  }, [modal, pos, form]);

  const isMobile = window.innerWidth <= 768;
  const modalSize = isMobile ? "100%" : "60%";

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        centered
        size={modalSize}
      >
        {typeModal}
      </Modal>
      <button
        onClick={() => {
          setOpened(true);
        }}
        className="btn bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-max"
      >
        {t("tabla.agregarP")}
      </button>
    </>
  );
};

export default AgregarParticipante;
