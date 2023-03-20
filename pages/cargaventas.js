import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import {
  getSalesData,
  getStatus,
  createSaleData,
} from "../store/reducers/sales.reducer";
import moment from "moment";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const cargaventas = () => {
  const [formData, setFormData] = useState({
    fileName: "",
    base64String: "",
  });
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const salesfiles = useSelector((state) => state.sales.sales);
  const [sales, setSales] = useState([]);
  const [status, setStatus] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saleStatus, setSaleStatus] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      dispatch(getSalesData(token));
      dispatch(getStatus(token))
        .then((status) => {
          setStatus(status);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded, token]);

  useEffect(() => {
    if (salesfiles.length > 0 && status.length > 0) {
      const joinObjects = (salesfiles, status) => {
        const result = [];
        salesfiles.forEach((sale) => {
          status.forEach((stat) => {
            if (sale.operationStatusId === stat.id) {
              result.push({ ...sale, nameStatus: stat.name });
            }
          });
        });
        return result;
      };
      setSaleStatus(joinObjects(salesfiles, status));
      //const setSaleStatus2 = joinObjects(sales, status);
      //console.log(setSaleStatus2);
    }
  }, [salesfiles, status]);

  const [fileName, setFileName] = useState("");
  const [fileB64, setFileB64] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputRef, setInputRef] = useState(null);

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
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("base64String", fileB64.split(",")[1]);
    if (fileB64) {
      dispatch(createSaleData(token, formData))
        .then(() => {
          setFormSubmitted(true);
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

  return (
    <>
      <ContainerContent pageTitle={"Carga de Ventas"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl"> {t("menu.Carga_de_Ventas")}</h1>
          </div>
          <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
            <div>
              <div className="relative">
                <div className="absolute flex items-center ml-2 h-full none">
                  <svg
                    className="w-4 h-4 fill-current text-primary-gray-dark"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                  </svg>
                </div>
                <div className="flex justify-between">
                  <input
                    type="text"
                    placeholder={t("tabla.buscar")}
                    className="px-8 py-3 w-8/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm none"
                  />
                  <button className="bg-info hover:bg-success-content text-white font-bold py-2 px-4 rounded-full none">
                    <Link href={"/asignarventas"}>
                      {t("cargaventas.asignar")}
                    </Link>
                  </button>
                  <label
                    htmlFor="my-modal-3"
                    className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    {t("cargaventas.cargar")}
                  </label>
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
                        {t("cargaventas.id")}
                      </th>
                      <th scope="col" className="py-3 px-6">
                        {t("tabla.fechacarga")}
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Estado
                      </th>
                      <th scope="col" className="py-3 px-6">
                        {t("tabla.activo")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleStatus.map((ventas) => (
                      <tr
                        key={ventas.id}
                        className="bg-white border-b dark:border-gray-500"
                      >
                        <td className="py-4 px-6">{ventas.nameUuid}</td>
                        <td className="py-4 px-6">
                          {moment(ventas.CreatedAt).format("MM/DD/YYYY")}
                        </td>
                        <td className="py-4 px-6">{ventas.nameStatus}</td>
                        <td className="py-4 px-6">
                          {ventas.complete ? "Activo" : "Inactivo"}
                        </td>
                      </tr>
                    ))}
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

          <>
            <h3 className="text-lg font-bold text-red-500">Cargar Ventas</h3>
            <p className="py-4">Indica la información de la venta</p>
            <div className="w-full flex flex-col items-center">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="form-control text-center">
                  <span className="label-text pb-4">
                    Agrega el archivo de la venta
                  </span>
                  <div className="flex w-full justify-center gap-8">
                    <div>
                      <strong className="text-sm">
                        Subir archivo (csv, xls)
                      </strong>
                      <p className="text-xs">Peso máximo 500MB</p>
                    </div>
                    <input
                      input
                      type="file"
                      onChange={handleFileChange}
                      name="base64String"
                      className="file-input file-input-bordered file-input-error w-full max-w-xs"
                      ref={(input) => setInputRef(input)}
                    />
                  </div>
                  <div className="pt-5 flex justify-center">
                    <button
                      type="submit"
                      htmlFor="my-modal-3"
                      className="btn btn-outline btn-error w-2/4"
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
        </div>
      </div>
    </>
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

export default cargaventas;
