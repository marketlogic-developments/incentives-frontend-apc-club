import { utils, write } from "xlsx";
import { addTitleToHeader } from "./consts/Headers";

/**
 *
 * @param {*} data
 * @returns
 */

const importExcelFunction = async (excelConfig) => {
  const { data, columns, downloadTitle } = excelConfig;
  const dataRows = data.map((row) => {
    return Object.keys(row).map((key) => row[key]);
  });
  const allData = [columns, ...dataRows];
  const ws = utils.aoa_to_sheet("");
  const wb = utils.book_new();

  addTitleToHeader(ws, downloadTitle);

  utils.sheet_add_aoa(ws, allData, { origin: "A5" });
  utils.book_append_sheet(wb, ws, downloadTitle);
  const blob = new Blob([write(wb, { bookType: "xlsx", type: "array" })], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return {
    blob,
  };
};

const GenerateCsv = () => {
  const response = "Csv";
  return {
    response,
  };
};

export { importExcelFunction, GenerateCsv };
