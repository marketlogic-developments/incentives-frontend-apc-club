import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { shoopingCarPush } from "../../store/reducers/awards.reducer";
import Cookies from "js-cookie";

const CardShoppingCard = ({ info, arrProducts, setProducts }) => {
  const [counter, setCounter] = useState(info.quantity);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const setGlobalStateAwards = (counterTarget) => {
    const awardFilter = arrProducts.filter(({ id }) => id !== info.id);

    if (counterTarget === 0) {
      return setProducts([...awardFilter]);
    }

    return setProducts([...awardFilter, { ...info, quantity: counterTarget }]);
  };

  const handleDelete = () => {
    const productsToCookies = JSON.parse(Cookies.get("shoppCar"));
    const newProductsCookies = productsToCookies.filter(
      ({ id }) => id !== info.id
    );

    Cookies.set("shoppCar", JSON.stringify(newProductsCookies));
    const awardFilter = arrProducts.filter(({ id }) => id !== info.id);

    return setProducts([...awardFilter]);
  };

  return (
    <div className="flex flex-col relative ">
      <div
        className="absolute w-5 text-center quitProduct rounded-full bg-secondary text-white cursor-pointer"
        onClick={handleDelete}
      >
        <svg
          width="20"
          height="20"
          fill="#fff"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full cursor-pointer"
        >
          <path d="M20.25 4.5H16.5v-.75a2.26 2.26 0 0 0-2.25-2.25h-4.5A2.26 2.26 0 0 0 7.5 3.75v.75H3.75a.75.75 0 0 0 0 1.5h.75v13.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V6h.75a.75.75 0 1 0 0-1.5ZM10.5 15.75a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 1.5 0v6Zm4.5 0a.75.75 0 1 1-1.5 0v-6a.75.75 0 1 1 1.5 0v6ZM15 4.5H9v-.75A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .75.75v.75Z"></path>
        </svg>
      </div>
      <div className="flex rounded-lg p-5 gap-4 border-red-700 border-double border-4">
        <div className="w-[25%]">
          <figure>
            <img src={info.imagePath} className="w-full" />
          </figure>
        </div>
        <div className="flex w-full justify-between">
          <div>
            <p className="text-3xl font-semibold">{info.name}</p>
            <p className="text-sm">
              {` ${t("shoopingcar.valorde")} ${info.description}${info.price}`}
            </p>
          </div>
          <div className="flex flex-col self-center gap-4">
            <p className="text-red-700 text-center">
              {info.digipoints * info.quantity}
              <br />
              DigiPoints
            </p>
            <div className="containerCounter flex justify-center">
              <button
                className="buttonminus"
                onClick={() => {
                  counter <= 0
                    ? null
                    : (setCounter(counter - 1),
                      setGlobalStateAwards(counter - 1));
                }}
              >
                -
              </button>
              <input
                className="numberstyle"
                type="number"
                id="counter"
                name="counter"
                min="0"
                max="50"
                placeholder="0"
                value={info.quantity}
                onChange={(e) => {
                  Number(e.currentTarget.value) <= -1
                    ? setCounter(0)
                    : setCounter(Number(e.currentTarget.value));
                }}
              ></input>
              <button
                className="buttonplus"
                onClick={() => {
                  setCounter(counter + 1);
                  setGlobalStateAwards(counter + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardShoppingCard;
