import React, { useMemo, useState } from "react";
import FormCanal from "./CanalOpcionesModal/FormCanal";
import ImportExcel from "./ImportExcel";

const ButtonCanalAgregar = ({ data }) => {
  const [content, setContent] = useState(0);

  const typeContent = useMemo(() => {
    if (content === 0) {
      return <FormCanal />;
    }

    if (content === 1) {
      return <ImportExcel type={3} />;
    }
  }, [content]);

  return (
    <div>
      <div className="grid grid-cols-2 place-items-center text-center border-b">
        <p
          className={`h-full w-full p-3 cursor-pointer ${
            content === 0 && "border-b-2 border-[#eb1000] text-[#eb1000]"
          }`}
          onClick={() => setContent(0)}
        >
          Agregar Canal
        </p>
        <p
          className={`h-full w-full p-3 cursor-pointer ${
            content === 1 && "border-b-2 border-[#eb1000] text-[#eb1000]"
          }`}
          onClick={() => setContent(1)}
        >
          Importar Canales
        </p>
      </div>
      {typeContent}
    </div>
  );
};

export default ButtonCanalAgregar;
