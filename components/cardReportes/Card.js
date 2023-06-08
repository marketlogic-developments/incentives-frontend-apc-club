import React from "react";

const Card = ({styles = '', titleCard = 'Title',children}) => {
  return (
    <div className={`card shadow-md cursor-pointer ${styles}`}>
      <div class="card-body">
        {children}
        <h2 class="card-title text-sm lg:text-lg  ">{titleCard}</h2>
      </div>
    </div>
  );
};

export default Card;
