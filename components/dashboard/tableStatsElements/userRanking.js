import React from "react";

const UserRanking = ({ data, index }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-6">
        <div class="user p-2 bg-[#1473E6] rounded-full w-fit h-fit">
          <p class="text-white">AD</p>
        </div>
        <div>
          <p className="text-sm font-bold">Juanito</p>
          <p className="text-xs">contabilidad</p>
        </div>
      </div>
      <div>#{index}</div>
    </div>
  );
};

export default UserRanking;
