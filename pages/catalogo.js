"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import CardMarket from "../components/market/card";
import {
  awardsDelete,
  getDataAwards,
  globalCounterReset,
  productsPush,
} from "../store/reducers/awards.reducer";
import BnEsp from "../components/bannermarket/es";
import BnPor from "../components/bannermarket/br";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { changeLoadingData } from "../store/reducers/loading.reducer";
import { Modal } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";

const catalogo = () => {
  const [globalAwards, setGlobalAwards] = useState([]);
  const route = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const arrayAwards = useSelector((state) => state.awards.awards);
  const car = useSelector((state) => state.awards.shoopingCar);
  const user = useSelector((state) => state.user.user);
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const whiteListDist = [
    "1472188",
    "1654070",
    "13595",
    "901502",
    "19472",
    "1454183",
    "1471126",
  ];

  if (
    user?.distributionChannelId !== null ||
    !whiteListDist.includes(user?.distributionChannel?.soldToParty)
  ) {
    route.push("/dashboard");
    return <></>;
  }

  useEffect(() => {
    if (token && arrayAwards.length === 0) {
      dispatch(getDataAwards(token, user));
    }
  }, [token]);

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    language();
  }, [user]);

  const language = () => {
    if (user?.languageId === 1) {
      return i18n.changeLanguage("por");
    }

    return i18n.changeLanguage("es");
  };

  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;

    return arrayAwards
      .filter((i) => {
        if (filter !== "") {
          return i.name.split(" ")[0] === filter;
        }

        return i;
      })
      .slice(itemOffset, endOffset);
  }, [itemOffset, arrayAwards, filter]);

  const pageCount = useMemo(
    () =>
      Math.ceil(
        arrayAwards.filter((i) => {
          if (filter !== "") {
            return i.name.split(" ")[0] === filter;
          }

          return i;
        }).length / itemsPerPage
      ),
    [arrayAwards, itemsPerPage, filter]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % arrayAwards.length;
    setItemOffset(newOffset);
  };

  const filtersArrayComponent = () => {
    let newArray = [...new Set(arrayAwards.map((i) => i.name.split(" ")[0]))];

    return newArray;
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex lg:flex-row flex-col justify-between gap-6">
        <div className="flex flex-col gap-6">
          <h2 className="font-bold lg:!text-xl xl:!text-2xl 2xl:!text-3xl">
            {t("dashboard.Hola")}, {user.name}
          </h2>
          <p className="lg:!text-sm xl:!text-base 2xl:!text-lg">
            {t("adobeMarket.gana")}
          </p>
        </div>
        <div className="lg:w-1/4 w-1/2 flex items-end">
          <div className="relative flex w-full">
            <input
              className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full bg-[]"
              placeholder={t("tabla.buscar")}
              type="text"
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
            <div className="absolute h-full items-center flex ml-2">
              <AiOutlineSearch color="#eb1000" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:gap-0 gap-6">
        <div className="flex gap-6 items-center lg:justify-start justify-center">
          <p className="font-bold lg:!text-base xl:!text-lg 2xl!text-xl">
            {arrayAwards.length} Gift Cards
          </p>
          <select
            className="select lg:select-sm 2xl:select-md bg-[#F4F4F4] !text-xs"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">{t("adobeMarket.filtrarPro")}</option>
            {filtersArrayComponent().map((i) => {
              return <option value={i}>{i}</option>;
            })}
          </select>
        </div>
        <div className="flex gap-3 mr-3 cursor-pointer items-center lg:justify-start justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3.65625V5.625M9 3.65625C9 3.26687 9.11547 2.88623 9.3318 2.56247C9.54812 2.23871 9.8556 1.98637 10.2153 1.83736C10.5751 1.68835 10.9709 1.64937 11.3528 1.72533C11.7347 1.80129 12.0855 1.9888 12.3609 2.26413C12.6362 2.53947 12.8237 2.89027 12.8997 3.27217C12.9756 3.65407 12.9366 4.04992 12.7876 4.40966C12.6386 4.7694 12.3863 5.07688 12.0625 5.29321C11.7388 5.50954 11.3581 5.625 10.9688 5.625H9M9 3.65625C9 3.26687 8.88454 2.88623 8.66821 2.56247C8.45188 2.23871 8.1444 1.98637 7.78466 1.83736C7.42492 1.68835 7.02907 1.64937 6.64717 1.72533C6.26527 1.80129 5.91447 1.9888 5.63913 2.26413C5.3638 2.53947 5.17629 2.89027 5.10033 3.27217C5.02437 3.65407 5.06335 4.04992 5.21236 4.40966C5.36137 4.7694 5.61371 5.07688 5.93747 5.29321C6.26123 5.50954 6.64187 5.625 7.03125 5.625H9"
              stroke="#1473E6"
              stroke-width="1.125"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M14.625 5.625H3.375C2.75368 5.625 2.25 6.12868 2.25 6.75V8.4375C2.25 9.05882 2.75368 9.5625 3.375 9.5625H14.625C15.2463 9.5625 15.75 9.05882 15.75 8.4375V6.75C15.75 6.12868 15.2463 5.625 14.625 5.625Z"
              stroke="#1473E6"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.625 9.5625V14.625C14.625 15.0726 14.4472 15.5018 14.1307 15.8182C13.8143 16.1347 13.3851 16.3125 12.9375 16.3125H5.0625C4.61495 16.3125 4.18572 16.1347 3.86926 15.8182C3.55279 15.5018 3.375 15.0726 3.375 14.625V9.5625M9 5.625V16.3125"
              stroke="#1473E6"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            className="font-bold lg:!text-xs xl:!text-sm 2xl:!text-base text-info !text-base"
            onClick={() => {
              route.push("/estadoProducto");
            }}
          >
            {t("adobeMarket.estado")}
          </p>
        </div>
      </div>

      <div className="w-full">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && (
          <>
            <div className="w-full">
              <div className="w-full grid lg:grid-cols-3 place-items-center gap-6">
                {currentItems.map((info) => (
                  <CardMarket
                    key={info.id}
                    info={info}
                    setAwards={setGlobalAwards}
                    awards={globalAwards}
                  />
                ))}
              </div>
            </div>
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

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 3, 5],
    },
  };
}

export default catalogo;
