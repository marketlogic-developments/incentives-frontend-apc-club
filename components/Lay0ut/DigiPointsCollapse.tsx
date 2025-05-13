import React, { useState, useEffect } from "react";
import DigiPointsCard from "./DigiPointsCard";
import { IconCurrentDigiPoints } from "public/assets/Icons/Digipoints/DigipointsIcons";

const DigiPointsCollapse = () => {
  // Initialize with false to ensure consistent server/client rendering
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only enable client-side interactions after component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex">
      <div className="flex p-1 bg-base-100 rounded-[10px] w-full">
        <div
          className="flex flex-col w-full"
          onClick={() => isMounted && setOpen(!open)}
        >
          <div className="flex gap-3 items-center justify-center">
            <IconCurrentDigiPoints h={71} w={71}/>
          </div>
        </div>
      </div>
      {isMounted && open && (
        <div className="absolute left-[100px]">
          <DigiPointsCard />
        </div>
      )}
    </div>
  );
};

export default DigiPointsCollapse;
