import React from "react";
import ModalAsignar from "../components/asignarventas/ModalAsignar";
import ContainerContent from "../components/containerContent";

const asignarventas = () => {
  const data = [
    {
      fechaCarga: "14/10/2022",
      noSerie: "Ventas",
      producto: "LicenseSub",
      venta: "USD 15000",
      sku: "7970_T",
      total: 1000,
      pendiente: 1000,
      asignado: 1000,
      statusAsignado: 1,
    },
    {
      fechaCarga: "14/10/2022",
      noSerie: "Ventas",
      producto: "LicenseSub",
      venta: "USD 15000",
      sku: "7970_T",
      total: 1000,
      pendiente: 1000,
      asignado: 1000,
      statusAsignado: 2,
    },
    {
      fechaCarga: "14/10/2022",
      noSerie: "Ventas",
      producto: "LicenseSub",
      venta: "USD 15000",
      sku: "7970_T",
      total: 1000,
      pendiente: 1000,
      asignado: 1000,
      statusAsignado: 3,
    },
  ];

  const verifyStatus = (numberState) => {
    switch (numberState) {
      case 1:
        return (
          <label htmlFor="my-modal-3" className="btn btn-error font-bold">
            Asignar
          </label>
        );
      case 2:
        return (
          <label htmlFor="my-modal2" className="btn btn-info font-bold">
            Asignado
          </label>
        );
      default:
        return (
          <label
            htmlFor="my-modal3"
            className="btn btn-active btn-ghost font-bold"
          >
            No Aplica
          </label>
        );
    }
  };
  return (
    <>
      <ContainerContent pageTitle={"Carga de Ventas"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
            <div>
              <div className="relative">
                <div className="absolute flex items-center ml-2 h-full">
                  <svg
                    className="w-4 h-4 fill-current text-primary-gray-dark"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.o          rg/2000/svg"
                  >
                    <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                  </svg>
                </div>
                <div className="flex justify-between">
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  />
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    {t("tabla.exportar")}
                  </button>
                </div>
              </div>
            </div>
            <br></br>
            <div className="container">
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-black-500">
                  <thead className="text-xs text-black-500 uppercase">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Fecha de Carga
                      </th>
                      <th scope="col" className="py-3 px-6">
                        No. de serie
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Producto
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Venta
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Sku
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Total
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Pendiente
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Asignado
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Asignar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(
                      ({
                        fechaCarga,
                        noSerie,
                        producto,
                        venta,
                        sku,
                        total,
                        pendiente,
                        asignado,
                        statusAsignado,
                      }) => (
                        <tr className="bg-white border-b dark:border-gray-500">
                          <td className="py-4 px-6">{fechaCarga}</td>
                          <td className="py-4 px-6">{noSerie}</td>
                          <td className="py-4 px-6">{producto}</td>
                          <td className="py-4 px-6">{venta}</td>
                          <td className="py-4 px-6">{sku}</td>
                          <td className="py-4 px-6">{total}</td>
                          <td className="py-4 px-6">{pendiente}</td>
                          <td className="py-4 px-6">{asignado}</td>
                          <td className="py-4 px-6">
                            {verifyStatus(statusAsignado)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ContainerContent>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-11/12 max-w-5xl flex flex-col items-center">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2  bg-red-500 hover:bg-red-700"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-red-500">Asignar Puntos</h3>
          <p className="py-4">Elige los usuarios para asignar puntos</p>
          <div className="w-full flex flex-col items-center">
            <div className="form-control w-9/12">
              <label className="label">
                <span className="label-text">Agentes</span>
              </label>
              <select className="select w-full max-w-xs">
                <option disabled selected>
                  Selecciona al agente
                </option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
              <label className="label">
                <span className="label-text">Valor de puntos por asignar</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <input type="checkbox" id="my-modal2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-11/12 max-w-5xl flex flex-col items-center">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2  bg-red-500 hover:bg-red-700"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-red-500">Asignar Puntos</h3>
          <p className="py-4">Indica la información del premio</p>
          <div className="w-full flex flex-col items-center">
            <div className="form-control w-9/12">
              <label className="label">
                <span className="label-text">Asignar Usuarios</span>
              </label>
              <select className="select w-full max-w-xs">
                <option disabled selected>
                  Selecciona al agente
                </option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
              <label className="label">
                <span className="label-text">Valor en Digipoints</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">
                  Agrega la imagen del producto
                </span>
              </label>
              <div className="flex w-full justify-center gap-8">
                <div>
                  <strong className="text-sm">Subir imagen (jpg,png)</strong>
                  <p className="text-xs">Peso máximo 5MB</p>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-error w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 3],
    },
  };
}

export default asignarventas;
