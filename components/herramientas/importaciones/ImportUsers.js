import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { changeLoadingData } from "../../../store/reducers/loading.reducer";

const ImportUsers = () => {
  const dispatch = useDispatch();
  const [jsonData, setJsonData] = useState(null);
  const token = useSelector((state) => state.user.token);
  const users = useSelector((state) => state.user.users);

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

    const usersAllMapEmail = jsonData.map((data) => {
      const userFind = users.find(({ email }) => email === data.email);

      console.log(userFind);
    });

    // const validationUsers = jsonData.filter(
    //   ({ email }) => !usersAllMapEmail.includes(email)
    // );

    // const promises = validationUsers.map(async (data) =>
    //   axios.post(
    //     `${process.env.BACKURL}/users`,
    //     {
    //       name: `${data.firstName} ${data.lastName}`,
    //       email: `${data.email}`,
    //       password: `${data.password}`,
    //       roleId: data.userRol.includes("Partner Admin")
    //         ? 3
    //         : data.userRol.includes("Partner Principal")
    //         ? 2
    //         : 5,
    //       policy: false,
    //       passwordReset: false,
    //       region: data.region,
    //       cpf: "N/A",
    //       companyId: 144,
    //       names: data.firstName,
    //       lastName: data.lastName,
    //       birthDate: "1980-07-05",
    //       position: data.userRol.includes("Partner Admin")
    //         ? "Partner Admin"
    //         : data.userRol.includes("Partner Principal")
    //         ? "Partner Principal"
    //         : "Sales Rep",
    //       phoneNumber: "45645646",
    //       operationStatusId: 4,
    //       academicDegreeId: 1,
    //       languageId: data.region === "BRAZIL" ? 1 : 2,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    // );

    // Promise.all(promises)
    //   .then((values) => {
    //     console.log(values);
    //     setJsonData(
    //       values.map(({ data }) => ({
    //         firstName: data.names,
    //         lastName: data.lastName,
    //         email: data.email,
    //         password: "--",
    //         region: data.region,
    //         userRol:
    //           data.roleId === 3
    //             ? "Partner Admin"
    //             : data.roleId === 2
    //             ? "Partner Principal"
    //             : "Sales Rep",
    //         processed: true,
    //       }))
    //     );
    //     return Toast.fire({
    //       icon: "success",
    //       title: `Se han creado ${values.length} usuarios`,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return Toast.fire({
    //       icon: "error",
    //       title: "Ya hay usuarios que están creados en esta lista",
    //     });
    //   })
    //   .finally(() => {
    //     dispatch(changeLoadingData(false));
    //   });
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
                  Apellido
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Contraseña
                </th>
                <th scope="col" className="py-3 px-6">
                  Región
                </th>
                <th scope="col" className="py-3 px-6">
                  Rol
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
                        {data.firstName}
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.lastName}
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.email}
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.password}
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.region}
                      </th>
                      <th className="py-4 px-6 text-white font-bold">
                        {data.userRol}
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

export default ImportUsers;
