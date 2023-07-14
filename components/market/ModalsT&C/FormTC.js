import React from "react";
import PersonForm from "./ilustrations/PersonForm";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { alert } from "../../alert/Alert";

const FormTC = ({ opened, setContent, setModal }) => {
  const user = useSelector((state) => state.user.user);
  const [cc, setCC] = useState("");
  const [name, setName] = useState("");
  const [direction, setDirection] = useState("");

  const handleSubmit = () => {
    const channel =
      user.distributionChannel === null
        ? user.company.name
        : user.distributionChannel.nameDist;

    const form = new FormData();
    form.append("Nombre Completo", name);
    form.append("Email", user.email);
    form.append("Cédula", cc);
    form.append("Canal", channel);
    form.append("Direccion", direction);
    form.append("Rol", user.position);

    // axios.patch("", { cc: cc }).then(() => {
    //   if (user.roleId !== 5) {
    //     axios.patch("", { direction: direction });
    //   }
    // });

    axios
      .post("https://hooks.zapier.com/hooks/catch/666990/3mrvf2h/", form)
      .then(() =>
        alert({
          icon: "success",
          position: "top",
          title: "Información actualizada",
        })
      )
      .catch((e) => console.log(e));

    opened(false);
    setContent(0);
    setModal(0);
  };

  console.log(user);
  return (
    <div className="flex flex-col gap-3 items-center w-full h-full">
      <div className="flex flex-col gap-6 items-center w-full my-6">
        <div>
          <PersonForm />
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="!text-2xl font-bold text-center">
            Actualización de información
          </p>
          <p className="!text-xs text-center">
            Según la actualización de términos y condiciones que firmaste,
            necesitamos que actualices tu información.
          </p>
        </div>
        <div className="w-full flex flex-col gap-6 ">
          <div className="mx-auto flex flex-col gap-3 w-[80%]">
            <legend className="!text-sm">Nombre Completo</legend>
            <input
              className="input bg-[#F4F4F4] w-full"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="mx-auto flex flex-col gap-3 w-[80%]">
            <legend className="!text-sm">Cédula de Ciudadanía</legend>
            <input
              className="input bg-[#F4F4F4] w-full"
              placeholder="0000000000"
              minLength={10}
              maxLength={10}
              value={cc}
              onChange={(e) => setCC(e.target.value)}
            ></input>
          </div>
          {user.roleId !== 5 && (
            <div className="mx-auto flex flex-col gap-3 w-[80%]">
              <legend className="!text-sm">Dirección Empresarial</legend>
              <input
                className="input bg-[#F4F4F4] w-full"
                placeholder="Indica dirección de empresa"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              ></input>
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto flex justify-end w-full">
        <button
          className="btn btn-info btn-sm mt-auto w-1/3"
          onClick={handleSubmit}
        >
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default FormTC;
