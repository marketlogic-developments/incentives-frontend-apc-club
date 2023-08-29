import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowDown } from "../icons";

/**
 *
 * @param {*} param0
 * @returns
 */
const SortedTable = ({
  containerStyles = "",
  tableStyles = "",
  thStyles = "",
  totalTableStyles = "text-black text-left text-lg font-bold",
  generalRowStyles = "",
  colStyles = "",
  cols = [
    {
      rowStyles: "",
      sort: false,
      symbol: "",
      identity: "",
      columnName: "",
    },
  ],
  currentItems = [],
  searchByInvoice = "",
  fieldSearchByInvoice = "",
  pageCount = 0,
  paginate = false,
  sumColum = false,
  handlePageClick = () => {},
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  
  /* SUMA DE COLUMNAS */
  const columnSums = currentItems.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!isNaN(obj[key]) || (typeof obj[key] === "string" && !isNaN(parseFloat(obj[key])))) {
        const numericValue = parseFloat(obj[key]);
        acc[key] = (acc[key] || 0) + numericValue;
      }
  
    });
    return acc;
  }, {});

  /* FORMATO DE NUMERO A DINERO */
  const numberToMoney = (quantity = 0) => {
    return `$ ${Number(quantity)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  /* FORMATO PARA EL PORCENTAJE */
  const formatAVG = (avgnumber) => {
    const formattedValue = (avgnumber * 100).toFixed(1);
    return formattedValue;
};

/* FORMATO PARA LA FECHA */
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString("es-GT", options);
  };

  /* SORT */
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...currentItems].sort((a, b) => {
    if (sortColumn) {
      const valueA = parseFloat(a[sortColumn].replace(/,/g, ""));
      const valueB = parseFloat(b[sortColumn].replace(/,/g, ""));

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return (valueA - valueB) * (sortOrder === "asc" ? 1 : -1);
      }

      return (
        a[sortColumn].localeCompare(b[sortColumn]) *
        (sortOrder === "asc" ? 1 : -1)
      );
    }
    return 0;
  });

  return (
    <div>
      <div className={`w-full !overflow-y-auto ${containerStyles}`}>
        <table className={`w-full table-auto ${tableStyles}`}>
          <thead className={`bg-black ${thStyles}`}>
            <tr>
              {cols.length !== 0 &&
                cols.map((col, index) => (
                  <th
                    className={`text-left ${colStyles} ${
                      col.sort && "cursor-pointer"
                    } `}
                    onClick={() => col.sort && handleSort(col.identity)}
                  >
                    <div className="flex items-center gap-1">
                      {col.columnName} {col.sort ? <ArrowDown /> : ""}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {sortedData &&
              [...sortedData]
                .filter((item) => {
                  if (searchByInvoice !== "") {
                    return item[fieldSearchByInvoice].startsWith(
                      searchByInvoice
                    );
                  }
                  return item;
                })
                .map((row, index) => (
                  <tr key={index}>
                    {cols.map((col) => (
                      <th
                        key={col.identity}
                        className={
                          col.rowStyles ? col.rowStyles : generalRowStyles
                        }
                      >
                        {col.symbol === "DATE"
                          ? formatDate(row[col.identity])
                          : col.symbol === "USD"
                          ? numberToMoney(row[col.identity])
                          : col.symbol === "%"
                          ? formatAVG(row[col.identity]) + col.symbol
                          : row[col.identity] + col.symbol}
                      </th>
                    ))}
                  </tr>
                ))}
            {sumColum && (
              <tr>
                {cols.map((col, index) => (
                  <th
                    key={`total-${col.identity}`}
                    className={totalTableStyles}
                  >
                    {col.symbol === "USD"
                      ? numberToMoney(columnSums[col.identity])
                      : col.symbol === "N"
                      ? columnSums[col.identity]
                      : index === 0
                      ? "Total"
                      : ""}
                  </th>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {paginate && (
        <div className="w-full pt-5">
          <ReactPaginate
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            nextClassName={"item next "}
            previousClassName={"item previous"}
            activeClassName={"item active "}
            breakClassName={"item break-me "}
            breakLabel={"..."}
            disabledClassName={"disabled-page"}
            pageClassName={"item pagination-page "}
            nextLabel={
              <FaChevronRight style={{ color: "#000", fontSize: "20" }} />
            }
            previousLabel={
              <FaChevronLeft style={{ color: "#000", fontSize: "20" }} />
            }
          />
        </div>
      )}
    </div>
  );
};

export default SortedTable;
