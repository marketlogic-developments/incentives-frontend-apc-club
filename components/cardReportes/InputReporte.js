import React from "react";
import { Component } from "react";

const InputReporte = ({ image = <Component />, placeHolder = "...", stylesContainer = '', stylesInput = ''}) => {
  return (
    <div className={`relative ${stylesContainer}`}>
      <div className="absolute inset-y-0 left-3">
        <div className="flex items-center h-full">{image}</div>
      </div>
      <input
        type="text"
        placeholder={placeHolder}
        class={`input bg-base-200 ${stylesInput}`}
      />
    </div>
  );
};

export default InputReporte;
