import React from "react";
import { Component } from "react";

const BtnWithImage = ({icon = <Component />, text = 'Button', styles = ''}) => {
  return (
    <button className={`btn gap-2 flex ${styles}`}>
      {icon} {text}
    </button>
  );
};

export default BtnWithImage;
