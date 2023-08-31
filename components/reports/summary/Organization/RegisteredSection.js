import React, { useState } from "react";
import SortedTable from "../../../table/SortedTable";
import { SegmentedControl } from "@mantine/core";

export const RegisteredSection = ({
  registerCompanies,
  registerUsers,
  isDataLoading,
}) => {
  const [selectedValue, setSelectedValue] = useState("company");
  const handleSegmentChange = (value) => {
    setSelectedValue(value);
  };
  return (
    <>
      <div className="grid sm:grid-cols-2 grid-rows-1 gap-5 pt-10">
        <p className="text-black font-bold text-3xl">
          Registered companies and users
        </p>
        <SegmentedControl
          data={[
            { value: "company", label: "Companies" },
            { value: "user", label: "Users" },
          ]}
          color="dark"
          fullWidth
          radius={"lg"}
          onChange={handleSegmentChange}
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
                identity: "category",
                columnName: "Region",
              },
              {
                symbol: "N",
                identity: "BRAZIL",
                columnName: "Brazil",
              },
              {
                symbol: "N",
                identity: "MEXICO",
                columnName: "México",
              },
              {
                symbol: "N",
                identity: "NOLA",
                columnName: "NOLA",
              },
              {
                symbol: "N",
                identity: "SOLA",
                columnName: "SOLA",
              },
              {
                symbol: "N",
                identity: "total",
                columnName: "Total",
              },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            currentItems={
              selectedValue === "company" ? registerCompanies : registerUsers
            }
            sumColum={true}
          />
        )}
      </div>
    </>
  );
};
