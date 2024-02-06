import { DateInput } from "@mantine/dates";
import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { policyAndPassword } from "../../../store/reducers/users.reducer";

const ModalUpdateData = ({ onClose }) => {
  const [t, i18n] = useTranslation("global");
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();

    const data = Object.values(e.target);

    const objPush = { user_update_data: true };

    const arrayForm = data.slice(0, 12).map((i) => {
      if (i.value.length === 0) {
        return (objPush[i.name] = null);
      }
      if (i.name === "languageId") {
        return i.value === "es" ? (objPush[i.name] = 2) : (objPush[i.name] = 1);
      }

      return (objPush[i.name] = i.value);
    });

    delete objPush[""];

    console.log(objPush);

    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
        objPush,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(policyAndPassword(res.data));
        onClose(false);

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
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="w-full p-6 flex flex-col items-center gap-6 justify-center lg:h-screen">
      <h2 className="text-2xl font-bold text-center">Actualiza tus datos</h2>
      <form
        className="flex flex-col gap-4 lg:w-1/2 w-full"
        onSubmit={submitForm}
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Primer Nombre *</span>
            </label>
            <input
              type="text"
              placeholder="Escriba aquí"
              className="input input-ghost w-full bg-[#F4F4F4]"
              name="first_name"
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Segundo Nombre</span>
            </label>
            <input
              type="text"
              placeholder="Escriba aquí"
              className="input input-ghost w-full bg-[#F4F4F4]"
              name="middlename"
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Primer Apellido *</span>
            </label>
            <input
              type="text"
              placeholder="Escriba aquí"
              className="input input-ghost w-full bg-[#F4F4F4]"
              name="last_name"
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Segundo Apellido *</span>
            </label>
            <input
              type="text"
              placeholder="Escriba aquí"
              className="input input-ghost w-full bg-[#F4F4F4]"
              name="secondlastname"
            />
          </div>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Documento</span>
          </label>
          <div className="flex justify-between">
            <select
              className="input input-ghost w-fit bg-[#F4F4F4]"
              name="documenttype"
            >
              <option value="" selected disabled hidden></option>
              <option value={"CC"}>CC</option>
              <option value={"CEX"}>CEX</option>
              <option value={"CPF"}>CPF</option>
              <option value={"RUT"}>RUT</option>
            </select>
            <input
              type="text"
              placeholder="Escriba aquí"
              className="input input-ghost w-[88.5%] bg-[#F4F4F4]"
              name="documentinfo"
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t("user.cel")}</span>
          </label>
          <PhoneInput
            defaultCountry="co"
            inputClassName="!ml-1 !input !input-ghost !w-full !rounded-r-lg !bg-[#F4F4F4]"
            inputProps={{
              placeholder: t("user.escriba"),
              name: "phoneNumber",
              onBlur: console.log("aaa"),
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
          <DateInput
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
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Idioma</span>
          </label>
          <select
            className="select w-full bg-[#F4F4F4]"
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
            }}
            defaultValue={i18n.resolvedLanguage}
            name="languageId"
          >
            <option value="es">Español</option>
            <option value="por">Português</option>
            <option value="en">Ingles</option>
          </select>
        </div>
        <button class="btn btn-info hover:bg-black w-full">
          Actualizar Datos
        </button>
      </form>
    </div>
  );
};

export default ModalUpdateData;
