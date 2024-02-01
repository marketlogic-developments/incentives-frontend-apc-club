import { DateInput } from "@mantine/dates";
import React from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";

const ModalUpdateData = ({ onClose }) => {
  const [t, i18n] = useTranslation("global");

  const submitForm = (e) => {
    e.preventDefault();

    const data = Object.values(e.target);

    console.log(data.slice(0, 11).map((i) => i.value));

    // return onClose(false);
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
            />
          </div>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Documento</span>
          </label>
          <div className="flex justify-between">
            <select className="input input-ghost w-fit bg-[#F4F4F4]">
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
              name: "phone",
              // onBlur: handleChangeInputs,
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
            <option value="fr">Francés</option>
            <option value="it">Italiano</option>
            <option value="de">Aleman</option>
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
