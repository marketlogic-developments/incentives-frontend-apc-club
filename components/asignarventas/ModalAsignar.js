import React from "react";

const ModalAsignar = ({ typeModal }) => {
  if (typeModal === 1) {
    return (
      <>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
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
                    Agrega la imagen del premio
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
        </div>
      </>
    );
  }
};

export default ModalAsignar;
