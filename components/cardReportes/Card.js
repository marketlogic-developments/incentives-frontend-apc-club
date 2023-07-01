import React from "react";

const Card = ({
  styles = "",
  titleCard = "Title",
  children,
  onClick = () => {},
}) => {
  return (
    <div className={`card targetDashboard cursor-pointer ${styles}`}>
      <div className="card-body" onClick={onClick}>
        {children}
        <h2 className="card-title text-sm lg:text-lg ">{titleCard}</h2>
      </div>
    </div>
  );
};

export default Card;
