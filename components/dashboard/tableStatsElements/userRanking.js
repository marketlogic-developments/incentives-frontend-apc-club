import React from "react";

const UserRanking = ({ data, index }) => {
  console.log(data);
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-6">
        <div class="user bg-[#1473E6] rounded-full w-[30px] h-[30px] flex items-center justify-center">
          <p class="text-white text-center">{data.name[0]}</p>
        </div>
        <div>
          <p className="!text-xs font-bold">{data.name}</p>
        </div>
      </div>
      <div className="w-auto "># {index}</div>
    </div>
  );
};

export default UserRanking;
