import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Contenido = () => {
  const { query } = useRouter();
  const dataContent = JSON.parse(query.data);

  console.log(dataContent.example);
  return (
    <div className="grid">
      <div className="object-contain flex justify-center items-center relative">
        <Image
          src={dataContent.image}
          width={1170}
          height={316}
          priority
          className="rounded-md"
        />
        <div className="absolute bg-gray-500/50 w-auto h-auto">
          <h1 className="text-white font-bold sm:text-4xl text-xl">{dataContent.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Contenido;
