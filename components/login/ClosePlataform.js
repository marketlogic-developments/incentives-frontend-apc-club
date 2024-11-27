import React from "react";
import { useTranslation } from "react-i18next";

const ClosePlataform = ({ data }) => {
  const [t, i18n] = useTranslation("global");
  const description =
    i18n.resolvedLanguage === "por"
      ? data.descriptionPor.content[0].content[0].value.split("|")
      : data.description.content[0].content[0].value.split("|");

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center">
      <div className="w-1/4 flex flex-col justify-center gap-6">
        <img className="w-full" src="/assets/login/people.png" />
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-bold text-center">
            {i18n.resolvedLanguage === "por" ? data.titlePor : data.title}
          </h1>
          <p className="text-center text-lg">
            {description[0]} <br /> {description[1]} <br /> {description[2]}{" "}
            <br />
            <span className="text-[#eb1000] font-bold"> {description[3]}</span>
          </p>
        </div>
        <div className="flex py-2 px-5 w-full justify-center sm:mb-5 mb-3">
          <select
            className="select !select-sm select-bordered w-full text-secondary"
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
            }}
            value={i18n.resolvedLanguage}
          >
            <option value="es">Español</option>
            <option value="por">Português</option>
          </select>
        </div>
      </div>
    </main>
  );
};

export default ClosePlataform;
