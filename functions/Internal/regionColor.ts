import React from "react";

const regionColor = (region: string) => {
  switch (region) {
    case "SOLA":
      return "#30A7FE-#10CFA9";
    case "NOLA":
      return "#30A7FE-#ff4885";
    case "MEXICO":
      return "#30A7FE-#7155fa";
    case "BRAZIL":
      return "#30A7FE-#6ece2a";

    default:
      return "#EB1000";
  }
};

export default regionColor;

export const rolColor = (rol: String) => {
  switch (rol) {
    case "partner_admin":
      return "#EB1000-#ffde2c";
    case "partner_principal":
      return "#EB1000-#FFA213";
    case "sales_rep":
      return "#EB1000-#FFA213";
    default:
      return "#EB1000-#FFA213";
  }
};
