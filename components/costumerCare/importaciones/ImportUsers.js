import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const ImportUsers = () => {
  const [inputRef, setInputRef] = useState(null);
  const [file, setFile] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const token = useSelector((state) => state.user.token);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleFileChange = (event) => {
    const archivo = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setFile({ json: jsonData });
    };
    reader.readAsArrayBuffer(archivo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/multiple`, file, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        inputRef.value = null;
        return Toast.fire({
          icon: "success",
          title: "Archivo cargado de forma exitosa",
          background: "#000000",
          color: "#fff",
        });
      })
      .catch((error) => {
        console.log(error);
        return Toast.fire({
          icon: "error",
          title: "El archivo no pudo ser cargado",
          background: "#000000",
          color: "#fff",
        });
      });
  };

  console.log(file);

  return (
    <>
      <p className="py-4 text-center">
        Agrega el archivo de los usuarios a importar
      </p>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="form-control text-center">
            <div className=" w-full  gap-8">
              <div>
                <strong className="text-sm">Subir archivo (.xlsx)</strong>
              </div>
              <input
                input
                type="file"
                onChange={handleFileChange}
                name="base64String"
                className="text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-secondary-50 mt-4 mb-4"
                ref={(input) => setInputRef(input)}
              />
              <p className="text-xs">Peso máximo 5MB</p>
            </div>
            <div className="pt-5 flex justify-center">
              <button
                type="submit"
                htmlFor="my-modal-3"
                className="btn btn-primary justify-self-center rounded-full  w-max col-span-2"
              >
                Upload
              </button>
            </div>
          </div>
        </form>
        {formSubmitted && (
          <p className="rounded-lg border-solid border-2 px-4 py-2 mt-2 text-white bg-[#00405d]">
            Archivo enviado
          </p>
        )}
      </div>
    </>
  );
};

export default ImportUsers;
