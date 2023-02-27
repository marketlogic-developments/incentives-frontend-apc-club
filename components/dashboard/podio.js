import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Podio = ({ t, sortedData }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && sortedData) {
      console.table(sortedData);
    }
  }, [isLoaded, sortedData]);
  return (
    <div className="w-full h-2/4 w-full bg-base-100 max-sm:flex max-sm:flex-col sm:flex-row justify-between">
      <div className="flex flex-col mx-auto items-center">
        <img
          src="/assets/Icons/trofeos.png"
          alt="trofeos_ranking"
          className="awardImg"
        />
        <p className="font-bold text-1xl">
          <strong style={{ color: "#EB1000" }}>Ranking</strong>
        </p>
        <p>Enero</p>
      </div>
      <div className="flex gap-1 col-start-2 col-end-4 justify-center">
        <div className="flex flex-col justify-end w-44">
          <div
            className="h-4/6 flex items-end px-5 rounded-t-3xl justify-center"
            style={{ backgroundColor: "#fc7d74" }}
          ></div>
          <p className="text-center font-bold">John Doe 1</p>
        </div>
        <div className="flex flex-col justify-end w-44">
          <div
            className="h-full flex items-end px-5 rounded-t-3xl justify-center"
            style={{ backgroundColor: "#eb1000" }}
          ></div>
          <p className="text-center font-bold">John Doe 1</p>
        </div>
        <div className="flex flex-col justify-end w-44 h-44">
          <div
            className="h-2/4 flex items-end px-5 rounded-t-3xl justify-center"
            style={{ backgroundColor: "#fc7d74" }}
          ></div>
          <p className="text-center font-bold">John Doe 1</p>
        </div>
      </div>
    </div>
  );
};

export default Podio;
