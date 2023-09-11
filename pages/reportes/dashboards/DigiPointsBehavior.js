import React, { useEffect, useState, useMemo } from "react";
import {
  BtnFilter,
  BtnWithImage,
  Table,
  SelectInputValue,
  SearchInput,
  TitleWithIcon,
  DropDownReport,
} from "../../../components";
import { saveAs } from "file-saver";
import jsonexport from "jsonexport";
import {
  ArrowDown,
  CloudDownload,
  SearchIcon,
} from "../../../components/icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getDigiPointsByBeha
} from "../../../store/reducers/sales.reducer";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import SortedTable from "../../../components/table/SortedTable";
import { digiPointsByBehaviorCsv, digiPointsByBehaviorExel, importCsvFunction, importExcelFunction } from "../../../components/functions/reports";
import Promotion from "../../../components/icons/Reportes/Promotion";

const DigiPointsBehavior = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
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
  const router = useRouter();
  
  const numberToMoney = (quantity = 0) => {
    return `$ ${Number(quantity)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  /* Loader setter */
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  /* Querys */
  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getDigiPointsByBeha(token))
        .then((response) => {
          setLoading(false);
          setData(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded]);

  /* Selects */
  const handleSelectOneChange = (name, value) => {
    setSelectOne(value);
  };

  const handleSelectTwoChange = (name, value) => {
    setSelectTwo(value);
  };

  const dataOne = [...new Set(data.map((user) => user.user_name))];

  const dataSelectOne = dataOne.map((email) => ({
    value: email,
    label: email,
  }));

  const dataTwo = [...new Set(data.map((user) => user.company_name))];

  const dataSelectTwo = dataTwo.map((business) => ({
    value: business,
    label: business,
  }));

  /* Filter */
  const filteredUsers = data.filter((user) => {
    if (
      selectTwo &&
      !user.company_name
        .toLowerCase()
        .includes(selectTwo.toLowerCase())
    ) {
      return false;
    }
    if (
      selectOne &&
      !user.user_name
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

  /* Download Promo Report*/
  const importFile = async (data) => {
    const columns = digiPointsByBehaviorCsv(data);
    const csvConfig = {
      data: data,
      columns: columns,
      downloadTitle: "Behavior Report",
    };

    await importCsvFunction(csvConfig);
  };

  const importFileExcel = async (data) => {
    const excelConfig = {
      data: data,
      columns: digiPointsByBehaviorExel,
      downloadTitle: "Behavior Report",
    };

    await importExcelFunction(excelConfig);
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
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<Promotion />}
          title={"Behavior Report"}
        />
      </div>
      <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
        <AiOutlineHome className="cursor-pointer"
          onClick={() => {
          router.push("/dashboard");
          }}/>
        <span><AiOutlineRight /></span>
        <span className="cursor-pointer"
          onClick={() => {
          router.push("/reportesDashboard");
          }}
        >
        My Reports
        </span>
        <span><AiOutlineRight /></span>
        <span className="font-bold text-[#1473E6]"
        >
        {"Behavior Report"}
        </span>
      </div>
      <div className="grid items-center sm:grid-cols-5 grid-rows-1 gap-3">
      <SelectInputValue
          placeholder={"Company Name"}
          value={selectTwo}
          data={dataSelectTwo}
          icon={<ArrowDown />}
          onChange={handleSelectTwoChange}
          name={"business"}
        />
        <SelectInputValue
          placeholder={"Email"}
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
        <DropDownReport
          icon={<CloudDownload />}
          title={t("Reportes.descargar")}
        >
          <BtnWithImage
          text={t("Reportes.descargar")}
          icon={<CloudDownload />}
          styles={
            "bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
          }
          onClick={() => importFile(filteredUsers)}
        />
          <BtnWithImage
           text={t("Reportes.descargar") + " excel"}
          icon={<CloudDownload />}
          styles={
            "bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
          }
          onClick={() => importFileExcel(filteredUsers)}
        />
        </DropDownReport>
        
      </div>
      <div className="grid overflow-x-auto w-full">
        {!loading && (
            <SortedTable
            containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
            tableStyles={"table-zebra !text-sm"}
            colStyles={"p-2"}
            thStyles={"sticky text-white"}
            cols={[
              { rowStyles:"", symbol:"", identity: "behavior_name", columnName: "Behavior Name" },
              { symbol:"", sort:true, identity: "behavior_digipoints", columnName: "Behavior DigiPoints" },
              { symbol:"", sort:true, identity: "user_name", columnName: "User Name" },
              { symbol:"", identity: "firstname", columnName: "FirstName" },
              { symbol:"", identity: "lastname", columnName: "LastName" },
              { symbol:"", identity: "user_role", columnName: "User Role" },
              { symbol:"", identity: "user_region", columnName: "Region" },
              { symbol:"", identity: "user_country", columnName: "Country" },
              { symbol:"", identity: "membership_id", columnName: "Membership ID" },
              { symbol:"", identity: "company_name", columnName: "Company Name" },
              { symbol:"", identity: "company_type", columnName: "Company Type" },
              { symbol:"", identity: "company_level", columnName: "Company Level" },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            paginate={true}
            pageCount={pageCount}
            currentItems={currentItems}
            searchByInvoice={searchByInvoice}
            fieldSearchByInvoice={'email'}
            handlePageClick={handlePageClick}
          />
          )}
      </div>
    </div>
  );
};

export default DigiPointsBehavior;
