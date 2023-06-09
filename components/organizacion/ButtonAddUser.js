import { Modal } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ButtonAddUser = () => {
  const [opened, setOpened] = useState(false);
  const [t, i18n] = useTranslation("global");
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    region: "",
    country: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    function objectToFormData(obj) {
      const formData = new FormData();
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          formData.append(key, obj[key]);
        }
      }
      return formData;
    }

    const objAxios = {
      name: `${form.name} ${form.lastName}`,
      email: form.email,
      password: form.password,
      roleId: Number(form.role.split("-")[0]),
      policy: false,
      passwordReset: false,
      region: form.region,
      cpf: "N/A",
      companyId: company.id,
      countryId: form.country,
      names: form.name,
      lastName: form.lastName,
      position: form.role.split("-")[1],
      phoneNumber: form.phone,
      operationStatusId: 4,
      academicDegreeId: 1,
      languageId: form.region === "BRAZIL" ? 1 : 2,
    };

    const sendObj =
      user.companyId === null
        ? {
            ...objAxios,
            distributionChannelId: user.distributionChannel.soldToParty,
            companyId: null,
          }
        : {
            ...objAxios,
            companyId: user.company.resellerMasterId,
            distributionChannelId: null,
          };

    axios
      .post(
        `https://hooks.zapier.com/hooks/catch/666990/3ut1c6c/`,
        objectToFormData(sendObj)
      )
      .then((res) => {
        return Swal.fire({
          icon: "success",
          title: `${t("participantes.solSend")}`,
          text: `${t("participantes.solRes")}`,
          confirmButtonColor: "#eb1000",
          footer: `<p class="text-center">${t(
            "participantes.contact"
          )} <a href='mailto:info@adobepcclub.com' class="text-[#eb1000] font-bold text-center">info@adobepcclub.com</a></p>`,
        });
      })
      .catch((err) => {
        return Toast.fire({
          icon: "error",
          title: t("tabla.notiError"),
        });
      });

    return;
  };

  const handleChange = (e) => {
    return setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Modal
        className="modal100"
        onClose={() => setOpened(false)}
        opened={opened}
        size={"100%"}
      >
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 items-center">
              <p className="!text-2xl font-bold">
                Solicitud para creación de usuario
              </p>
              <p className="!text-sm ">
                Agrega personas y crea un equipo de trabajo.
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </Modal>
      <button className="btn btn-primary" onClick={() => setOpened(true)}>
        Agregar Usuario
      </button>
    </>
  );
};

export default ButtonAddUser;
