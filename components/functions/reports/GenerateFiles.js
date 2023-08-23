import { utils, write, writeFile } from "xlsx";
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
    return Object.keys(columns).map((key) => {
      const value = row[key];
      if (typeof value === "number") {
        return value; // Mantén los números como números
      } else if (!isNaN(parseFloat(value))) {
        return parseFloat(value); // Intenta convertir valores numéricos
      } else {
        return value; // Deja los otros valores como están
      }
    });
  });
  const allData = [Object.values(columns), ...dataRows];

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

  await writeFile(wb, `${downloadTitle}.xlsx`);
};

const importCsvFunction = async (csvConfig) => {
  const { data, columns, downloadTitle } = csvConfig;

  // Crear un blob con el contenido CSV
  const blob = new Blob([columns], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${downloadTitle}.csv`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return {
    blob,
  };
};

export { importExcelFunction, importCsvFunction };
