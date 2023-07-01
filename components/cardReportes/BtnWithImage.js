import React from "react";
import { ArrowDown } from "../icons";

const BtnWithImage = ({
  icon = <ArrowDown />,
  text = "Button",
  styles = "",
  onClick = () => {},
}) => {
  return (
    <button className={`btn gap-2 flex ${styles}`} onClick={onClick}>
      {icon} {text}
    </button>
  );
};

export default BtnWithImage;
