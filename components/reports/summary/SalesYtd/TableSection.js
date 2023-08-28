import React from "react";
import SortedTable from "../../../table/SortedTable";

const TableSection = ({ dataTable }) => {
  return (
    <>
      <h2 className="text-2xl text-black font-bold">Market Segment</h2>
      <SortedTable
        containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max !w-full"}
        tableStyles={"table-zebra !text-sm"}
        colStyles={"p-2"}
        thStyles={"sticky text-white"}
        cols={[
          {
            rowStyles: "",
            sort: false,
            symbol: "",
            identity: "company_type",
            columnName: "Segmento",
          },
          {
            rowStyles: "",
            sort: false,
            symbol: "USD",
            identity: "sales_education_cc",
            columnName: "CC Education",
          },
          {
            rowStyles: "",
            sort: false,
            symbol: "USD",
            identity: "sales_education_dc",
            columnName: "DC Education",
          },
          {
            symbol: "USD",
            identity: "sales_enterprise_cc",
            columnName: "CC Enterprise",
          },
          {
            symbol: "USD",
            identity: "sales_enterprise_dc",
            columnName: "DC Acrobat Pro",
          },
          {
            symbol: "USD",
            identity: "sales_teams_cc",
            columnName: "CC Teams",
          },
          {
            symbol: "USD",
            identity: "sales_acrobat_pro_dc",
            columnName: "DC Acrobat Pro",
          },
        ]}
        generalRowStyles={"text-left py-3 mx-7"}
        currentItems={dataTable}
        sumColum={true}
      />
    </>
  );
};

export default TableSection;
