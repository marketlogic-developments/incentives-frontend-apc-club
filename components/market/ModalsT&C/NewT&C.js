import React, { useState } from "react";
import TYC from "../../../public/mkt/TCCol.html";
import axios from "axios";
import { useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";

const NewTyC = ({ setContent }) => {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const handleAccepted = () => {
    setLoading(true);

    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
        {
          policy_awards: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((e) => {
        setContent(1);
      })
      .finally(() => setLoading(false));
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
          {loading ? (
            <Triangle
              height="30"
              width="30"
              color="#ffff"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Acepto los nuevos términos"
          )}
        </button>
      </div>
    </div>
  );
};

export default NewTyC;
