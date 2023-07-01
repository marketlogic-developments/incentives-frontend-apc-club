import React from "react";
import { ArrowDown } from "../icons";

const DropDownReport = ({
  icon = <ArrowDown />,
  title = "title",
  children,
}) => {
  return (
    <div className="dropdown w-full">
      <div className="relative">
        <div
          tabindex="0"
          class="m-1 font-bold cursor-pointer btn btn-sm bg-gray-100 border-none !rounded-l-lg !rounded-r-lg !rounded-none hover:bg-gray-200 text-black sm:flex sm:justify-start grid justify-items-center"
        >
          <div className="absolute inset-y-0 right-3">
            <div className="flex items-center h-full">{icon}</div>
          </div>
          {title}
        </div>
      </div>
      <ul
        tabindex="0"
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {children}
      </ul>
    </div>
  );
};

export default DropDownReport;
