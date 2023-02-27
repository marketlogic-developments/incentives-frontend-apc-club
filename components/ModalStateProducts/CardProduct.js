import React from "react";

const CardProduct = ({ info }) => {
  return (
    <>
      <div class="flip-card-market justify-self-center">
        <div class="flip-card-inner-market">
          <div class="flip-card-front-market">
            <div className="card-details justify-center">
              <figure className="cursor-pointer">
                <img src={info.imagePath} alt={info.name} className="w-1/4" />
              </figure>
              <p className="text-title">
                Cantidad: <br /> {info.quantity}
              </p>
              <p className="text-title">
                Precio: <br /> {`${info.price * info.quantity}DG`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
