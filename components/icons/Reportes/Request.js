import React from "react";

const Request = ({ width = 70, height = 70 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="35" cy="35" r="35" fill="#FFEEED" />
      <path
        d="M31.4243 13C21.802 13 14 20.802 14 30.4243C14 33.1978 14.6642 35.8094 15.8183 38.1381L14.0676 45.1406C13.6679 46.7354 15.1131 48.1806 16.7079 47.7809L23.7104 46.0303C26.0391 47.1844 28.6507 47.8485 31.4243 47.8485C41.0466 47.8485 48.8485 40.0466 48.8485 30.4243C48.8485 20.802 41.0466 13 31.4243 13Z"
        fill="#EB1000"
      />
      <path
        d="M52.3275 40.8726L54.9329 51.2902C55.3326 52.8851 53.8874 54.3302 52.2926 53.9305L41.8749 51.3251L52.3275 40.8726Z"
        fill="#FFC8C5"
      />
      <path
        d="M46.4175 21.5809C47.9529 24.1741 48.8487 27.1915 48.8487 30.4243C48.8487 40.0466 41.0467 47.8485 31.4244 47.8485C28.1917 47.8485 25.1742 46.9527 22.5811 45.4173C25.6129 50.5483 31.1846 53.9983 37.5742 53.9983C47.1964 53.9983 54.9984 46.1963 54.9984 36.574C54.9984 30.1844 51.5484 24.6128 46.4175 21.5809Z"
        fill="#FFC8C5"
      />
      <circle cx="23.1457" cy="30.0931" r="2.64912" fill="white" />
      <circle cx="31.093" cy="30.0931" r="2.64912" fill="white" />
      <circle cx="39.0405" cy="30.0931" r="2.64912" fill="white" />
    </svg>
  );
};

export default Request;
