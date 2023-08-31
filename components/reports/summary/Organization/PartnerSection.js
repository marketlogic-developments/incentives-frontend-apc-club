import React from "react";
import SortedTable from "../../../table/SortedTable";
import { ArrowDown } from "../../../icons";
import SelectInputValue from "../../../inputs/SelectInputValue";

const PartnerSection = ({ loading, dataTable }) => {
  return (
    <>
      <div className="flex items-center gap-5 pt-10">
        <p className="text-black font-bold text-3xl">
          Partner that grew and decreased +-50
        </p>
        <SelectInputValue
          placeholder={"Region"}
          icon={<ArrowDown />}
          searchable={true}
          name={"region"}
        />
        <SelectInputValue
          placeholder={"Business type"}
          icon={<ArrowDown />}
          searchable={true}
          name={"business_type"}
        />
        <SelectInputValue
          placeholder={"Who decreased -50%"}
          icon={<ArrowDown />}
          searchable={true}
          name={"who_decreased"}
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
            totalTableStyles={"text-green-400 text-left text-lg font-bold"}
          />
        )}
      </div>
    </>
  );
};

export default PartnerSection;
