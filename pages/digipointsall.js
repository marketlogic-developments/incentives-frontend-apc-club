import axios from "axios";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import DigipointsAll from "../components/digipoints/DigipointsAll";
import MakeTeam from "../components/digipoints/MakeTeam";
import { getAllTeams, teamsPush } from "../store/reducers/teams.reducer";
import {
  getUsers,
  getUsersData,
  setCompanyUsers,
} from "../store/reducers/users.reducer";

const digipoints = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const digipoints = useSelector((state) => state.user.digipoints);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const company = useSelector((state) => state.user.company);
  const distribuitor = useSelector((state) => state.user.distribuitor);
  const [searchInvoice, setSearchInvoice] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (user.roleId === 3) {
      setPage(1);
    }

    if ([1, 2, 3].includes(user?.roleId)) {
      axios
        .get(
          `${process.env.BACKURL}/reporters/all-users-by-groupname-where-id/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          if (data.length !== 0) dispatch(getAllTeams(data));
        });
    }

    const compOrDist =
      user.company === null
        ? { endpoint: "distri-all-users-by-id", byId: distribuitor.id }
        : { endpoint: "company-all-users-by-id", byId: company.id };

    axios
      .get(
        `${process.env.BACKURL}/reporters/${compOrDist.endpoint}/${compOrDist.byId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(setCompanyUsers(data));
      });
  }, [token]);

  // const search = useMemo(() => {
  //   const newData = datosdummy.map((data) => ({
  //     ...data,
  //     fecha: new Date(data.fecha),
  //   }));

  //   if (searchInvoice !== "") {
  //     return datosdummy
  //       .filter(({ invoice }) => {
  //         return invoice.startsWith(searchInvoice.toLocaleLowerCase());
  //       })
  //       .map((data, index) => (
  //         <tr key={index} className="bg-white border-b dark:border-gray-500">
  //           <td className="py-4 px-2">{data.invoice}</td>
  //           <td className="py-4 px-2">{data.digipoints}</td>
  //           <td className="py-4 px-2">{data.NoSillas}</td>
  //           <td className="py-4 px-2">{data.fecha}</td>
  //         </tr>
  //       ));
  //   }

  //   if (selectDate !== "") {
  //     const dataSort = newData.sort((a, b) => {
  //       if (selectDate === "upDown") {
  //         return b.fecha - a.fecha;
  //       }

  //       return a.fecha - b.fecha;
  //     });

  //     return dataSort.map((data, index) => (
  //       <tr key={index} className="bg-white border-b dark:border-gray-500">
  //         <td className="py-4 px-2">{data.invoice}</td>
  //         <td className="py-4 px-2">{data.digipoints}</td>
  //         <td className="py-4 px-2">{data.NoSillas}</td>
  //         <td className="py-4 px-2">{data.fecha.toISOString().slice(0, 10)}</td>
  //       </tr>
  //     ));
  //   }

  //   return datosdummy.map((data, index) => (
  //     <tr key={index} className="bg-white border-b dark:border-gray-500">
  //       <td className="py-4 px-2">{data.invoice}</td>
  //       <td className="py-4 px-2">{data.digipoints}</td>
  //       <td className="py-4 px-2">{data.NoSillas}</td>
  //       <td className="py-4 px-2">{data.fecha}</td>
  //     </tr>
  //   ));
  // }, [searchInvoice, selectDate]);

  const sectionPage = useMemo(() => {
    if (page === 0) {
      return <DigipointsAll />;
    }
  }, [page, searchInvoice, selectDate, digipoints]);

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
            {user?.roleId === 1 && (
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
