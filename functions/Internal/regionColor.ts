import React from "react";

const regionColor = (region: string) => {
  switch (region) {
    case "BRAZIL":
      return "#21A5A2";
    case "SOLA":
      return "#eb1000";
    case "NOLA":
      return "#1473E6";
    case "MEXICO":
      return "#FFA213";
  }
};

export default regionColor;

export const rolColor = (rol: String) => {
  switch (rol) {
    case "partner_admin":
      return "#EB1000";
    case "partner_principal":
      return "#FFA213";
    case "sales_rep":
      return "#1473E6";
    default:
      return "#5DB41F";
  }
};
