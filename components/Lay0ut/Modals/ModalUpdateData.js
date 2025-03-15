import { DateInput } from "@mantine/dates";
import { Checkbox } from '@mantine/core';
import axios from "axios";
import { useDataUser } from "functions/SetDataUser";
import { NotiSwal } from "notifications/notifications";
import React from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
// import { policyAndPassword } from "../../../store/reducers/currentUser.reducer";

const ModalUpdateData = ({ onClose }) => {
    const [t, i18n] = useTranslation("global");
    const { user, token } = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();
    const { updateUser } = useDataUser();
    const inputsRequired = [
        "birthDate",
        "documentinfo",
        "documenttype",
        "first_name",
        "languageId",
        "last_name",
        "phoneNumber",
        "secondlastname",
    ];

    const submitForm = (e) => {
        e.preventDefault();

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

        const data = Object.values(e.target);

        const objPush = {};

        const arrInputsEmpty = [];

        // Recorre los valores del formulario
        const arrayForm = data.slice(0, 11).map((i) => {
            if (i.name === "accept_whatsapp_contact") {
                return (objPush[i.name] = i.checked || false); // Asegura que sea booleano
            }

            if (i.value?.length === 0) {
                inputsRequired.includes(i.name) && arrInputsEmpty.push(i.id);
                return (objPush[i.name] = null);
            }
            
            if (i.name === "languageId") {
                return i.value === "es" ? (objPush[i.name] = 2) : (objPush[i.name] = 1);
            }

            return (objPush[i.name] = i.value);
        });

        delete objPush[""];

        if (arrInputsEmpty.length !== 0) {
            return Toast.fire({
                icon: "error",
                title: `Faltan los campos: ${arrInputsEmpty.map((i) => i)}`,
                background: "#000000",
                color: "#fff",
                customClass: {
                    content: "sw2Custom",
                },
            });
        } else {
            updateUser(objPush)
                .then(() => {
                    onClose?.(false);
                    NotiSwal({ text: String(t("user.updateData")) });
                })
                .catch(() => NotiSwal({ text: String(t("tabla.notiError")) }));
        }
    };

    const today = new Date();
    const minAdultAge = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );
    const maxDate = minAdultAge.toISOString().split("T")[0]; // Formato YYYY-MM-DD

    return (
        <div className="w-full p-6 flex flex-col items-center gap-6 justify-center lg:h-screen">
            <h2 className="text-2xl font-bold text-center">
                {t("modalUpdate.updateYourData")}
            </h2>
            <form
                className="flex flex-col gap-4 lg:w-1/2 w-full"
                onSubmit={submitForm}
            >
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t("modalUpdate.firstName")} *</span>
                        </label>
                        <input
                            type="text"
                            placeholder={t("user.escriba")}
                            className="input input-ghost w-full bg-[#F4F4F4]"
                            name="first_name"
                            autoCapitalize
                            minLength={3}
                            id={t("modalUpdate.firstName")}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">{t("modalUpdate.middleName")}</span>
                        </label>
                        <input
                            type="text"
                            placeholder={t("user.escriba")}
                            className="input input-ghost w-full bg-[#F4F4F4]"
                            name="middlename"
                            autoCapitalize
                            minLength={3}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">{t("modalUpdate.lastName")} *</span>
                        </label>
                        <input
                            type="text"
                            placeholder={t("user.escriba")}
                            className="input input-ghost w-full bg-[#F4F4F4]"
                            name="last_name"
                            autoCapitalize
                            id={t("modalUpdate.lastName")}
                            minLength={3}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                {t("modalUpdate.secondLastName")} *
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder={t("user.escriba")}
                            className="input input-ghost w-full bg-[#F4F4F4]"
                            name="secondlastname"
                            autoCapitalize
                            id={t("modalUpdate.secondLastName")}
                            minLength={3}
                        />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">{t("modalUpdate.document")}</span>
                    </label>
                    <div className="flex justify-between">
                        <select
                            className="input input-ghost w-fit bg-[#F4F4F4]"
                            name="documenttype"
                            id="Tipo de Documento"
                        >
                            <option value="" hidden>
                                Selecciona un documento
                            </option>
                            <option value="DOCUMENTO_NACIONAL_DE_IDENTIDAD">DNI</option>
                            <option value="CEDULA_DE_IDENTIDAD">Cédula</option>
                            <option value="PASAPORTE">Pasaporte</option>
                            <option value="LICENCIA_DE_CONDUCIR">Licencia</option>
                            <option value="TARJETA_DE_RESIDENCIA">Residencia</option>
                            <option value="CERTIFICADO_DE_NACIMIENTO">Cert. Nac.</option>
                            <option value="IDENTIFICACION_MILITAR">ID Militar</option>
                            <option value="CARNET_ELECTORAL">Carnet Elec.</option>
                            <option value="TARJETA_DE_IDENTIDAD_PARA_MENORES">ID Menor</option>
                            <option value="NUMERO_DE_SEGURO_SOCIAL">NSS</option>

                            {/* América Latina */}
                            <option value="CURP">CURP</option>
                            <option value="CPF">CPF</option>
                            <option value="RUT">RUT</option>
                            <option value="CEDULA_DE_EXTRANJERIA">Cédula Ext.</option>

                            {/* Europa */}
                            <option value="TARJETA_SANITARIA_EUROPEA">Tarj. Sanit.</option>
                            <option value="NUMERO_DE_IDENTIFICACION_DE_EXTRANJEROS">NIE</option>
                            <option value="CARNET_DE_FAMILIA_NUMEROSA">Carnet Fam.</option>

                            {/* Asia y Oceanía */}
                            <option value="AADHAAR">Aadhaar</option>
                            <option value="MYKAD">MyKad</option>
                            <option value="MEDICARE_CARD">Medicare</option>

                            {/* África */}
                            <option value="SOUTH_AFRICAN_ID">SA ID</option>
                            <option value="CEDULA_DE_IDENTIDAD_ANGOLA">Cédula Ang.</option>

                            {/* Documentos temporales */}
                            <option value="PERMISO_DE_REFUGIADO">Perm. Ref.</option>
                            <option value="CARNET_PROVISIONAL_DE_ESTANCIA">Carnet Prov.</option>
                            <option value="CERTIFICADO_DE_IDENTIDAD">Cert. ID</option>
                            <option value="VISA_O_PERMISO_DE_ENTRADA">Visa/Entrada</option>
                        </select>
                        <input
                            type="text"
                            placeholder={t("user.escriba")}
                            className="input input-ghost w-[88.5%] bg-[#F4F4F4]"
                            name="documentinfo"
                            minLength={6}
                            id="Número de Documento"
                        />
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">{t("user.cel")}</span>
                    </label>
                    <PhoneInput
                        inputClassName="!ml-1 !input !input-ghost !w-full !rounded-r-lg !bg-[#F4F4F4]"
                        inputProps={{
                            placeholder: t("user.escriba"),
                            name: "phoneNumber",
                            onBlur: console.log("aaa"),
                            id: t("user.cel"),
                            required: true,
                            minLength: 7,
                        }}
                        countrySelectorStyleProps={{
                            className:
                                "!input !flex !items-center !rounded-l-lg !bg-[#F4F4F4]",
                            buttonClassName: "!bg-[#F4F4F4] !border-none",
                            buttonContentWrapperClassName: "!bg-trasparent",
                        }}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">{t("user.FechaNacimiento")}</span>
                    </label>
                    <input
                        type="date"
                        className="!ml-1 !input !input-ghost !w-full !rounded-r-lg !bg-[#F4F4F4]"
                        name="birthDate"
                        id={t("user.FechaNacimiento")}
                        max={maxDate}
                    ></input>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">{t("modalUpdate.lenguaje")}</span>
                    </label>
                    <select
                        className="select w-full bg-[#F4F4F4]"
                        onChange={(e) => {
                            i18n.changeLanguage(
                                e.target.value === "6109b0bf-cb67-4b99-833f-8d9a485d580e"
                                    ? "por"
                                    : "es"
                            );
                        }}
                        defaultValue={i18n.resolvedLanguage}
                        name="languageId"
                        id={t("modalUpdate.lenguaje")}
                    >
                        <option value="d179ffc3-5b95-4b2b-bbd6-6c994c601da5">
                            Español
                        </option>
                        <option value="6109b0bf-cb67-4b99-833f-8d9a485d580e">
                            Português
                        </option>
                        {/* <option value="en">Ingles</option> */}
                    </select>
                </div>
                <Checkbox
                    className="mt-4 mb-4"
                    name="accept_whatsapp_contact"
                    label={t("modalUpdate.acceptWhatsAppContact")}
                    onChange={(event) => {
                        setData({
                            ...data,
                            accept_whatsapp_contact: event.currentTarget.checked,
                        });
                    }}
                />
                <button className="btn btn-info hover:bg-black w-full">
                    {t("modalUpdate.updateData")}
                </button>
            </form>
        </div>
    );
};

export default ModalUpdateData;
