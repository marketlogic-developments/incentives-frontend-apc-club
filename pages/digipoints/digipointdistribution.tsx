import { Modal, Skeleton } from "@mantine/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDigiPa, getDigipointsPa } from "../../store/reducers/sales.reducer";
import { setDigipoints } from "../../store/reducers/currentUser.reducer";
import ModalDistribution from "../../components/digipoints/DpDistribution/ModalDistribution";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import { AiOutlineSearch } from "react-icons/ai";
import { RootState } from "store/store";
import DataNotFound from "components/Module/404/DataNotFound";
import { InvoicesFunction } from "functions/Invoices/InvoicesFunction";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AssingInvoice } from "services/Invoices/invoices.service";

const DigipointsDistribution = () => {
  const [opened, setOpened] = useState(false);
  const [t, i18n] = useTranslation("global");
  const [searchByInvoice, setSearchByInvoice] = useState("");
  const [invoiceData, setInvoiceData] = useState({});
  const data = useSelector(
    (state: RootState) => state.invoices.invoicesDistribution
  );
  const [filtersTable, setFiltersTable] = useState({
    date: "",
    marketSegment: "",
    invoiceattributed: "",
  });
  const { ListInvoices } = InvoicesFunction();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  useEffect(() => {
    const { limit, page, search } = params;
    ListInvoices(`page=${page}&limit=${limit}&search=${search}`);
  }, [params, opened]);

  const uniqueData = (data: string[] | undefined) => {
    const thisData = new Set(data);

    return [...thisData].map((item: any) => {
      return <option value={item}>{item}</option>;
    });
  };

  const handleFilters = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    return setFiltersTable({
      ...filtersTable,
      [e.target.name]: [e.target.value][0],
    });
  };

  const dowloadInvoices = () => {
    const filteredData = data?.content.filter((item) => {
      return item.points > 0;
    });

    const dataCSV = filteredData?.map((item) => {
      // const {
      //   invoiceDetails,
      //   invoices_included,
      //   is_gold,
      //   status,
      //   sku,
      //   ...info
      // } = item;
      return item;
    });

    jsonexport(dataCSV as object, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Channel_Invoices.csv");
    });
  };

  const handlePageClick = (e: { selected: number }) => {
    setParams((prev) => ({ ...prev, page: e.selected + 1 }));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={"100%"}
        centered
        className="modal100"
      >
        <ModalDistribution setOpened={setOpened} invoiceData={invoiceData} />
      </Modal>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
        {/* {data.length !== 0 && <GraphDigiPointsDistribution data={data} />} */}
        <div className="w-full flex lg:flex-row flex-col lg:gap-1 gap-3 mb-4 justify-between">
          <div className="lg:w-full xl:w-2/3 flex lg:flex-row flex-col gap-3 items-center">
            <div className="relative flex w-full gap-3">
              <input
                className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full"
                placeholder={String(t("tabla.buscar"))}
                type="text"
                onBlur={(e) =>
                  setParams((prev) => ({ ...prev, search: e.target.value }))
                }
              />
              <select
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    limit: Number(e.target.value),
                  }))
                }
                className="select lg:select-xs xl:select-sm lg:!text-xs 2xl:!text-sm bg-gray-100"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <div className="absolute h-full items-center flex ml-2">
                <AiOutlineSearch color="#eb1000" />
              </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-5 w-full">
              <select
                name="date"
                onChange={handleFilters}
                className="select lg:select-xs xl:select-sm lg:!text-xs 2xl:!text-sm bg-gray-100"
                value={filtersTable.date}
              >
                <option value="">{t("tabla.ordenarPor")}</option>
                <option value="upDown">{t("tabla.recienteA")}</option>
                <option value="downUp">{t("tabla.antiguoR")}</option>
              </select>
              <select
                name="marketSegment"
                onChange={handleFilters}
                value={filtersTable.marketSegment}
                className="select lg:select-xs xl:select-sm lg:!text-xs 2xl:!text-sm bg-gray-100"
              >
                <option value="">Segmento de Mercado</option>
                {data ? (
                  uniqueData(
                    data?.content.map(
                      ({ invoices }) => invoices.sale.market_segment
                    )
                  )
                ) : (
                  <></>
                )}
              </select>
              <select
                name="invoiceattributed"
                onChange={handleFilters}
                value={filtersTable.invoiceattributed}
                className="select lg:select-xs xl:select-sm lg:!text-xs 2xl:!text-sm bg-gray-100"
              >
                <option value="">Estatus</option>
                <option value="attributed">{t("tabla.asignar")}</option>
                <option value="unassigned">{t("tabla.asignado")}</option>
              </select>
            </div>
          </div>

          <div className="w-1/6 justify-center flex">
            <div
              className="flex items-center h-full gap-1"
              onClick={dowloadInvoices}
            >
              <img src="/assets/Icons/download.png" alt="search" />
              <p className="text-[#1473E6] font-semibold cursor-pointer textShadowHTW">
                {t("digipoints.descargar")}
              </p>
            </div>
          </div>
        </div>
        <br></br>
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-black-500 tableJustify overflow-hidden rounded-md">
              <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.nfactura")}
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Assigned{t("tabla.fecha")}
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Cliente
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Segmento de mercado
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Digipoints
                  </th>
                  <th scope="col" className="py-5 px-6">
                    {t("tabla.asignar")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  <>
                    {data.content
                      // .filter((item) => {
                      //   if (searchByInvoice !== "") {
                      //     return item.invoices_included.includes(
                      //       searchByInvoice
                      //     );
                      //   }

                      //   return item;
                      // })
                      // .sort((a, b) => a.status - b.status)
                      .map((obj, i) => {
                        const index =
                          searchByInvoice !== ""
                            ? data.content.findIndex(({ invoices }) => {
                                return (
                                  obj.invoices.sale.sales_order ===
                                  invoices.sale.sales_order
                                );
                              })
                            : i;

                        return (
                          <tr
                            className={
                              i % 2 !== 0 ? "bg-[#F5F5F5]" : "bg-white"
                            }
                            key={obj?.invoices.sale.sales_order + i}
                          >
                            <td className="py-4 px-6">
                              {obj?.invoices.sale.sales_order}
                            </td>
                            <td className="py-4 px-6 min-w-[130px]">
                              {obj?.invoices.sale.billing_date}
                            </td>
                            <td className="py-4 px-6">
                              {obj?.invoices.sale.end_user_name1}
                            </td>
                            <td className="py-4 px-6">
                              {obj?.invoices.sale.market_segment}
                            </td>
                            <td className="py-4 px-6">{obj?.points}</td>
                            <td className="py-4 px-6">
                              {obj.invoices.assigned_type === "UNASSIGNED" ? (
                                <div
                                  className="flex items-center h-full gap-1"
                                  onClick={() => {
                                    setInvoiceData({ ...obj, index: index });
                                    setOpened(true);
                                  }}
                                >
                                  <img
                                    src="/assets/Icons/add_circle.png"
                                    alt="search"
                                  />
                                  <p className="text-[#1473E6] font-semibold cursor-pointer textShadowHTW">
                                    {t("tabla.aDigipoints")}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center h-full gap-1">
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.14478 1.5271C4.49596 1.5271 1.52734 4.49572 1.52734 8.14453C1.52734 11.7933 4.49596 14.762 8.14478 14.762C11.7936 14.762 14.7622 11.7933 14.7622 8.14453C14.7622 4.49572 11.7936 1.5271 8.14478 1.5271ZM11.5887 5.92674L7.31282 11.0171C7.26592 11.0729 7.20756 11.1181 7.14169 11.1494C7.07582 11.1808 7.00399 11.1976 6.93105 11.1987H6.92246C6.85111 11.1987 6.78057 11.1837 6.7154 11.1546C6.65023 11.1256 6.5919 11.0832 6.54418 11.0301L4.71166 8.99398C4.66513 8.94462 4.62892 8.88645 4.60518 8.8229C4.58144 8.75935 4.57065 8.69169 4.57343 8.62391C4.57621 8.55612 4.59252 8.48958 4.62139 8.42818C4.65025 8.36679 4.6911 8.31179 4.74153 8.26641C4.79196 8.22102 4.85095 8.18618 4.91504 8.16392C4.97912 8.14167 5.04701 8.13244 5.11471 8.1368C5.18241 8.14115 5.24856 8.159 5.30927 8.18928C5.36998 8.21957 5.42402 8.26168 5.46821 8.31315L6.9091 9.91406L10.8092 5.27199C10.8967 5.17085 11.0205 5.10819 11.1538 5.09757C11.2871 5.08695 11.4193 5.12921 11.5217 5.21523C11.6241 5.30124 11.6885 5.4241 11.701 5.55724C11.7136 5.69038 11.6732 5.82311 11.5887 5.92674Z"
                                      fill="#009C3B"
                                    />
                                  </svg>

                                  <p className="text-[#009C3B] font-semibold textShadowHTW">
                                    {t("tabla.asignado")}
                                  </p>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </>
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                      <DataNotFound
                        action={() => {
                          const { limit, page, search } = params;
                          ListInvoices(
                            `page=${page}&limit=${limit}&search=${search}`
                          );
                        }}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {data ? (
              <ReactPaginate
                pageCount={data.total_pages ?? 0}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
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
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DigipointsDistribution;
