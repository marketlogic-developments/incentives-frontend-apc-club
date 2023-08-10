const programName = "Adobe Partner Connection Club";

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

export const addTitleToHeader = (ws, downloadTitle) => {
  // Fusionar celdas A1 a C1 para el título
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
  ws["A2"] = {
    t: "s",
    v: downloadTitle,
    s: { font: { bold: true } },
  };
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
