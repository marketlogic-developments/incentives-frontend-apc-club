import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ButtonAddUser from "./ButtonAddUser";

const TableUsersOrganization = () => {
  return (
    <div className="mt-20">
      <div className="flex justify-between">
        <div>
          <p>Usuarios</p>
        </div>
        <div className="flex gap-6">
          <div className="relative flex w-full">
            <input
              className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full bg-[]"
              placeholder="Buscar"
              type="text"
            />
            <div className="absolute h-full items-center flex ml-2">
              <AiOutlineSearch color="#eb1000" />
            </div>
          </div>
          <ButtonAddUser />
        </div>
      </div>
    </div>
  );
};

export default TableUsersOrganization;
