import { DateInput } from "@mantine/dates";
import axios from "axios";
import { useDataUser } from "functions/SetDataUser";
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

    const arrayForm = data.slice(0, 11).map((i) => {
      if (i.value?.length === 0) {
        // console.log(i.id);
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
      onClose(false);
      updateUser(objPush);
    }
  };

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
          <div class="form-control">
            <label class="label">
              <span class="label-text">{t("modalUpdate.firstName")} *</span>
            </label>
            <input
              type="text"
              placeholder={t("user.escriba")}
              className="input input-ghost w-full bg-[#F4F4F4]"
              name="first_name"
              autoCapitalize
              id={t("modalUpdate.firstName")}
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">{t("modalUpdate.middleName")}</span>
            </label>
            <input
              type="text"
              placeholder={t("user.escriba")}
              className="input input-ghost w-full bg-[#F4F4F4]"
              name="middlename"
              autoCapitalize
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">{t("modalUpdate.lastName")} *</span>
            </label>
            <input
              type="text"
              placeholder={t("user.escriba")}
              className="input input-ghost w-full bg-[#F4F4F4]"
              name="last_name"
              autoCapitalize
              id={t("modalUpdate.lastName")}
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">
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
            />
          </div>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">{t("modalUpdate.document")}</span>
          </label>
          <div className="flex justify-between">
            <select
              className="input input-ghost w-fit bg-[#F4F4F4]"
              name="documenttype"
              id="Tipo de Documento"
            >
              <option value="" selected disabled hidden></option>
              <option value={"CC"}>CC</option>
              <option value={"CEDULA"}>CÉDULA</option>
              <option value={"CEX"}>CEX</option>
              <option value={"CI"}>CI</option>
              <option value={"CIC"}>CIC</option>
              <option value={"CPF"}>CPF</option>
              <option value={"CURP"}>CURP</option>
              <option value={"DNI"}>DNI</option>
              <option value={"DNIC"}>DNIC</option>
              <option value={"DPI"}>DPI</option>
              <option value={"DI"}>DI</option>
              <option value={"DUI"}>DUI</option>
              <option value={"INE"}>INE</option>
              <option value={"RG"}>RG</option>
              <option value={"RFC"}>RFC</option>
              <option value={"RUT"}>RUT</option>
              <option value={"RUN"}>RUN</option>
              <option value={"StateID"}>State ID</option>
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
          ></input>
          {/* <DateInput
            name="birthDate"
            valueFormat="MM/DD/YYYY"
            // onChange={handleChangeDate}
            // onBlur={handleChangeInputs}
            // value={
            //   isValidDate(formData.birthDate)
            //     ? new Date(formData.birthDate)
            //     : ""
            // }
            variant="datepickerInput"
            className="datepickerInput"
       
          /> */}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t("modalUpdate.lenguaje")}</span>
          </label>
          <select
            className="select w-full bg-[#F4F4F4]"
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
            }}
            defaultValue={i18n.resolvedLanguage}
            name="languageId"
            id={t("modalUpdate.lenguaje")}
          >
            <option value="es">Español</option>
            <option value="por">Português</option>
            {/* <option value="en">Ingles</option> */}
          </select>
        </div>
        <button class="btn btn-info hover:bg-black w-full">
          {t("modalUpdate.updateData")}
        </button>
      </form>
    </div>
  );
};

export default ModalUpdateData;
