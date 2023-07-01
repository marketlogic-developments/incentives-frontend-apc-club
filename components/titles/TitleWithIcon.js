import React from "react";
import { ArrowDown } from "../icons";

const TitleWithIcon = ({icon = <ArrowDown />, title = 'Title'}) => {
  return (
    <div className="flex gap-3 items-center">
      {icon}
      <div className="flex items-center">
        <p className="font-bold text-3xl">{title}</p>
      </div>
    </div>
  );
};

export default TitleWithIcon;