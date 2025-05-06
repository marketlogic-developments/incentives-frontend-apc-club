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
  Request,
  SearchIcon,
} from "../../../components/icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersAll
} from "../../../store/reducers/orders.reducer";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import SortedTable from "../../../components/table/SortedTable";
import { digipointRedemtionColumnsCsv, digipointRedemtionColumnsExcel, importCsvFunction, importExcelFunction } from "../../../components/functions/reports";

const DigiPointsRedemption = () => {
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
    return `$ ${Math.trunc(Number(quantity))
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
      dispatch(getOrdersAll(token))
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

  const dataOne = [...new Set(data.map((user) => user.email))];

  const dataSelectOne = dataOne.map((email) => ({
    value: email,
    label: email,
  }));

  const dataTwo = [...new Set(data.map((user) => user.ordernumber))];

  const dataSelectTwo = dataTwo.map((business) => ({
    value: business,
    label: business,
  }));

  /* Filter */
  const filteredUsers = data.filter((user) => {
    if (
      selectTwo &&
      !user.ordernumber
        .toLowerCase()
        .includes(selectTwo.toLowerCase())
    ) {
      return false;
    }
    if (
      selectOne &&
      !user.email
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

  /* Download Redemption*/
  const importFile = async (data) => {
    const columns = digipointRedemtionColumnsCsv(data);
    const csvConfig = {
      data: data,
      columns: columns,
      downloadTitle: "Digipoints Redemption",
    };

    await importCsvFunction(csvConfig);
  };

  const importFileExcel = async (data) => {
    const excelConfig = {
      data: data,
      columns: digipointRedemtionColumnsExcel,
      downloadTitle: "Digipoints Redemption",
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
          icon={<Request />}
          title={t("Reportes.digiPoints_redemption_request")}
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
        {t("Reportes.digiPoints_redemption_request")}
        </span>
      </div>
      <div className="grid items-center sm:grid-cols-4 grid-rows-1 gap-3">
        <SelectInputValue
          placeholder={"Request ID"}
          value={selectTwo}
          data={dataSelectTwo}
          icon={<ArrowDown />}
          onChange={handleSelectTwoChange}
          name={"business"}
          searchable={true}
        />
        <SelectInputValue
          placeholder={"Email"}
          value={selectOne}
          data={dataSelectOne}
          icon={<ArrowDown />}
          onChange={handleSelectOneChange}
          name={"business"}
          searchable={true}
        />
        <div className="sm:flex grid sm:grid-cols-3 grid-cols-2 items-center">
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
        
      </div>
      <div className="grid overflow-x-auto w-full">
        {!loading && (
            <SortedTable
            containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
            tableStyles={"table-zebra !text-sm"}
            colStyles={"p-2"}
            thStyles={"sticky text-white"}
            cols={[
              { rowStyles:"", sort:true, symbol:"", identity: "email", columnName: "User Email" },
              { symbol:"", identity: "name", columnName: "First Name" },
              { symbol:"", identity: "last_name", columnName: "Last Name" },
              { symbol:"", identity: "role_name", columnName: "User Role" },
              { symbol:"", identity: "region", columnName: "Region" },
              { symbol:"", identity: "country", columnName: "Country" },
              { symbol:"", identity: "company_id", columnName: "Company ID" },
              { symbol:"", identity: "company_name", columnName: "Company Name" },
              { symbol:"", identity: "company_level", columnName: "Company Level" },
              { symbol:"", identity: "pp_email", columnName: "Partner Principal User Email" },
              { symbol:"", identity: "pp_tos", columnName: "Partner Principal Accepted ToS" },
              { symbol:"", identity: "ordernumber", columnName: "Request ID" },
              { symbol:"", identity: "digipoint_substract", columnName: "Redeemed DigiPoints" },
              { symbol:"", identity: "total_quantity", columnName: "Quantity" },
              { symbol:"", identity: "total_price", columnName: "Amount (USD)" },
              { symbol:"DATE", identity: "created_at", columnName: "Redeemed On" },
              { symbol:"", identity: "status_name", columnName: "Reward Status" },
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

export default DigiPointsRedemption;
