import React from "react";
import { Component } from "react";

const InputReporte = ({ image = <Component />, placeHolder = "..." }) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-3">
        <div className="flex items-center h-full">{image}</div>
      </div>
      <input
        type="text"
        placeholder={placeHolder}
        class="input bg-base-200 border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
      />
    </div>
  );
};

export default InputReporte;
