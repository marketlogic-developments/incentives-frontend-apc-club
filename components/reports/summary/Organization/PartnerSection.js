import React from "react";
import SortedTable from "../../../table/SortedTable";
import { SegmentedControl } from "@mantine/core";

const PartnerSection = ({ isDataLoading, dataTable }) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 grid-rows-1 gap-5 pt-10">
        <p className="text-black font-bold text-3xl">
          Partner that grew and decreased +-50
        </p>
        <SegmentedControl
          data={[
            { value: "preview", label: "Who increased +50%" },
            { value: "code", label: "Who decreased -50%" },
          ]}
          color="dark"
          fullWidth 
          radius={'lg'}
        />
      </div>
      <div className="justify-items-center pt-5">
        {isDataLoading && <div className="lds-dual-ring"></div>}
        {!isDataLoading && (
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
            totalTableStyles={"text-green-400 text-left text-lg font-bold"}
          />
        )}
      </div>
    </>
  );
};

export default PartnerSection;
