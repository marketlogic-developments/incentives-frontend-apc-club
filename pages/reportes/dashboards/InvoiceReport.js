import React, { useEffect, useState, useMemo } from "react";
import {
  ArrowDown,
  CloudDownload,
  SearchIcon,
  UserPerformance,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getInvoiceReport,
} from "../../../store/reducers/sales.reducer";
import {
  BtnFilter,
  BtnWithImage,
  Table,
  SelectInputValue,
  SearchInput,
  TitleWithIcon,
} from "../../../components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";


const InvoiceReport = () => {
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [t, i18n] = useTranslation("global");
  const [selectOne, setSelectOne] = useState("");
  const [selectTwo, setSelectTwo] = useState("");
  const [selectThree, setSelectThree] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [searchByInvoice, setSearchByInvoice] = useState("");
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
      dispatch(getInvoiceReport(token))
        .then((response) => {
          setLoading(false);
          setData(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded, token]);

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

  const dataOne = [...new Set(data.map((user) => user.business_unit))];

  const dataSelectOne = dataOne.map((business_unit) => ({
    value: business_unit,
    label: business_unit,
  }));

  const dataTwo = [...new Set(data.map((user) => user.business_type))];

  const dataSelectTwo = dataTwo.map((business_type) => ({
    value: business_type,
    label: business_type,
  }));

  const dataThree = [...new Set(data.map((user) => user.company_name))];

  const dataSelectThree = dataThree.map((company_name) => ({
    value: company_name,
    label: company_name,
  }));

  /* Filter */
  const filteredUsers = data.filter((user) => {
    if (
      selectThree &&
      !user.company_name
        .toLowerCase()
        .includes(selectThree.toLowerCase())
    ) {
      return false;
    }
    if (
      selectTwo &&
      !user.business_type
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
          icon={<UserPerformance />}
          title={t("Reportes.invoice_report")}
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
        {t("Reportes.invoice_report")}
        </span>
      </div>
      <div className="grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SearchInput
          image={<SearchIcon />}
          placeHolder={"Invoice"}
          stylesContainer={""}
          value={searchByInvoice}
          onChange={(e) => setSearchByInvoice(e.target.value)}
          stylesInput={
            "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
          }
        />
        <SelectInputValue
          placeholder={"Company Name"}
          value={selectThree}
          data={dataSelectThree}
          icon={<ArrowDown />}
          searchable={true}
          onChange={handleSelectThreeChange}
          name={"company_name"}
        />
        <SelectInputValue
          placeholder={"Business Unit"}
          value={selectOne}
          data={dataSelectOne}
          icon={<ArrowDown />}
          onChange={handleSelectOneChange}
          name={"business"}
        />
        <SelectInputValue
          placeholder={"Business Type"}
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
      <div className="grid overflow-x-hidden w-full">
        {loading ? (
          <div className="lds-dual-ring"></div>
        ) : (
          <>
            <div className="grid grid-rows-1 justify-items-center pt-5">
              <Table
                containerStyles={
                  "mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"
                }
                tableStyles={"table-zebra !text-sm"}
                colStyles={"p-2"}
                thStyles={"sticky text-white"}
                cols={
                  [
                    "Membership ID",
                    "Company Name",
                    /* "Company Type", */
                    "Company Level",
                    "User Name",
                    "User Role",
                    "Invoice",
                    /* "Material Sku", */
                    /* "Licensing Contract", */
                    /* "Major Licensing Programid",
                    "Business Unit",
                    "Business Type",
                    "Month", */
                    "Date",
                    "Client",
                    /* "Product Name", */
                    /* "Quantity", */
                    /* "Total Sales Revenue (USD)",
                    "Revenue by User (USD)",
                    "Total Sales DigiPoints",
                    "Sales DigiPoints by User",
                    "Promotions DigiPoints",
                    "Promotions Name", */
                    "Revenue by user (USD)",
                    "Sales DigiPoints by user",
                    "Promotions DigiPoints",
                    "Promotions Name",
                  ]
                }
              >
                {currentItems &&
                  [...currentItems]
                    .filter((item) => {
                      if (searchByInvoice !== "") {
                        return item.invoice.startsWith(searchByInvoice);
                      }

                      return item;
                    })
                    .map((data, index) => (
                      <tr key={index}>
                        <td className="text-start mx-2 py-4 px-2">{data.company_id}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.company_name}</td>
                        {/* <td className="text-start mx-2 py-4 px-2">{data.partner_type}</td> */}
                        <td className="text-start mx-2 py-4 px-2">{data.partner_type}</td>
                        {/* <td className="text-start mx-2 py-4 px-2">{data.business_unit}</td> */}
                        <td className="text-start mx-2 py-4 px-2">{data.user}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.user_rol}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.invoice}</td>
                        {/* <td className="text-start mx-2 py-4 px-2">{data.material_sku}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.licensing_contract}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.major_licensing_program_id}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.business_unit}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.business_type}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.month}</td> */}
                        <td className="text-start mx-2 py-4 px-2">{data.date}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.client}</td>
                        {/* <td className="text-start mx-2 py-4 px-2">{data.product}</td> */}
                        <td className="text-start mx-2 py-4 px-2">{numberToMoney(data.amount_by_user)}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.digipoints_by_user}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.puntosxpromo}</td>
                        <td className="text-start mx-2 py-4 px-2">{data.promoname}</td>
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

export default InvoiceReport;
