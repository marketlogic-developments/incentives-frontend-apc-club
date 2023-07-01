import React from "react";
import { Camera } from "../../icons";

const NoImageProfile = ({
  name = "?",
  icon = <Camera />,
  onClick = () => {},
}) => {
  return (
    <div className="relative bg-[#1473E6] rounded-full w-[80px] h-[80px] flex items-center justify-center">
      <p className="absolute text-white !text-base">{name}</p>
      <div class="relative">
        <div class="absolute inset-y-0 left-3 -top-10" onClick={onClick}>
          <label className="btn btn-circle btn-sm bg-gray-300 border-none hover:bg-gray-400 drop-shadow-lg text-black">
            {icon}
          </label>
        </div>
      </div>
    </div>
  );
};

export default NoImageProfile;
