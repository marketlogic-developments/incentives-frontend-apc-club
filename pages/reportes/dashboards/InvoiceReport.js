import React from "react";
import { ArrowDown, SearchIcon } from "../../../components/icons";
import { SearchInput, SelectInput } from "../../../components/inputs";
import { useTranslation } from "react-i18next";

const InvoiceReport = () => {
  const [t, i18n] = useTranslation("global");
  const dataSelectOne = [
    {
      value: "Inquietud o pregunta",
      label: "Inquietud o pregunta",
    },
    {
      value: "Reporte de error",
      label: "Reporte de error",
    },
    { value: "Sugerencia", label: "Sugerencia" },
    { value: "Otros", label: "Otros" },
  ];
  return (
    <div className="mt-8">
     <div className="flex justify-start items-center gap-3">
     <SearchInput
            image={<SearchIcon />}
            placeHolder={"Buscar"}
            stylesContainer={""}
            stylesInput={
              "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
            }
          />
          <SelectInput
            placeholder={t("tabla.unidadNegocio")}
            data={dataSelectOne}
            icon={<ArrowDown />}
            /* onChange={handleChange} */
            name={"subject"}
          />
          <SelectInput
            placeholder="Asunto"
            data={dataSelectOne}
            icon={<ArrowDown />}
            /* onChange={handleChange} */
            name={"subject"}
          />
     </div>
    </div>
  );
};

export default InvoiceReport;