import React from "react";
import { ArrowDown } from "../icons";

const InputReporte = ({ image = <ArrowDown />, placeHolder = "...", stylesContainer = '', stylesInput = '', stylesImage = ''}) => {
  return (
    <div className={`relative ${stylesContainer}`}>
      <div className="absolute inset-y-0 left-3">
        <div className={`flex items-center h-full ${stylesImage}`}>{image}</div>
      </div>
      <input
        type="text"
        placeholder={placeHolder}
        className={`input h-8 bg-base-200/50 ${stylesInput}`}
      />
    </div>
  );
};

export default InputReporte;
