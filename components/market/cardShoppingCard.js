import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { shoopingCarPush } from "../../store/reducers/awards.reducer";

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
    const awardFilter = arrProducts.filter(({ id }) => id !== info.id);

    return setProducts([...awardFilter]);
  };

  return (
    <div className="flex flex-col relative ">
      <div
        className="absolute w-5 text-center quitProduct rounded-full bg-secondary text-white cursor-pointer"
        onClick={handleDelete}
      >
        X
      </div>
      <div className="flex rounded-lg p-5 gap-4 border-red-700 border-double border-4">
        <div className="w-12">
          <figure>
            <img src={info.imagePath} />
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
