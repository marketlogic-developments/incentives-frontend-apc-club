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

  useEffect(() => {
    if (token && arrayAwards.length === 0) {
      dispatch(getDataAwards(token));
    }
  }, [token]);

  const handleShoppingCard = () => {
    dispatch(changeLoadingData(true));
    Cookies.set("shoppCar", JSON.stringify(globalAwards), { expires: 365 });
    dispatch(productsPush([...car, ...globalAwards]));
    awardsDelete();
    route.push("/shoppingCar");
  };

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    language();
  }, [user]);

  const language = () => {
    if (user?.person[0]?.languageId === 1) {
      return i18n.changeLanguage("por");
    }

    return i18n.changeLanguage("es");
  };

  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return arrayAwards.slice(itemOffset, endOffset);
  }, [itemOffset, arrayAwards]);
  const pageCount = useMemo(
    () => Math.ceil(arrayAwards.length / itemsPerPage),
    [arrayAwards, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % arrayAwards.length;
    setItemOffset(newOffset);
  };

  return (
    <ContainerContent pageTitle={t("menu.catalogo")}>
      <div className="m-6 flex flex-col gap-4">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-3xl">{t("menu.catalogo")}</h1>
        </div>
        {user?.person[0]?.languageId === 1 ? <BnPor /> : <BnEsp />}
        <div className="w-full h-full">
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(changeLoadingData(true));
              route.push("/estadoProducto");
            }}
          >
            {t("adobeMarket.estado")}
          </button>
        </div>

        <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
          <div className="none">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
              <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                <option value="">Menor a mayor precio</option>
                <option value="fully-furnished">Mayor a menor precio</option>
                <option value="partially-furnished">Orden Alfabético</option>
                <option value="not-furnished">Más recientes</option>
              </select>
              <div></div>
            </div>
          </div>
          <br></br>
          <br></br>
          {loading && <div className="lds-dual-ring"></div>}
          {!loading && (
            <div className="container">
              <div className="rowcards">
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
          )}
          {!loading && (
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
          )}
        </div>
      </div>
      {globalAwards.length > 0 && (
        <div className="h-16 max-w-full bottom-0 sticky self-center flex bg-primary justify-center items-center withButtonsBuy gap-5 ">
          <div>
            <button className="btn btn-primary" onClick={handleShoppingCard}>
              {t("adobeMarket.carrito")}
            </button>
          </div>
        </div>
      )}
    </ContainerContent>
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
