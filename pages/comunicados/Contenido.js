import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Contenido = () => {
  const { query } = useRouter();
  const dataContent = JSON.parse(query.data);

  console.log(dataContent);
  return <div>Contenido</div>;
};

export default Contenido;
