import React, { useEffect, useState, useMemo } from "react";
import {
  CloudDownload,
} from "../../components/icons";
import { useTranslation } from "react-i18next";
import {
  BtnWithImage,
  DropDownReport,
  Table,
} from "../../components/index";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import {
  importCsvFunction,
  importExcelFunction,
  partnertycColumnsExcel,
  partnertycColumnsCsv,
} from "../../components/functions/reports";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { TyCReportsFunctions } from "functions/Reports/TyCReportsFunctions";
import DataNotFound from "components/Module/404/DataNotFound";
import {  MultipleElements } from "services/generical.service";
import { CompaReportTyCPerChannelPPPAPropsny } from "services/Reports/tycreports.service";

const PartnerTycReport = () => {
  const [data, setData] =
    useState<MultipleElements<CompaReportTyCPerChannelPPPAPropsny> | null>(
      null
    );
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { ReportTyC } = TyCReportsFunctions();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const getDataReportTC = () => {
    setLoading(true);
    const { limit, page, search } = params;
    ReportTyC(`page=${page}&limit=${limit}&search=${search}&search_fields=name`)
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getDataReportTC();
  }, [params]);

  /* Download */
  const importFile = async (data: CompaReportTyCPerChannelPPPAPropsny[]) => {
    const updatedData = data.map((record) => {
      let updatedRecord: any = { ...record }; // Copia el registro original para no modificarlo directamente

      // Verificar el valor de partner_status en cada registro
      if (record.is_fully_accepted) {
        // Si es true, asignar "yes"
        updatedRecord.is_fully_accepted = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.is_fully_accepted = "NOT";
      }

      // Verificar el valor de pptyc en cada registro
      if (record.has_partner_principal_policies) {
        // Si es true, asignar "yes"
        updatedRecord.has_partner_principal_policies = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.has_partner_principal_policies = "NOT";
      }

      // Verificar el valor de pptyc en cada registro
      if (record.has_partner_admin_policies) {
        // Si es true, asignar "yes"
        updatedRecord.has_partner_admin_policies = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.has_partner_admin_policies = "NOT";
      }

      return updatedRecord; // Devolver el registro actualizado
    });

    const csvConfig = {
      data: data,
      columns: partnertycColumnsCsv(updatedData),
      downloadTitle: "Partner T&C",
    };
    await importCsvFunction(csvConfig);
  };

  const importFileExcel = async (
    data: CompaReportTyCPerChannelPPPAPropsny[]
  ) => {
    const updatedData = data.map((record) => {
      let updatedRecord: any = { ...record }; // Copia el registro original para no modificarlo directamente

      // Verificar el valor de partner_status en cada registro
      if (record.is_fully_accepted) {
        // Si es true, asignar "yes"
        updatedRecord.is_fully_accepted = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.is_fully_accepted = "NOT";
      }

      // Verificar el valor de pptyc en cada registro
      if (record.has_partner_principal_policies) {
        // Si es true, asignar "yes"
        updatedRecord.has_partner_principal_policies = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.has_partner_principal_policies = "NOT";
      }

      // Verificar el valor de pptyc en cada registro
      if (record.has_partner_admin_policies) {
        // Si es true, asignar "yes"
        updatedRecord.has_partner_admin_policies = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.has_partner_admin_policies = "NOT";
      }

      return updatedRecord; // Devolver el registro actualizado
    });

    const excelConfig = {
      data: updatedData,
      columns: partnertycColumnsExcel,
      downloadTitle: "Partner T&C",
    };

    await importExcelFunction(excelConfig);
  };

  const RenderTable = useMemo(() => {
    if (loading) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-10 text-gray-500">
            <div className="lds-dual-ring"></div>
          </td>
        </tr>
      );
    }

    if (!data) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-10 text-gray-500">
            <DataNotFound action={getDataReportTC} />
          </td>
        </tr>
      );
    }

    return (
      <Table
        containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
        tableStyles={"table-zebra !text-sm !table-fixed"}
        colStyles={"p-2"}
        thStyles={"sticky text-white"}
        cols={
          [
            "Partner Name",
            "Region",
            "Country",
            "Partner Level",
            "Status T&C PA",
            "Status T&C PP",
            "Partner Status",
          ] as never[]
        }
      >
        {data.content.map((data, index: number) => (
          <tr key={index}>
            <th className="text-left py-3 px-2 mx-4">{data.name}</th>
            <th className="text-left py-3 px-2 mx-4">
              {data.country.region.name}
            </th>
            <th className="text-left py-3 px-2 mx-4">{data.country.name}</th>
            <th className="text-left py-3 px-2 mx-4">
              {data.distribution_channel.name}
            </th>
            <td className="text-start mx-2 py-4 px-2">
              {data.has_partner_admin_policies ? (
                <ImCheckboxChecked />
              ) : (
                <ImCheckboxUnchecked />
              )}
            </td>
            <td className="text-start mx-2 py-4 px-2">
              {data.has_partner_principal_policies ? (
                <ImCheckboxChecked />
              ) : (
                <ImCheckboxUnchecked />
              )}
            </td>

            <td className="text-start mx-2 py-4 px-2">
              {data.is_fully_accepted ? (
                <ImCheckboxChecked />
              ) : (
                <ImCheckboxUnchecked />
              )}
            </td>
          </tr>
        ))}
      </Table>
    );
  }, [loading, data]);

  const handlePageClick = (e: { selected: number }) => {
    setParams((prev) => ({ ...prev, page: e.selected + 1 }));
  };

  return (
    <div className="mt-8">
      <div className="pt-2 grid items-center sm:grid-cols-5 grid-cols-2 gap-3">
        <div className="relative flex w-full">
          <input
            className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full"
            placeholder={String(t("tabla.buscar"))}
            type="text"
            onBlur={(e) =>
              setParams((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }))
            }
          />
          <div className="absolute h-full items-center flex ml-2">
            <AiOutlineSearch color="#eb1000" />
          </div>
        </div>

        {/* <SelectInputValue
          placeholder={"Partner ID"}
          value={selectOne}
          data={dataSelectOne}
          icon={<ArrowDown />}
          searchable={true}
          onChange={handleSelectOneChange}
          name={"business"}
        />
        <SelectInputValue
          placeholder={"Partner Name"}
          value={selectTwo}
          data={dataSelectTwo}
          icon={<ArrowDown />}
          searchable={true}
          onChange={handleSelectTwoChange}
          name={"business"}
        />
        <SelectInputValue
          placeholder={"Region"}
          value={selectThree}
          data={dataSelectThree}
          icon={<ArrowDown />}
          searchable={true}
          onChange={handleSelectThreeChange}
          name={"business"}
        /> */}

        <DropDownReport
          icon={<CloudDownload />}
          title={String(t("Reportes.descargar"))}
        >
          <BtnWithImage
            text={t("Reportes.descargar") + " csv"}
            icon={<CloudDownload />}
            styles={
              "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
            }
            onClick={() => (data ? importFile(data?.content) : undefined)}
          />
          <BtnWithImage
            text={t("Reportes.descargar") + " excel"}
            icon={<CloudDownload />}
            styles={
              "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
            }
            onClick={() => (data ? importFileExcel(data?.content) : undefined)}
          />
        </DropDownReport>
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1">
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
      <div className="font-bold flex items-center">
        <h2 className="lg:text-lg sm:text-xl">Users</h2>
      </div>
      <div className="grid grid-rows-1 justify-items-center">{RenderTable}</div>
      <div className="w-full pt-5">
        <ReactPaginate
          pageCount={data?.total_pages as number}
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
      </div>
    </div>
  );
};

export default PartnerTycReport;
