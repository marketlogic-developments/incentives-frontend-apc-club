import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import ContainerContent from "../components/containerContent";

const userscreatefunctionFor = () => {
  const [jsonData, setJsonData] = useState(null);
  const [jsonData2, setJsonData2] = useState(null);
  const [pos, setPos] = useState([]);
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState(0);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.BACKURL}/pos`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPos(res.data);
        });

      axios
        .get(`${process.env.BACKURL}/users`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(res.data);
        });
    }
  }, [token]);

  function xlsxToJson(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setJsonData(json);
    };
    reader.readAsArrayBuffer(file);
  }

  function xlsxToJson2(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setJsonData2(
        json.map((data) => ({ email: data.email, processed: false }))
      );
    };
    reader.readAsArrayBuffer(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    return jsonData.map((data) => {
      const posFilter = pos.filter((e) => e.description === data.companyName);
      if (posFilter.length > 0) {
        posFilter.map((dataPos) => {
          console.log(dataPos);
          console.log({
            name: `${data.firstName} ${data.lastName}`,
            email: `${data.username}`,
            password: `${data.password}`,
            roleId: `${
              data.userRol.includes("Partner Admin")
                ? 3
                : data.userRol.includes("Partner Principal")
                ? 2
                : 5
            }`,
            policy: false,
            passwordReset: false,
            region: data.region,
            cpf: "N/A",
            person: {
              names: data.firstName,
              lastName: data.lastName,
              birthDate: "1980-07-05",
              position: data.userRol.includes("Partner Admin")
                ? "Partner Admin"
                : data.userRol.includes("Partner Principal")
                ? "Partner Principal"
                : "Sales Rep",
              phoneNumber: "45645646",
              operationStatusId: 4,
              academicDegreeId: 1,
              languageId: data.region === "BRAZIL" ? 1 : 2,
            },
            employeePos: {
              posId: 1,
            },
          });
        });
      }
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    const usersEmailFile = jsonData2.map((data) => data.email);
    const usersEmailData = users
      .filter((data) => data.policy === false)
      .map((data) => ({
        email: data.email,
        id: data.id,
      }));

    const usersMatch = usersEmailData.filter((data) =>
      usersEmailFile.includes(data.email)
    );

    if (usersMatch.length === 0) {
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

      return Toast.fire({
        icon: "error",
        title:
          "No se encontraron coincidencias, esto puede ser porque el usuario no está en la base de datos o ya aceptó los T&C",
      });
    }

    console.log(usersMatch);

    const usersProcessed = usersMatch.map(async ({ id }) =>
      axios.patch(
        `${process.env.BACKURL}/users/${id}`,
        {
          policy: true,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    Promise.all(usersProcessed)
      .then((results) => {
        const dataResult = results.map(({ data }) => ({
          email: data.email,
          processed: true,
        }));

        const usersNotProcessed = jsonData2.filter((data) => {
          const thisUser = dataResult.find(({ email }) => email === data.email);
          return thisUser === undefined && data;
        });

        return setJsonData2([...usersNotProcessed, ...dataResult]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(jsonData2);

  const typeContent = useMemo(() => {
    if (content === 0) {
      return (
        <div className="grid grid-cols-2">
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
          <div className="flex w-full h-full">
            {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
          </div>
        </div>
      );
    }
    if (content === 1) {
      return (
        <div className="grid grid-cols-2">
          <form onSubmit={(e) => handleSubmit2(e)} id="successT&c">
            <input
              type="file"
              className="file-input w-full max-w-xs"
              onChange={xlsxToJson2}
            />
            <button type="submit" className="btn btn-primary">
              Aceptación T&C
            </button>
          </form>
          <div>
            <div className="flex w-full">
              <table className="w-full text-sm text-left text-black-500 border-2">
                <thead className="text-xs text-black-500 uppercase">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Procesado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jsonData2 !== null &&
                    jsonData2.map(({ email, processed }) => {
                      return (
                        <tr
                          className={`bg-white border-b dark:border-gray-500 ${
                            processed
                              ? "bg-[green] text-white"
                              : "bg-[#eb1000] text-white"
                          }`}
                        >
                          <th
                            scope="row"
                            className="py-4 px-6 font-medium text-white"
                          >
                            {email}
                          </th>
                          <td className="py-4 px-6">
                            {processed ? "si" : "no"}
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
    }
  }, [content, jsonData, jsonData2]);

  return (
    <>
      <ContainerContent pageTitle={"Importaciones"}>
        <div className="m-6 flex flex-col gap-20">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">Importaciones</h1>
          </div>
          <div className="grid grid-cols-2 place-items-center">
            <p
              className={`p-3 w-full text-center ${
                content === 0 && "border-b-2 border-[#eb1000]"
              }`}
              onClick={() => setContent(0)}
            >
              Subir Usuarios Masivamente
            </p>
            <p
              className={`p-3 w-full text-center ${
                content === 1 && "border-b-2 border-[#eb1000]"
              }`}
              onClick={() => setContent(1)}
            >
              Aceptar T&C Masivamente
            </p>
          </div>
          {typeContent}
        </div>
      </ContainerContent>
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

export default userscreatefunctionFor;
