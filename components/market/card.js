import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CardMarket = ({ info, setAwards, awards }) => {
  const [counter, setCounter] = useState(0);

  const setGlobalStateAwards = (counter) => {
    const awardFilter = awards.filter(({ id }) => id !== info.id);

    if (counter === 0) {
      return setAwards([...awardFilter]);
    }

    return setAwards([...awardFilter, { ...info, quantity: counter }]);
  };

  return (
    <>
      <div class="flip-card-market">
        <div class="flip-card-inner-market">
          <div class="flip-card-front-market">
            <div className="card-details justify-center">
              <figure>
                <img
                  src={info.imagePath}
                  alt={info.name}
                  className="imgMarket"
                />
              </figure>

              <p className="text-title">
                {info.digipoints} <br /> DigiPoints
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
                  className="numberstyle text-black"
                  type="number"
                  id="counter"
                  name="counter"
                  min="0"
                  max="50"
                  placeholder="0"
                  value={counter > 0 && counter}
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
    </>
  );
};

export default CardMarket;
