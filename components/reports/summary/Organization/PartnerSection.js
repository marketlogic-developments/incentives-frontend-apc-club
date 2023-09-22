import React, { useEffect, useMemo, useState } from "react";
import SortedTable from "../../../table/SortedTable";
import { SegmentedControl } from "@mantine/core";

const PartnerSection = ({ isDataLoading, partner }) => {
  const itemsPerPage = 10;
const [itemOffset, setItemOffset] = useState(0);
const [pageCount, setPageCount] = useState(0);

const currentItems = useMemo(() => {
  const endOffset = itemOffset + itemsPerPage;

  if (partner?.length === 1) {
    return partner;
  }

  return partner?.slice(itemOffset, endOffset);
}, [itemOffset, partner]);

/* Paginate */
useEffect(() => {
  if (partner) {
    const calculatedPageCount = Math.ceil(partner.length / itemsPerPage);
    setPageCount(calculatedPageCount);
  }
}, [partner, itemsPerPage]);

const handlePageClick = (event) => {
  const newOffset = event.selected * itemsPerPage;
  setItemOffset(newOffset);
};

  return (
    <>
      <div className="grid sm:grid-cols-2 grid-rows-1 gap-5 pt-10">
        <p className="text-black font-bold text-3xl">
          Partner that grew and decreased +-50
        </p>
        {/* <SegmentedControl
          data={[
            { value: "preview", label: "Who increased +50%" },
            { value: "code", label: "Who decreased -50%" },
          ]}
          color="dark"
          fullWidth 
          radius={'lg'}
        /> */}
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
                columnName: "Total Revenue (USD)",
              },
              {
                symbol: "USD",
                identity: "expected_revenue",
                columnName: "Expected Revenue (USD)",
              },
              {
                symbol: "%",
                identity: "growth",
                columnName: "Total % effectiveness",
              },
              {
                symbol: "USD",
                identity: "cc_sales",
                columnName: "CC Revenue (USD)",
              },
              {
                symbol: "%",
                identity: "cc_growth",
                columnName: "CC Sales %",
              },
              {
                symbol: "USD",
                identity: "dc_sales",
                columnName: "DC Revenue (USD)",
              },
              {
                symbol: "%",
                identity: "dc_growth",
                columnName: "DC Sales %",
              },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            paginate={true}
            currentItems={currentItems}
            sumColum={true}
            pageCount={pageCount}
            handlePageClick={handlePageClick}
            totalTableStyles={"text-green-400 text-left text-lg font-bold"}
          />
        )}
      </div>
    </>
  );
};

export default PartnerSection;
