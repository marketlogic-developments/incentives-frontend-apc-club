import React from "react";
import SortedTable from "../../../table/SortedTable";
import SelectInputValue from "../../../inputs/SelectInputValue";
import { ArrowDown } from "../../../icons";
import { SegmentedControl } from "@mantine/core";

export const RegisteredSection = ({ loading, dataTable }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-5 pt-10">
        <p className="text-black font-bold text-3xl">
          Registered companies and users
        </p>
        <SegmentedControl
          data={[
            { value: "preview", label: "Companies" },
            { value: "code", label: "Users" },
          ]}
          color="dark"
          fullWidth 
          radius={'lg'}
        />
      </div>
      <div className="justify-items-center pt-5">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && (
          <SortedTable
            containerStyles={
              "mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max !w-full"
            }
            tableStyles={"table-zebra !text-sm"}
            colStyles={"p-2"}
            thStyles={"sticky text-white"}
            cols={[
              {
                rowStyles: "",
                sort: false,
                symbol: "",
                identity: "region",
                columnName: "Region",
              },
              {
                symbol: "N",
                identity: "brazil",
                columnName: "Brazil",
              },
              {
                symbol: "N",
                identity: "mexico",
                columnName: "México",
              },
              {
                symbol: "N",
                identity: "nola",
                columnName: "NOLA",
              },
              {
                symbol: "N",
                identity: "sola",
                columnName: "SOLA",
              },
              {
                symbol: "N",
                identity: "total",
                columnName: "Total",
              },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            currentItems={dataTable}
            sumColum={true}
          />
        )}
      </div>
    </>
  );
};
