import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSalePerformance } from "../../../store/reducers/sales.reducer";
import {
  ArrowDown,
  CloudDownload,
  SearchIcon,
  UserPerformance as User,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import {
  BtnFilter,
  BtnWithImage,
  SearchInput,
  SelectInputValue,
  Table,
  TitleWithIcon,
} from "../../../components";
import * as XLSX from "xlsx";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SalesPerformance = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [selectOne, setSelectOne] = useState("");
  const [searchByInvoice, setSearchByInvoice] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const products = useSelector((state) => state.sales.products);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getUserSalePerformance(token))
        .then((response) => {
          setLoading(false);
          setData(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded]);

  /* Download */
  const importFile = (data) => {
    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "User Performance.csv");
    });
  };

  /* Selects */
  const handleSelectOneChange = (name, value) => {
    setSelectOne(value);
  };

  const dataOne = [...new Set(data.map((user) => user.reseller_or_dist_name))];

  const dataSelectOne = dataOne.map((companyName) => ({
    value: companyName,
    label: companyName,
  }));

  /* Filter */
  const filteredUsers = data.filter((user) => {
    if (
      selectOne &&
      !user.reseller_or_dist_name
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
  };

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return filteredUsers.slice(itemOffset, endOffset);
  }, [itemOffset, filteredUsers]);

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
        <TitleWithIcon icon={<User />} title={t("Reportes.user_performance")} />
      </div>
      <div className="pt-2 grid items-center sm:grid-cols-5 grid-rows-1 gap-3">
        <SearchInput
          image={<SearchIcon />}
          placeHolder={"Email"}
          stylesContainer={""}
          value={searchByInvoice}
          onChange={(e) => setSearchByInvoice(e.target.value)}
          stylesInput={
            "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
          }
        />
        <SelectInputValue
          placeholder={t("Nombre de la compañia")}
          value={selectOne}
          data={dataSelectOne}
          icon={<ArrowDown />}
          onChange={handleSelectOneChange}
          name={"business"}
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
            "bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none"
          }
          onClick={() => importFile(data)}
        />
      </div>
      {/* <div className="grid sm:grid-cols-2 md:grid-rows-1 grid-rows-1 w-full gap-2">
        <CardChart title={t("Reportes.metas_vs_cumplimiento")} paragraph="">
          <BarChar
            title={t("Reportes.ventas_mensuales")}
            colorBarOne={"black"}
            colorBarTwo={"#2799F6"}
            dataLeyend={[
              t("Reportes.ingresos_esperados"),
              t("Reportes.ingreso_actual"),
            ]}
            dataOne={dataOne}
            dataTwo={dataTwo}
            xValues={xValuesBar}
          />
        </CardChart>
        <CardChart title={t("Reportes.digiponits")}>
          <LineChart
            title={t("Reportes.dp_cargados_mensualmente")}
            color={"red"}
            xValues={xValuesLine}
            data={datas}
          />
        </CardChart>
      </div> */}
      <div className="grid sm:grid-cols-2 grid-rows-1">
        <div className="grid sm:grid-cols-3 grid-rows-1 sm:justify-items-start justify-items-center mt-3">
          <div className="font-bold flex items-center">
            <h2 className="lg:text-lg sm:text-xl">Users</h2>
          </div>
          {/* <div className="grid col-span-2 sm:w-[55%] w-[60%]">
            <DropDownReport icon={<ArrowDown />} title={t("Reportes.periodo")}>
              <li>
                <a>Período 1</a>
              </li>
              <li>
                <a>Período 2</a>
              </li>
            </DropDownReport>
          </div> */}
        </div>
        <div className="grid sm:grid-cols-2 grid-rows-1 sm:justify-items-end justify-items-center mt-3">
          {/* <InputReporte
            image={<SearchIcon />}
            placeHolder={t("Reportes.buscar")}
            stylesContainer={"mt-2"}
            stylesInput={
              "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
            }
            stylesImage={"pb-0"}
          /> */}
        </div>
      </div>
      <div className="grid grid-rows-1 justify-items-center pt-5">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && (
          <>
            <Table
              containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
              tableStyles={"table-zebra !text-sm"}
              colStyles={"p-2"}
              thStyles={"sticky text-white"}
              cols={[
                "Email",
                "Name",
                "Country",
                "Region",
                "Company ID",
                "Company Name",
                "Company Level",
                "Company Type",
                "VIP CC Renewal",
                "VIP CC New business",
                "VIP DC Renewal",
                "VIP DC New Business",
                "VMP CC Renewal",
                "VMP CC New business",
                "VMP DC Renewal",
                "VMP DC New Business",
                "VIP Revenue Q1",
                "VIP Revenue Q2",
                "VIP Revenue Q3",
                "VIP Revenue Q4",
                "VMP Revenue Q1",
                "VMP Revenue Q2",
                "VMP Revenue Q3",
                "VMP Revenue Q4",
                "Revenue Q1",
                "Revenue Q2",
                "Revenue Q3",
                "Revenue Q4",
                "Actual Revenue",
                "Sales DigiPoints",
                "Redemptions",
              ]}
            >
              {currentItems &&
                [...currentItems]
                  .filter((item) => {
                    if (searchByInvoice !== "") {
                      return item.email.startsWith(searchByInvoice);
                    }

                    return item;
                  })
                  .map((data, index) => (
                    <tr key={index}>
                      <th className="text-left py-3 px-6">{data.email}</th>
                      <th className="text-left py-3 px-6">{data.name}</th>
                      <th className="text-left py-3 px-6">{data.country_id}</th>
                      <th className="text-left py-3 px-6">{data.region}</th>
                      <th className="text-left py-3 px-6">
                        {data.reseller_or_dist_id}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.reseller_or_dist_name}
                      </th>
                      <th className="text-left py-3 px-6">{data.dcname}</th>
                      <th className="text-left py-3 px-6">{data.rtype}</th>
                      <th className="text-left py-3 px-6">
                        {data.vip_cc_renewal}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vip_cc_newbusiness}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vip_dc_renewal}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vip_dc_newbusiness}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vmp_cc_renewal}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vmp_cc_newbusiness}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vmp_dc_renewal}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vmp_dc_newbusiness}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vip_revenue_q1}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vip_revenue_q2}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vip_revenue_q3}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vip_revenue_q4}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vmp_revenue_q1}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vmp_revenue_q2}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vmp_revenue_q3}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.vmp_revenue_q4}
                      </th>
                      <th className="text-left py-3 px-6">{data.revenue_q1}</th>
                      <th className="text-left py-3 px-6">{data.revenue_q2}</th>
                      <th className="text-left py-3 px-6">{data.revenue_q3}</th>
                      <th className="text-left py-3 px-6">{data.revenue_q4}</th>
                      <th className="text-left py-3 px-6">
                        {data.revenue_actual}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.sales_points}
                      </th>
                      <th className="text-left py-3 px-6">
                        {data.redenciones}
                      </th>
                    </tr>
                  ))}
            </Table>
          </>
        )}
      </div>
      <div className="w-full pt-5">
        {!loading && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default SalesPerformance;
