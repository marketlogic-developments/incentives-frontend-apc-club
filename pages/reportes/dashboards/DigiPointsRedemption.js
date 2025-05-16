import React, { useEffect, useState, useMemo } from "react";
import {
  BtnFilter,
  BtnWithImage,
  SelectInputValue,
  TitleWithIcon,
  DropDownReport,
} from "../../../components";
import {
  ArrowDown,
  CloudDownload,
  Request,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import SortedTable from "../../../components/table/SortedTable";

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
  const [t] = useTranslation("global");
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchDigiPointsRedemption = async () => {
      try {
        if (user) {
          setLoading(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a578`,
            {},
            {
              headers: {
                Authorization: `Bearer ${user.token ?? token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setData((response?.data?.result ?? []).map((item) => ({
            email: item["User Name"] ?? "",
            name: item["First Name"] ?? "",
            last_name: item["Last Name"] ?? "",
            role_name: item["User Role"] ?? "",
            region: item["Region"] ?? "",
            country: item["Country"] ?? "",
            membership_id: item["Membership ID"] ?? "",
            company_name: item["Company Name"] ?? "",
            company_level: item["Company Level"] ?? "",
            ordernumber: item["Order ID"] ?? "",
            status_name: item["Status"] ?? "",
            total_quantity: item["Quantity"] ?? 0,
            product_name: item["Product Name"] ?? "",
            total_price: item["Value Gift card"] ?? 0,
            digipoint_substract: item["DigiPoints"] ?? "0",
            created_date: item["Created Date"] ?? "",
            created_hour: item["Created Hour"] ?? "",
            stage: item["Stage"] ?? "",
          })));
          setLoading(false);
        }
      } catch (error) {
        setData([]);
        setLoading(false);
      }
    };

    fetchDigiPointsRedemption();
  }, [user, token]);

  const handleSelectOneChange = (value) => {
    setSelectOne(value ?? "");
  };

  const handleSelectTwoChange = (value) => {
    setSelectTwo(value ?? "");
  };

  const dataSelectOne = [...new Set(data.map((user) => user.email))].map((email) => ({
    value: email,
    label: email,
  }));

  const dataSelectTwo = [...new Set(data.map((user) => user.ordernumber))].map((order) => ({
    value: order,
    label: order,
  }));

  const filteredUsers = useMemo(() => {
    return data.filter((user) => {
      const order = (user.ordernumber ?? "").trim().toLowerCase();
      const email = (user.email ?? "").trim().toLowerCase();

      const selectedOrder = selectTwo.trim().toLowerCase();
      const selectedEmail = selectOne.trim().toLowerCase();

      if (selectTwo && order !== selectedOrder) return false;
      if (selectOne && email !== selectedEmail) return false;
      return true;
    });
  }, [data, selectOne, selectTwo]);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return filteredUsers.slice(itemOffset, endOffset);
  }, [itemOffset, itemsPerPage, filteredUsers]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredUsers.length / itemsPerPage);
  }, [filteredUsers, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  const clearSelects = () => {
    setSelectOne("");
    setSelectTwo("");
  };

  const importFileExcel = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a578&download=true&name=digipoints_redemption_request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token ?? token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "digipoints_redemption_request.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) { }
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
        <AiOutlineHome className="cursor-pointer" onClick={() => router.push("/dashboard")} />
        <span><AiOutlineRight /></span>
        <span className="cursor-pointer" onClick={() => router.push("/reportesDashboard")}>
          My Reports
        </span>
        <span><AiOutlineRight /></span>
        <span className="font-bold text-[#1473E6]">
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
              text={t("Reportes.descargar") + " excel"}
              icon={<CloudDownload />}
              styles="bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
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
              { key: "email", rowStyles: "", sort: true, symbol: "", identity: "email", columnName: "User Name" },
              { key: "name", symbol: "", identity: "name", columnName: "FirstName" },
              { key: "last_name", symbol: "", identity: "last_name", columnName: "LastName" },
              { key: "role_name", symbol: "", identity: "role_name", columnName: "User Role" },
              { key: "country", symbol: "", identity: "country", columnName: "Country" },
              { key: "company_name", symbol: "", identity: "company_name", columnName: "Company Name" },
              { key: "ordernumber", symbol: "", identity: "ordernumber", columnName: "orden" },
              { key: "status_name", symbol: "", identity: "status_name", columnName: "estatus" },
              { key: "total_quantity", symbol: "", identity: "total_quantity", columnName: "Quanty" },
              { key: "total_price", symbol: "", identity: "total_price", columnName: "Value Gift card" },
              { key: "digipoint_substract", symbol: "", identity: "digipoint_substract", columnName: "DigiPoints" },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            paginate={true}
            pageCount={pageCount}
            currentItems={currentItems}
            searchByInvoice={searchByInvoice}
            fieldSearchByInvoice={"email"}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
    </div>
  );
};

export default DigiPointsRedemption;