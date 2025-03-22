import React from "react";

const UserRanking = ({ data, index }) => {
  return (
    <div
      className={`flex justify-between items-center  ${
        index !== 3 && " border-b-2 pb-6"
      }`}
    >
      <div className="flex xl:gap-6 lg:gap-3">
        <div class="user bg-[#1473E6] rounded-full w-[35px] h-[35px] min-w-[35px] min-h-[35px] flex items-center justify-center">
          <p class="text-white text-center">{data.names[0]}</p>
        </div>
        <div className="flex flex-col">
          <p className="!text-xs font-bold">{data.names}</p>
          <p className="!text-xs">{`${data.company} | ${data.region}`}</p>
        </div>
      </div>
      <div className="whitespace-nowrap font-bold"># {data.ranking}</div>
    </div>
  );
};

export default UserRanking;
