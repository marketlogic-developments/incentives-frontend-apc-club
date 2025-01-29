import React from "react";

const regionColor = (region: string) => {
  switch (region) {
    case "SOLA":
      return "#30A7FE";
    case "NOLA":
      return "#30A7FE";
    case "MEXICO":
      return "#2c2c2c";
    case "BRAZIL":
      return "#30A7FE";

    default:
      return "#EB1000";
  }
};

export default regionColor;

export const rolColor = (rol: String) => {
  switch (rol) {
    case "partner_admin":
      return "#ffde2c";
    case "partner_principal":
      return "#FFA213";
    case "sales_rep":
      return "#EB1000";
    default:
      return "#EB1000";
  }
};
