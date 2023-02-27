import { useRouter } from "next/router";
import React from "react";
import ContainerContent from "../components/containerContent";

const files = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const route = useRouter();
  return (
    <ContainerContent pageTitle={"Archivos Importados"}>
      <div className="m-6 flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-3xl">Archivos Importados</h1>
        </div>
        <div className="grid grid-cols-3 gap-y-7">
          {array.map(() => (
            <div className="card w-3/4  bg-base-100 shadow-xl">
              <figure>
                <img
                  src="https://media.istockphoto.com/id/1175215972/es/vector/carpeta-de-archivos-en-plano-sobre-fondo-blanco.jpg?s=2048x2048&w=is&k=20&c=3CxT-aiLUm9pcQvfMX4mrJQUZPKtk_87j1JWSZ4xT7Q="
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Archivo</h2>
                <p>Archivo XSL</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => route.push("/cargaventas")}
                  >
                    Exportar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerContent>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1],
    },
  };
}

export default files;
