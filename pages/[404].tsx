import Image from "next/image";
import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[90dvh] gap-6">
      <p className="font-bold text-4xl">Sorry, try again later</p>
      <Image src={"https://res.cloudinary.com/dechrcyu3/image/upload/v1738614399/ADOBE/Premios/nyspjjjty2cukxg4arwu.png"} height={500} width={800} quality={100}
      style={{ width: "100%", height: "100%" }}
      className={`img-fluid`} ></Image>
    </div>
  );
};

export default Error;
