import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerTycData } from "../../../store/reducers/currentUser.reducer";
import {
  ArrowDown,
  CloudDownload,
  UserPerformance as User,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import {
  BtnFilter,
  BtnWithImage,
  DropDownReport,
  SelectInputValue,
  Table,
  TitleWithIcon,
} from "../../../components";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import {
  importCsvFunction,
  importExcelFunction,
  partnertycColumnsExcel,
  partnertycColumnsCsv,
} from "../../../components/functions/reports";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

const PartnerTyc = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [selectOne, setSelectOne] = useState("");
  const [selectTwo, setSelectTwo] = useState("");
  const [selectThree, setSelectThree] = useState("");
  const [searchByInvoice, setSearchByInvoice] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      // Assuming getPartnerTyc is an action creator that returns a function (thunk)
      dispatch(getPartnerTycData(token))
        .then((response) => {
          setData(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded, dispatch, token]);

  const numberToMoney = (quantity = 0) => {
    return `$ ${Number(quantity)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };
  /* FORMATO PARA EL PORCENTAJE */
  const formatAVG = (avgnumber) => {
    const formattedValue = (avgnumber * 100).toFixed(1) + "%";
    return formattedValue;
  };

  /* Download */
  const importFile = async (data) => {
    const updatedData = data.map((record) => {
      let updatedRecord = { ...record }; // Copia el registro original para no modificarlo directamente

      // Verificar el valor de partner_status en cada registro
      if (record.partner_status) {
        // Si es true, asignar "yes"
        updatedRecord.partner_status = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.partner_status = "NOT";
      }

      // Verificar el valor de pptyc en cada registro
      if (record.pptyc) {
        // Si es true, asignar "yes"
        updatedRecord.pptyc = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.pptyc = "NOT";
      }

      // Verificar el valor de pptyc en cada registro
      if (record.patyc) {
        // Si es true, asignar "yes"
        updatedRecord.patyc = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.patyc = "NOT";
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

  const importFileExcel = async (data) => {
    const updatedData = data.map((record) => {
      let updatedRecord = { ...record }; // Copia el registro original para no modificarlo directamente

      // Verificar el valor de partner_status en cada registro
      if (record.partner_status) {
        // Si es true, asignar "yes"
        updatedRecord.partner_status = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.partner_status = "NOT";
      }

      // Verificar el valor de pptyc en cada registro
      if (record.pptyc) {
        // Si es true, asignar "yes"
        updatedRecord.pptyc = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.pptyc = "NOT";
      }

      // Verificar el valor de pptyc en cada registro
      if (record.patyc) {
        // Si es true, asignar "yes"
        updatedRecord.patyc = "YES";
      } else {
        // Si es false, asignar "no"
        updatedRecord.patyc = "NOT";
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

  /* Selects */
  const handleSelectOneChange = (name, value) => {
    setSelectOne(value);
  };
  const handleSelectTwoChange = (name, value) => {
    setSelectTwo(value);
  };
  const handleSelectThreeChange = (name, value) => {
    setSelectThree(value);
  };

  const dataOne = [...new Set(data.map((datos) => datos.idpartners))];

  const dataSelectOne = dataOne.sort().map((idpartners) => ({
    value: idpartners,
    label: idpartners,
  }));

  const dataTwo = [...new Set(data.map((datos) => datos.partnername))];

  const dataSelectTwo = dataTwo.sort().map((partnername) => ({
    value: partnername,
    label: partnername,
  }));

  const dataThee = [...new Set(data.map((datos) => datos.region))];

  const dataSelectThree = dataThee.sort().map((region) => ({
    value: region,
    label: region,
  }));

  /* Filter */
  const filteredUsers = data.filter((datos) => {
    if (
      selectThree &&
      !datos.region.toLowerCase().includes(selectThree.toLowerCase())
    ) {
      return false;
    }
    if (
      selectTwo &&
      !datos.partnername.toLowerCase().includes(selectTwo.toLowerCase())
    ) {
      return false;
    }
    if (
      selectOne &&
      !datos.idpartners
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
    setSelectThree("");
  };
  const formatDate = (dateString) => {
    if (!dateString) {
      return ""; // Devuelve una cadena vacía si la fecha es falsy (por ejemplo, si es undefined o una cadena vacía)
    }

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

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return filteredUsers.slice(itemOffset, endOffset);
  }, [itemOffset, filteredUsers]);

  if (loading && currentItems.length) setLoading(false);

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
      <div className="pt-2 grid items-center grid-rows-1 gap-3">
        <TitleWithIcon icon={<User />} title={"Partner T&C"} />
      </div>
      <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
        <AiOutlineHome
          className="cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        />
        <span>
          <AiOutlineRight />
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push("/reportesDashboard");
          }}
        >
          My Reports
        </span>
        <span>
          <AiOutlineRight />
        </span>
        <span className="font-bold text-[#1473E6]">{"Partner T&C"}</span>
      </div>
      <div className="pt-2 grid items-center sm:grid-cols-5 grid-cols-2 gap-3">
        <SelectInputValue
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
        />
        <BtnFilter
          text={t("Reportes.limpiar_filtros")}
          styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
          onClick={clearSelects}
        />
        <DropDownReport
          icon={<CloudDownload />}
          title={t("Reportes.descargar")}
        >
          <BtnWithImage
            text={t("Reportes.descargar") + " csv"}
            icon={<CloudDownload />}
            styles={
              "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
            }
            onClick={() => importFile(data)}
          />
          <BtnWithImage
            text={t("Reportes.descargar") + " excel"}
            icon={<CloudDownload />}
            styles={
              "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
            }
            onClick={() => importFileExcel(data)}
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
      <div className="grid grid-rows-1 justify-items-center">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && (
          <>
            <Table
              containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
              tableStyles={"table-zebra !text-sm"}
              colStyles={"p-2"}
              thStyles={"sticky text-white"}
              cols={[
                "Partner ID",
                "Partner Name",
                "Region",
                "Country",
                "Partner Level",
                "Partner Status",
                "Status T&C PP",
                "Date T&C PP",
                "Status T&C PA",
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
                      <th className="text-left py-3 px-2 mx-4">
                        {data.idpartners}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.partnername}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.region}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.country}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.partnerlevel}
                      </th>
                      <td className="text-start mx-2 py-4 px-2">
                        {data.partner_status ? (
                          <ImCheckboxChecked />
                        ) : (
                          <ImCheckboxUnchecked />
                        )}
                      </td>
                      <td className="text-start mx-2 py-4 px-2">
                        {data.pptyc ? (
                          <ImCheckboxChecked />
                        ) : (
                          <ImCheckboxUnchecked />
                        )}
                      </td>
                      <th className="text-left py-3 px-2 mx-4">
                        {formatDate(data.pptycdate)}
                      </th>
                      <td className="text-start mx-2 py-4 px-2">
                        {data.patyc ? (
                          <ImCheckboxChecked />
                        ) : (
                          <ImCheckboxUnchecked />
                        )}
                      </td>
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

export default PartnerTyc;
