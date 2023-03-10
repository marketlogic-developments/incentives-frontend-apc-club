import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const userscreatefunctionFor = () => {
  const [jsonData, setJsonData] = useState(null);
  const [jsonData2, setJsonData2] = useState(null);
  const [pos, setPos] = useState([]);
  const [users, setUsers] = useState([]);
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
      setJsonData2(json);
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
    const usersEmailData = users.map((data) => ({
      email: data.email,
      id: data.id,
    }));

    const usersMatch = usersEmailData.filter((data) =>
      usersEmailFile.includes(data.email)
    );

    return usersMatch
      .map(({ id }) => {
        axios.patch(
          `${process.env.BACKURL}/users/${id}`,
          {
            policy: true,
          },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then(() => {
        console.log("all users are updated");
      });
  };

  console.table(users);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="file"
          className="file-input w-full max-w-xs"
          onChange={xlsxToJson}
        />
        <button type="submit" className="btn btn-primary">
          Procesar
        </button>
      </form>
      <form onSubmit={(e) => handleSubmit2(e)}>
        <input
          type="file"
          className="file-input w-full max-w-xs"
          onChange={xlsxToJson2}
        />
        <button type="submit" className="btn btn-primary">
          Aceptación T&C
        </button>
      </form>
      <div className="flex w-full">
        {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
        {jsonData2 && <pre>{JSON.stringify(jsonData2, null, 2)}</pre>}
      </div>
    </div>
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
