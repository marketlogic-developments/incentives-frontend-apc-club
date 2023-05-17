import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

import axios from "axios";
import { changeLoadingData } from "../../store/reducers/loading.reducer";
import Image from "next/image";
import user from "../../pages/user/[user]";

const ImportacionPremios = () => {
  const dispatch = useDispatch();
  const [jsonData, setJsonData] = useState(null);
  const token = useSelector((state) => state.user.token);
  const awards = useSelector((state) => state.awards.awards);

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

  function xlsxToJson(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setJsonData(json.map((data) => ({ ...data, processed: false })));
    };
    reader.readAsArrayBuffer(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(changeLoadingData(true));

    const promises = jsonData.map(async (data) =>
      axios.post(
        `${process.env.BACKURL}/awards`,
        {
          name: data.name,
          digipoints: data.digipoints,
          price: data.price,
          imagePath: data.imagePath,
          status: data.status,
          description: data.description,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    Promise.all(promises)
      .then((values) => {
        dispatch(getDataAwards(token, user));
        setJsonData(
          values.map(({ data }) => ({
            name: data.name,
            digipoints: data.digipoints,
            price: data.price,
            imagePath: data.imagePath,
            status: "activo",
            description: data.description,
          }))
        );

        return Toast.fire({
          icon: "success",
          title: `Se han creado ${values.length} Premios`,
        });
      })
      .catch((error) => {
        console.log(error);
        return Toast.fire({
          icon: "error",
          title: "No se pudieron subir los premios",
        });
      })
      .finally(() => {
        dispatch(changeLoadingData(false));
      });
  };

  return (
    <div className="grid my-10 w-full gap-10">
      <form onSubmit={(e) => handleSubmit(e)} id="uploadUsers">
        <input
          type="file"
          className="file-input w-full max-w-xs"
          onChange={xlsxToJson}
        />
        <button type="submit" className="btn btn-primary">
          Procesar
        </button>
      </form>
      <div className="w-full">
        <div className="flex w-full">
          <table className="w-full text-left text-black-500 border-2 text-xs">
            <thead className="text-xs text-black-500 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Nombre
                </th>
                <th scope="col" className="py-3 px-6">
                  Digipoints
                </th>
                <th scope="col" className="py-3 px-6">
                  Precio
                </th>
                <th scope="col" className="py-3 px-6">
                  PathName
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Description
                </th>
                <th scope="col" className="py-3 px-6">
                  Procesado
                </th>
              </tr>
            </thead>
            <tbody>
              {jsonData !== null &&
                jsonData.map((data) => {
                  return (
                    <tr
                      className={`bg-white border-b dark:border-gray-500 ${
                        data.processed
                          ? "bg-[green] text-white"
                          : "bg-[#eb1000] text-white"
                      }`}
                    >
                      <th className="py-4 px-6 text-white font-bold">
                        {data.name}
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.digipoints}
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.price}
                      </th>
                      <th className="py- px-6 text-white font-bold w-[200px]">
                        <img
                          src={data.imagePath}
                          className="w-[50%] inline-flex"
                        ></img>
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.status === true && "activo"}
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.description}
                      </th>
                      <td className="py-4 px-6 font-bold">
                        {data.processed ? "Si" : "No"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ImportacionPremios;
