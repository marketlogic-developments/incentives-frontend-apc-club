import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { importCompany } from "../../store/reducers/company.reducer";

const ImportExcel = ({ type }) => {
  const [fileName, setFileName] = useState("");
  const [fileB64, setFileB64] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputRef, setInputRef] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  console.log(fileB64);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setFileB64(reader.result);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      fileName: fileName,
      base64String: fileB64.split(",")[1],
      type: type,
    };

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

    if (fileB64) {
      dispatch(importCompany(token, formData))
        .then(() => {
          inputRef.value = null;
          return Toast.fire({
            icon: "success",
            title: "Archivo cargado de forma exitosa",
          });
        })
        .catch((error) => {
          console.log(error);
          return Toast.fire({
            icon: "error",
            title: "El archivo no pudo ser cargado",
          });
        });
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => {
        setFormSubmitted(false);
      }, 1000);
    }
  }, [formSubmitted]);

  return (
    <>
      <p className="py-4 text-center">
        Agrega el archivo de{" "}
        {type === 1
          ? "los productos"
          : type === 2
          ? "las metas por mes"
          : type === 3
          ? "los canales"
          : type === 4
          ? "los distribuidores"
          : type === 5
          ? "los usuarios"
          : type === 6 && "las promociones"}{" "}
        a importar
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

export default ImportExcel;
