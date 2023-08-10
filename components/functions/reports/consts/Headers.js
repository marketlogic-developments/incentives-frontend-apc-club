// Nombre del programa, este va en el encabezado
const programName = "Adobe Partner Connection Club";

/**
 * Retorna la fecha y hora formateada según las opciones específicas.
 * @returns {string} - Fecha y hora formateada.
 */
export const date = () => {
  const dateHour = new Date();

  const formatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dateFormater = dateHour.toLocaleString("es-ES", formatOptions);
  return dateFormater;
};

/**
 * Agrega el título y la fecha a las celdas de encabezado de la hoja de cálculo.
 * Mencionar que el tema de estilizados no es funcional debido a que se necesita
 * de las funciones premium.
 * @param {object} ws - Objeto de hoja de cálculo en el que se agregará el título.
 * @param {string} downloadTitle - Título para la descarga del archivo.
 */
export const addTitleToHeader = (ws, downloadTitle) => {
  // Fusionar celdas para el título y la fecha
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
  ];

  // Agregar el título en la celda A1
  ws["A1"] = {
    t: "s",
    v: programName,
    s: { font: { bold: true } },
  };

  // Agregar el título de descarga en la celda A2
  ws["A2"] = {
    t: "s",
    v: downloadTitle,
    s: { font: { bold: true } },
  };

  // Agregar la fecha en la celda A3 con bordes
  ws["A3"] = {
    t: "s",
    v: date(),
    s: {
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    },
  };
};

/**
 * Calcula y devuelve los anchos adecuados para las columnas en función del contenido.
 * @param {Array} data - Datos de la hoja de cálculo.
 * @returns {Array} - Arreglo con anchos de columnas.
 */
export const getColumnWidths = (data) => {
  const columnWidths = [];
  for (let i = 0; i < data[0].length; i++) {
    let maxLength = 0;
    for (let j = 0; j < data.length; j++) {
      const cellValue = data[j][i];
      const cellLength = cellValue ? cellValue.toString().length : 0;
      maxLength = Math.max(maxLength, cellLength);
    }
    columnWidths.push({ wch: maxLength }); // Agregar margen
  }
  return columnWidths;
};