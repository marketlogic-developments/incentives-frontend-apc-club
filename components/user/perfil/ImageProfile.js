import React from "react";

const ImageProfile = ({ profilePhoto = "", onClick = () => {} }) => {
  return (
    <div className="relative rounded-full w-[80px] h-[80px] flex items-center justify-center">
      <img
        src={profilePhoto}
        className="w-full h-full rounded-full"
        alt="Avatar"
      />
      <div class="relative">
        <div class="absolute inset-y-0 -right-2 -top-10" onClick={onClick}>
          <label className="btn btn-circle btn-sm bg-gray-300	border-none hover:bg-gray-400 drop-shadow-lg text-black">
            X
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageProfile;
