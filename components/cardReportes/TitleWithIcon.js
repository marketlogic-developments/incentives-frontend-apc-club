import React from "react";
import { Component } from "react";
import { ArrowDown } from "../icons";

const TitleWithIcon = ({icon = <ArrowDown />, title = 'Title'}) => {
  return (
    <div className="flex gap-3">
      {icon}
      <div className="flex items-center">
        <h1 className=" font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default TitleWithIcon;
