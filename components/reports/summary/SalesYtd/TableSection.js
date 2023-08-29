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
            identity: "segment",
            columnName: "Segmento",
          },
          {
            rowStyles: "",
            sort: false,
            symbol: "USD",
            identity: "total",
            columnName: "Total Sales USD",
          },
          {
            rowStyles: "",
            sort: false,
            symbol: "USD",
            identity: "total_points",
            columnName: "DigiPoints",
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
