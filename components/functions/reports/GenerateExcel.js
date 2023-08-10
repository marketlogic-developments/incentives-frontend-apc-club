import { utils, write } from "xlsx";
import { addTitleToHeader, getColumnWidths } from "./consts/Headers";

/**
 * Importa datos y crea un archivo Excel (.xlsx) con contenido ajustado automáticamente al ancho de las columnas.
 * @param {Object} excelConfig - Configuración para la creación del archivo Excel.
 * @param {Array} excelConfig.data - Los datos que se agregarán al archivo Excel.
 * @param {Array} excelConfig.columns - Los nombres de las columnas.
 * @param {string} excelConfig.downloadTitle - El título del archivo descargado.
 * @returns {Object} - Un objeto con el archivo blob que puede ser descargado.
 */
const importExcelFunction = async (excelConfig) => {
  const { data, columns, downloadTitle } = excelConfig;

  // Convertir los datos en un formato adecuado para el archivo Excel
  const dataRows = data.map((row) => {
    return Object.keys(row).map((key) => row[key]);
  });
  const allData = [columns, ...dataRows];

  // Crear una hoja de cálculo y un libro
  const ws = utils.aoa_to_sheet("");
  // Ajustar automáticamente el ancho de las columnas según el contenido
  const wb = utils.book_new();

  addTitleToHeader(ws, downloadTitle);
  ws["!cols"] = getColumnWidths(allData);
  // Agregar los datos a la hoja de cálculo
  utils.sheet_add_aoa(ws, allData, { origin: "A5" });
  // Agregar la hoja de cálculo al libro
  utils.book_append_sheet(wb, ws, downloadTitle);
  // Crear un blob del libro para la descarga
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
