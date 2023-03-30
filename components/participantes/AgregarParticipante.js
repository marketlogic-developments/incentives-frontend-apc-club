import { Autocomplete, Modal } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const AgregarParticipante = ({ setParticipantes, participantes }) => {
  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(0);
  const token = useSelector((state) => state.user.token);
  const company = useSelector((state) => state.user.company);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    region: "",
    date: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const handleSubmit = (e) => {
    e.preventDefault();

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

    axios
      .post(
        `${process.env.BACKURL}/users`,
        {
          name: `${form.name} ${form.lastName}`,
          email: form.email,
          password: form.password,
          roleId: Number(form.role.split("-")[0]),
          policy: false,
          passwordReset: false,
          region: form.region,
          cpf: "N/A",
          companyId: company.id,
          names: form.name,
          lastName: form.lastName,
          birthDate: form.date,
          position: form.role.split("-")[1],
          phoneNumber: form.phone,
          operationStatusId: 4,
          academicDegreeId: 1,
          languageId: form.region === "BRAZIL" ? 1 : 2,
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
        const newPerson = res.data;
        setParticipantes([newPerson, ...participantes]);

        return Toast.fire({
          icon: "success",
          title: "¡El participante ha sido creado exitosamente!",
        });
      })
      .catch((err) => {
        if (err.response.data.errors[0].message === "email must be unique") {
          return Toast.fire({
            icon: "error",
            title: "Este email ya está en uso, intenta uno diferente",
          });
        }

        return Toast.fire({
          icon: "error",
          title: "Ha ocurrido un error, inténtalo más tarde",
        });
      });

    return console.log();
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
            <div className="w-full flex flex-col items-center">
              <h3 className="text-lg font-bold text-red-500">
                Agregar Participante
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
                    <option value="2-Partner Principal">
                      Partner Principal
                    </option>
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
  }, [modal, form]);

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
