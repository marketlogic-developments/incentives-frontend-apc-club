import React, { useMemo, useState } from "react";
import NewTyC from "./NewT&C";
import FormTC from "./FormTC";

const ModalTyCProccess = ({ opened, setModal, user }) => {
  const [content, setContent] = useState(0);

  const typeContent = useMemo(() => {
    if (user.policy_awards && user.cedula === null) {
      setContent(1);
    }

    if (content === 0) {
      return <NewTyC setContent={setContent} />;
    }
    if (content === 1) {
      return (
        <FormTC opened={opened} setContent={setContent} setModal={setModal} />
      );
    }
  }, [content]);

  return (
    <div className="w-[50vw] h-[90vh] flex">
      <div className="h-full w-1/3 bg-[#F5F5F5] px-6">
        <div className="flex flex-col gap-3 mt-[18vh] !text-xs">
          <div className="flex gap-3 items-center">
            <span
              className={` rounded-full !w-7 !h-7 flex justify-center items-center !min-w-7 text-white ${
                content === 0 ? "bg-info" : "bg-[#828282] border"
              }`}
            >
              1
            </span>
            <p
              className={`!text-xs w-32 ${
                content === 0 ? "text-info" : "text-[#828282]"
              }`}
            >
              Actualización términos y condiciones
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <span
              className={`rounded-full !w-7 !h-7 flex justify-center items-center !min-w-7 text-white ${
                content === 1 ? "bg-info" : "bg-[#828282] border"
              }`}
            >
              2
            </span>
            <p
              className={`!text-xs ${
                content === 1 ? "text-info" : "text-[#828282]"
              }`}
            >
              Información proveedor
            </p>
          </div>
        </div>
      </div>
      <div className="h-full w-2/3 p-6 overflow-scroll">{typeContent}</div>
    </div>
  );
};

export default ModalTyCProccess;
