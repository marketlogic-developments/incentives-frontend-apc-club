import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const userscreatefunctionFor = () => {
  const [jsonData, setJsonData] = useState(null);
  const [pos, setPos] = useState([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const company = jsonData.filter((data) => {
      const posFilter = pos.filter((e) => e.description === data.Companyname);
      if (posFilter.length > 0) {
        posFilter.map((dataPos) => {
          console.log({
            name: `${dataPos.FirstName + LastName}`,
            email: `${dataPos.Username}`,
            password: `${dataPos.Contraseñas}`,
            roleId: `${dataPos.includes("Partner Admin") ? 3 : 5}`,
            policy: false,
            passwordReset: false,
            region: data,
            cpf: "N/A",
            person: {
              names: "Tyson",
              lastName: "Fuentes",
              birthDate: "1980-07-05",
              position: "Partner Admin",
              phoneNumber: "45645646",
              operationStatusId: 4,
              academicDegreeId: 1,
              languageId: 1,
            },
            employeePos: {
              posId: 1,
            },
          });
        });
      }
    });

    return company;
  };

  console.table(jsonData);

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
        {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
      </form>
    </div>
  );
};

export default userscreatefunctionFor;
