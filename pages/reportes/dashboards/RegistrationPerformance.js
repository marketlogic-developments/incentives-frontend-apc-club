import React, { useEffect, useState, useMemo } from "react";
import {
  BtnFilter,
  BtnWithImage,
  Table,
  SelectInputValue,
  SearchInput,
  TitleWithIcon,
} from "../../../components";
import { saveAs } from "file-saver";
import jsonexport from "jsonexport";
import {
  ArrowDown,
  CloudDownload,
  SearchIcon,
  Thunderbolt,
} from "../../../components/icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesAll,
  getSalesAllByChannel,
  getSalesAllByDist,
} from "../../../store/reducers/sales.reducer";

const RegistrationPerformance = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sales.salesall);
  const itemsPerPage = 10;
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [selectOne, setSelectOne] = useState("");
  const [selectTwo, setSelectTwo] = useState("");
  const [searchByInvoice, setSearchByInvoice] = useState("");
  const [t, i18n] = useTranslation("global");
  const token = useSelector((state) => state.user.token);

  /* Loader setter */
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  /* Querys */
  useEffect(() => {
    if (token && data.length === 0) {
      setLoading(true);
      if (user?.roles[0].name === "name") {
        dispatch(getSalesAll(token)).then((response) => {
          setLoading(false);
        });
      } else if (user.companyId === null) {
        dispatch(getSalesAllByDist(token, distribuitor.soldToParty)).then(
          (response) => {
            setLoading(false);
          }
        );
      } else {
        dispatch(getSalesAllByChannel(token, company.resellerMasterId)).then(
          (response) => {
            setLoading(false);
          }
        );
      }
    }
  }, [isLoaded, token]);

  /* Selects */
  const handleSelectOneChange = (name, value) => {
    setSelectOne(value);
  };

  const handleSelectTwoChange = (name, value) => {
    setSelectTwo(value);
  };

  const dataOne = [...new Set(data.map((user) => user.business_unit))];

  const dataSelectOne = dataOne.map((business) => ({
    value: business,
    label: business,
  }));

  const dataTwo = [...new Set(data.map((user) => user.business_unit))];

  const dataSelectTwo = dataTwo.map((business) => ({
    value: business,
    label: business,
  }));

  /* Filter */
  const filteredUsers = data.filter((user) => {
    if (
      selectTwo &&
      !user.reseller_partner_rollup
        .toLowerCase()
        .includes(selectTwo.toLowerCase())
    ) {
      return false;
    }
    if (
      selectOne &&
      !user.business_unit
        .toString()
        .toLowerCase()
        .includes(selectOne.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  /* Clear Filter */
  const clearSelects = () => {
    setSelectOne("");
    setSelectTwo("");
  };

  /* Download */
  const importFile = (data) => {
    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "InvoiceReport.csv");
    });
  };

  /* Table */
  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;

    return filteredUsers.slice(itemOffset, endOffset);
  }, [itemOffset, data, filteredUsers]);

  /* Paginate */
  const pageCount = useMemo(
    () => Math.ceil(filteredUsers.length / itemsPerPage),
    [filteredUsers, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<Thunderbolt />}
          title={t("Reportes.registration_performance")}
        />
      </div>
      <div className="grid items-center sm:grid-cols-5 grid-rows-1 gap-3">
        <SearchInput
          image={<SearchIcon />}
          placeHolder={t("tabla.buscar")}
          stylesContainer={""}
          value={searchByInvoice}
          onChange={(e) => setSearchByInvoice(e.target.value)}
          stylesInput={
            "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
          }
        />
        <SelectInputValue
          placeholder={t("tabla.unidadNegocio")}
          value={selectOne}
          data={dataSelectOne}
          icon={<ArrowDown />}
          onChange={handleSelectOneChange}
          name={"business"}
        />
        <SelectInputValue
          placeholder={t("organizacion.organizacion")}
          value={selectTwo}
          data={dataSelectTwo}
          icon={<ArrowDown />}
          onChange={handleSelectTwoChange}
          name={"email"}
        />
        <BtnFilter
          text={t("Reportes.limpiar_filtros")}
          styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
          onClick={clearSelects}
        />
        <BtnWithImage
          text={t("Reportes.descargar")}
          icon={<CloudDownload />}
          styles={
            "bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
          }
          onClick={() => importFile(filteredUsers)}
        />
      </div>
      <div className="grid overflow-x-auto w-full">
        {loading ? (
          <div className="lds-dual-ring"></div>
        ) : (
          <>
            <div>
              <Table
                containerStyles={
                  "mt-4 !rounded-tl-lg !rounded-tr-lg !overflow-x-auto max-h-max"
                }
                tableStyles={"table-zebra !text-sm"}
                colStyles={"p-2"}
                thStyles={"sticky text-white"}
                cols={
                  user?.roles[0].name === "name"
                    ? [
                        "Invoice",
                        "Disti Partner Rollup",
                        "Reseller Partner Rollup",
                        "Business Unit",
                        "Business Type",
                        "SKU",
                        "Quarter",
                        "DigiPoints",
                        "Total Sales US",
                      ]
                    : [
                        "Invoice",
                        "Disti Partner Rollup",
                        "Reseller Partner Rollup",
                        "Business Unit",
                        "Business Type",
                        "SKU",
                        "Quarter",
                        "Total Sales US",
                      ]
                }
              >
                {currentItems &&
                  [...currentItems]
                    .filter((item) => {
                      if (searchByInvoice !== "") {
                        return item.sales_order.startsWith(searchByInvoice);
                      }

                      return item;
                    })
                    .map((data, index) => (
                      <tr key={index}>
                        <td className="text-start p-4">{data.sales_order}</td>
                        <td className="text-start p-4">
                          {data.disti_partner_rollup}
                        </td>
                        <td className="text-start p-4">
                          {data.reseller_partner_rollup}
                        </td>
                        <td className="text-start p-4">{data.business_unit}</td>
                        <td className="text-start p-4">{data.business_type}</td>
                        <td className="text-start p-4">{data.materia_sku}</td>
                        <td className="text-start p-4">{data.quarter}</td>
                        {user?.roles[0].name === "name" && (
                          <td className="text-start p-4">
                            {data.max_digipoints_allocate}
                          </td>
                        )}
                        <td className="text-start p-4">
                          ${parseFloat(data.total_sales_amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
              </Table>
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
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationPerformance;
