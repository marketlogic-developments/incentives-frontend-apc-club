import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const ModalTargetParticipants = () => {
  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="!text-base font-bold">Participantes</p>
        <div className="relative flex">
          <input
            className="input input-bordered h-auto pl-8 py-2 text-sm font-normal"
            placeholder="Buscar"
            type="text"
          />
          <div className="absolute h-full items-center flex ml-2">
            <AiOutlineSearch color="#eb1000" />
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold text-[#1473E6]">Seleccionar todos</p>
        <div></div>
      </div>
    </div>
  );
};

export default ModalTargetParticipants;
