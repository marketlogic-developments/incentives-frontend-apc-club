import React, { useState } from "react";
import TYC from "../../../public/mkt/TCCol.html";
import axios from "axios";
import { useSelector } from "react-redux";

const NewTyC = ({ setContent }) => {
  const [check, setCheck] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleAccepted = () => {
    setContent(1);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col gap-3">
        <p className="font-bold !text-2xl">Términos y Condiciones</p>
        <p className="!text-base text-[#828282]">Actualización el dd/mm/yy</p>
      </div>
      <div className="h-[70%] overflow-x-hidden overflow-y-scroll">
        <div
          dangerouslySetInnerHTML={{ __html: TYC }}
          className="!text-sm"
        ></div>
      </div>
      <div className="grid gap-6">
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            className="checkbox checkbox-sm checkbox-info"
            onChange={(e) => setCheck(e.target.checked)}
          />
          <p>He leído la actualización de términos y condiciones.</p>
        </div>
        <button
          disabled={!check}
          className="btn btn-info btn-sm w-fit justify-self-end"
          onClick={handleAccepted}
        >
          Acepto los nuevos términos
        </button>
      </div>
    </div>
  );
};

export default NewTyC;
