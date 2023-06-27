import React from "react";
import { ArrowDown } from "../icons";

const BtnWithImage = ({icon = <ArrowDown />, text = 'Button', styles = ''}) => {
  return (
    <button className={`btn gap-2 flex ${styles}`}>
      {icon} {text}
    </button>
  );
};

export default BtnWithImage;
