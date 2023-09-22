import React from "react";
import { ArrowRight } from "../icons";

const Card = ({
  styles = "",
  titleCard = "Title",
  children,
  onClick = () => {},
}) => {
  return (
    <div className={`sm:card targetDashboard cursor-pointer ${styles}`}>
      <div className="sm:card-body sm:grid flex justify-between gap-3 p-3" onClick={onClick}>
        {children}
        <h2 className="card-title text-sm lg:text-lg ">{titleCard}</h2>
        <div className="sm:hidden">
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Card;
