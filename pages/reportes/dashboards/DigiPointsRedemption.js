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
import axios from "axios";
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
  const { user, token } = useSelector((state) => state.currentUser);
  const [selectOne, setSelectOne] = useState("");
  const [selectTwo, setSelectTwo] = useState("");
  const [searchByInvoice, setSearchByInvoice] = useState("");
  const [t, i18n] = useTranslation("global");
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
    const fetchDigiPointsRedemption = async () => {
      try {
        if (user) {
          setLoading(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=04c31aa2-84b3-4d18-860d-21b2a42d091b`,
            {},
            {
              headers: {
                Authorization: `Bearer ${user.token ?? token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("DigiPoints Redemption API response:", response);
          setData(response?.data?.result ?? []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching DigiPoints Redemption data:", error);
        setData([]);
        setLoading(false);
      }
    };

    fetchDigiPointsRedemption();
  }, [user, token]);

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
      !(user.ordernumber?.toLowerCase() || "")
        .includes(selectTwo.toLowerCase())
    ) {
      return false;
    }
    if (
      selectOne &&
      !(user.email?.toString().toLowerCase() || "")
        .includes(selectOne.toLowerCase())
    ) {
      return false;
    }
    if (
      searchByInvoice &&
      !(user.email?.toString().toLowerCase() || "")
        .includes(searchByInvoice.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  /* Clear Filter */
  const clearSelects = () => {
    setSelectOne("");
    setSelectTwo("");
    setSearchByInvoice("");
  };

  /* Download Redemption*/
  const importFile = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=04c31aa2-84b3-4d18-860d-21b2a42d091b&download=true&name=digipoints_redemption_request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token ?? token}`,
            "Content-Type": "application/json",
          },
          responseType: 'blob',
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'digipoints_redemption_request.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading DigiPoints Redemption data:", error);
    }
  };

  const importFileExcel = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=04c31aa2-84b3-4d18-860d-21b2a42d091b&download=true&name=digipoints_redemption_request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token ?? token}`,
            "Content-Type": "application/json",
          },
          responseType: 'blob',
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'digipoints_redemption_request.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading DigiPoints Redemption data:", error);
    }
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
        <SearchInput
          placeholder={t("Reportes.buscar_por_email")}
          value={searchByInvoice}
          onChange={(e) => setSearchByInvoice(e.target.value)}
          icon={<SearchIcon />}
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
          onClick={() => importFile()}
        />
          <BtnWithImage
           text={t("Reportes.descargar") + " excel"}
          icon={<CloudDownload />}
          styles={
            "bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
          }
          onClick={() => importFileExcel()}
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
              { rowStyles:"", sort:true, symbol:"", identity: "email", columnName: "Email" },
              { symbol:"", identity: "name", columnName: "Name" },
              { symbol:"", identity: "last_name", columnName: "Last Name" },
              { symbol:"", identity: "role_name", columnName: "Role" },
              { symbol:"", identity: "country", columnName: "Country" },
              { symbol:"", identity: "company_name", columnName: "Company" },
              { symbol:"", identity: "ordernumber", columnName: "Request ID" },
              { symbol:"", identity: "digipoint_substract", columnName: "DigiPoints" },
              { symbol:"", identity: "total_quantity", columnName: "Total Quantity" },
              { symbol:"DATE", identity: "created_at", columnName: "Created At" },
              { symbol:"", identity: "status_name", columnName: "Status" },
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
