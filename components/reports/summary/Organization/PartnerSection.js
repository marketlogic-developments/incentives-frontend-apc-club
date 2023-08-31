import React from "react";
import SortedTable from "../../../table/SortedTable";
import { SegmentedControl } from "@mantine/core";

const PartnerSection = ({ isDataLoading, partner }) => {
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
        {!isDataLoading && <div className="lds-dual-ring"></div>}
        {isDataLoading && (
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
                symbol: "",
                identity: "organization",
                columnName: "Organization",
              },
              {
                symbol: "",
                identity: "country",
                columnName: "Country",
              },
              {
                symbol: "",
                identity: "medal",
                columnName: "Medal",
              },
              {
                symbol: "USD",
                identity: "sales",
                columnName: "Sales YTD",
              },
              {
                symbol: "USD",
                identity: "growth",
                columnName: "Sales LY",
              },
              {
                symbol: "%",
                identity: "growth",
                columnName: "Growth",
              },
              {
                symbol: "USD",
                identity: "cc_sales",
                columnName: "CC Sales",
              },
              {
                symbol: "%",
                identity: "cc_growth",
                columnName: "CC Growth",
              },
              {
                symbol: "USD",
                identity: "dc_sales",
                columnName: "DC Sales",
              },
              {
                symbol: "%",
                identity: "dc_growth",
                columnName: "DC Growth",
              },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            currentItems={partner}
            sumColum={true}
            totalTableStyles={"text-green-400 text-left text-lg font-bold"}
          />
        )}
      </div>
    </>
  );
};

export default PartnerSection;
