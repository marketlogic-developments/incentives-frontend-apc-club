import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {importCompany} from "../../../store/reducers/company.reducer";

const FormCanal = () => {
  const [fileName, setFileName] = useState("");
  const [fileB64, setFileB64] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputRef, setInputRef] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      setFileB64(reader.result);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("base64String", fileB64.split(",")[1]);
    formData.append("type", 3);
    if (fileB64) {
      dispatch(importCompany(token, formData))
        .then(() => {
          console.log("Archivo cargado");
          inputRef.value = null;
        })
        .catch((error) => {
          console.log(error);
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

  const getValue = (str) => {
    const parts = str.split("-");
    parts.shift();
    return parts.join("-");
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    };
    const date = new Date(dateString);
    return date.toLocaleString('es-GT', options);
  };

  return (
    <>
      <p className="py-4 text-center">Agrega el archivo de la venta</p>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="form-control text-center">
            <div className=" w-full  gap-8">
              <div>
                <strong className="text-sm">
                  Subir archivo (xls)
                </strong>
                
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
          <p className="rounded-lg border-solid border-2 px-4 py-2 mt-2 text-white bg-[#00405d]">Archivo enviado</p>
        )}
      </div>
    </>
  );
};

export default FormCanal;
