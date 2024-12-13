import React from "react";
import { useState } from "react";
import DigiPointsCard from "./DigiPointsCard";
import { IconCurrentDigiPoints } from "public/assets/Icons/Digipoints/DigipointsIcons";

const DigiPointsCollapse = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className="flex p-1 bg-base-100 rounded-[10px] w-full">
        <div
          className="flex flex-col w-full"
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-3 items-center justify-center">
            <IconCurrentDigiPoints h={71} w={71}/>
          </div>
        </div>
      </div>
      {open && (
        <div className="absolute left-[100px]">
          <DigiPointsCard />
        </div>
      )}
    </div>
  );
};

export default DigiPointsCollapse;
