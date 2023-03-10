import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import DigipointsDistribution from "../components/digipoints/DigipointsDistribution";
import MakeTeam from "../components/digipoints/MakeTeam";
import { getUsers, getUsersData } from "../store/reducers/users.reducer";

const digipoints = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const digipoints = useSelector((state) => state.user.digipoints);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [searchInvoice, setSearchInvoice] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (user?.roleId === 3) {
      return setPage(1);
    }

    dispatch(getUsersData(token));
  }, []);

  const datosdummy = [];

  const search = useMemo(() => {
    const newData = datosdummy.map((data) => ({
      ...data,
      fecha: new Date(data.fecha),
    }));

    if (searchInvoice !== "") {
      return datosdummy
        .filter(({ invoice }) => {
          return invoice.startsWith(searchInvoice.toLocaleLowerCase());
        })
        .map((data, index) => (
          <tr key={index} className="bg-white border-b dark:border-gray-500">
            <td className="py-4 px-2">{data.invoice}</td>
            <td className="py-4 px-2">{data.digipoints}</td>
            <td className="py-4 px-2">{data.NoSillas}</td>
            <td className="py-4 px-2">{data.fecha}</td>
          </tr>
        ));
    }

    if (selectDate !== "") {
      const dataSort = newData.sort((a, b) => {
        if (selectDate === "upDown") {
          return b.fecha - a.fecha;
        }

        return a.fecha - b.fecha;
      });

      return dataSort.map((data, index) => (
        <tr key={index} className="bg-white border-b dark:border-gray-500">
          <td className="py-4 px-2">{data.invoice}</td>
          <td className="py-4 px-2">{data.digipoints}</td>
          <td className="py-4 px-2">{data.NoSillas}</td>
          <td className="py-4 px-2">{data.fecha.toISOString().slice(0, 10)}</td>
        </tr>
      ));
    }

    return datosdummy.map((data, index) => (
      <tr key={index} className="bg-white border-b dark:border-gray-500">
        <td className="py-4 px-2">{data.invoice}</td>
        <td className="py-4 px-2">{data.digipoints}</td>
        <td className="py-4 px-2">{data.NoSillas}</td>
        <td className="py-4 px-2">{data.fecha}</td>
      </tr>
    ));
  }, [searchInvoice, selectDate]);

  const sectionPage = useMemo(() => {
    if (page === 0) {
      return (
        <>
          <div className="grid grid-cols-3 xl:grid-cols-3 max-sm:grid-cols-1 gap-4 mt-4 digiCards">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <p class="title">{digipoints?.assigned_points}</p>
                  <p>DigiPoints {t("digipoints.historicos")}</p>
                </div>
                <div class="flip-card-back">
                  <p>{t("digipoints.txthistoricos")}</p>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <p class="title">{digipoints?.cart_points}</p>
                  <p>{t("digipoints.Dredimidos")}</p>
                </div>
                <div class="flip-card-back">
                  <p class="title">
                    {t("digipoints.txtdias1")}
                    {0}
                    {t("digipoints.txtdias2")}
                  </p>
                  <p>{t("digipoints.txtredencion")}</p>
                </div>
              </div>
            </div>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <p class="title">
                    {digipoints?.assigned_points - digipoints?.cart_points}
                  </p>
                  <p>DigiPoints {t("digipoints.actuales")}</p>
                </div>
                <div class="flip-card-back">
                  <p>{t("digipoints.txtactuales")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/2 shadow p-5 rounded-lg bg-white">
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                <select
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  onChange={(e) => setSelectDate(e.target.value)}
                >
                  <option value="">{t("tabla.ordenarFecha")}</option>
                  <option value="upDown">{t("tabla.recienteA")}</option>
                  <option value="downUp">{t("tabla.antiguoR")}</option>
                </select>
              </div>
              <br></br>
              <div className="relative">
                <div className="absolute flex items-center ml-2 h-full">
                  <svg
                    className="w-4 h-4 fill-current text-primary-gray-dark"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                  </svg>
                </div>
                <div className="flex justify-between">
                  <input
                    type="text"
                    onChange={(e) => setSearchInvoice(e.target.value)}
                    placeholder={t("tabla.buscarFactura")}
                    className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  />
                </div>
              </div>
            </div>
            <br></br>
            <div className="container">
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-black-500">
                  <thead className="text-xs text-black-500 uppercase">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        {t("tabla.nfactura")}
                      </th>
                      <th scope="col" className="py-3 px-6">
                        DigiPoints
                      </th>
                      <th scope="col" className="py-3 px-6">
                        {t("tabla.sillas")}
                      </th>
                      <th scope="col" className="py-3 px-6">
                        {t("tabla.fecha")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>{search}</tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }
    if (page === 1) {
      return <MakeTeam />;
    }
    if (page === 2) {
      return <DigipointsDistribution />;
    }
  }, [page, searchInvoice, selectDate]);

  return (
    <>
      <Head>
        <title>DigiPoints</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main
        className="relative flex justify-center"
        style={{ marginTop: "5vh" }}
      >
        <div className="gap-10 flex flex-col h-full w-5/6">
          <div class="m-6 flex flex-col gap-16">
            {user?.roleId !== 3 ? (
              <div className="grid grid-cols-3">
                <h1
                  className={`font-bold text-3xl ${
                    page === 0
                      ? "titleGraphCarouselSelected"
                      : "titleGraphCarousel"
                  }  titleDigipoints cursor-pointer`}
                  onClick={() => setPage(0)}
                >
                  {t("menu.Digipoints")}
                </h1>
                <h1
                  className={`font-bold text-3xl ${
                    page === 1
                      ? "titleGraphCarouselSelected"
                      : "titleGraphCarousel"
                  }  titleDigipoints cursor-pointer`}
                  onClick={() => setPage(1)}
                >
                  {t("digipoints.Crear")}
                </h1>
                <h1
                  className={`font-bold text-3xl ${
                    page === 2
                      ? "titleGraphCarouselSelected"
                      : "titleGraphCarousel"
                  }  titleDigipoints cursor-pointer`}
                  onClick={() => setPage(2)}
                >
                  {t("digipoints.DDigipoints")} <br /> DigiPoints
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-3">
                <h1
                  className={`font-bold text-3xl ${
                    page === 1
                      ? "titleGraphCarouselSelected"
                      : "titleGraphCarousel"
                  }  titleDigipoints cursor-pointer`}
                  onClick={() => setPage(1)}
                >
                  {t("digipoints.Crear")}
                </h1>
                <h1
                  className={`font-bold text-3xl ${
                    page === 2
                      ? "titleGraphCarouselSelected"
                      : "titleGraphCarousel"
                  }  titleDigipoints cursor-pointer`}
                  onClick={() => setPage(2)}
                >
                  {t("digipoints.DDigipoints")}
                  <br />
                  DigiPoints
                </h1>
                <h1
                  className={`font-bold text-3xl ${
                    page === 0
                      ? "titleGraphCarouselSelected"
                      : "titleGraphCarousel"
                  }  titleDigipoints cursor-pointer`}
                  onClick={() => setPage(0)}
                >
                  {t("menu.Digipoints")}
                </h1>
              </div>
            )}

            {sectionPage}
          </div>
        </div>
      </main>
    </>
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

export default digipoints;
