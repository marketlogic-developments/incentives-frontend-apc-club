import React, { useEffect, useMemo, useState } from "react";
import ContainerContent from "../components/containerContent";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mantine/core";
import axios from "axios";
import {
  policyAndPassword,
  getPointsData,
} from "../store/reducers/users.reducer";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import GraphSales from "../components/dashboard/graphSales";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import TableStats from "../components/dashboard/TableStats";
import BannerColombia from "../components/dashboard/BannerColombia";
import CarouselBanners from "../components/dashboard/carouselBanners";
import TableTopsRanking from "../components/dashboard/TableTopsRanking";
import LicenseChart from "../components/dashboard/LicenseChart";
import { CardChart, InputReporte } from "../components";
import { SearchIcon } from "../components/icons";
import { getLicenciesByMonth } from "../store/reducers/sales.reducer";

const dashboard = () => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const ranking = useSelector((state) => state.user.ranking);
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [view, setView] = useState("password");
  const dispatch = useDispatch();
  const route = useRouter();
  const [t, i18n] = useTranslation("global");
  const [modalType, setModalType] = useState([]);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState({
    documentCloud: { teams: [], enterprise: [], education: [] },
    creativeCloud: { teams: [], enterprise: [], education: [] },
    numberData: [],
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    redirection();
  }, [user]);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getLicenciesByMonth(token))
        .then((response) => {
          setLoading(false);
          setData(response.payload[0].monthly_sales_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (data) {
      const newData = {
        documentCloud: { teams: [], enterprise: [], education: [] },
        creativeCloud: { teams: [], enterprise: [], education: [] },
        numberData: [],
      };

      Object.values(data).forEach((value) => {
        let teamsD = 0;
        let educationD = 0;
        let enterpriseD = 0;
        let teamsC = 0;
        let educationC = 0;
        let enterpriseC = 0;

        value.forEach((item) => {
          const { business_unit, sub_bu, total_sales_qt } = item;

          if (business_unit === "Document Cloud") {
            if (sub_bu === "Teams") {
              teamsD += Number(total_sales_qt);
            } else if (sub_bu === "Enterprise") {
              enterpriseD += Number(total_sales_qt);
            } else if (sub_bu === "Education") {
              educationD += Number(total_sales_qt);
            }
          } else if (business_unit === "Creative Cloud") {
            if (sub_bu === "Teams") {
              teamsC += Number(total_sales_qt);
            } else if (sub_bu === "Enterprise") {
              enterpriseC += Number(total_sales_qt);
            } else if (sub_bu === "Education") {
              educationC += Number(total_sales_qt);
            }
          }

        });

        newData.documentCloud.teams.push(teamsD);
        newData.documentCloud.enterprise.push(enterpriseD);
        newData.documentCloud.education.push(educationD);
        newData.creativeCloud.teams.push(teamsC);
        newData.creativeCloud.enterprise.push(enterpriseC);
        newData.creativeCloud.education.push(educationC);
      });
      newData.numberData = Object.keys(data);
      setSalesData(newData);
    }
  }, [data]);

  const redirection = () => {
    if (!user?.passwordReset) {
      setModalType(0);
      return setOpened(true);
    }

    //Delete This When All Users have accepted TC

    // if (user.companyId) {
    //   user.company.country === "Colombia" &&
    //     user.cpf.split(" ")[1] !== "colTC" &&
    //     user.roleId !== 1 &&
    //     setOpened2(true);
    // }
    // if (user.distributionChannelId) {
    //   user.distributionChannel.country === "Colombia" &&
    //     user.roleId !== 1 &&
    //     user.cpf.split(" ")[1] !== "colTC" &&
    //     setOpened2(true);
    // }
  };

  const handleSubmit = (data) => {
    data.preventDefault();

    axios
      .patch(
        `${process.env.BACKURL}/users/${user?.id}`,
        { passwordReset: true, password: data.target[0].value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(policyAndPassword(res.data));
        setOpened(false);
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        return Toast.fire({
          icon: "success",
          title: t("login.donechangepass"),
          background: "#000000",
          color: "#fff",
        });
      });
  };

  const [passwordMatch, setPasswordMatch] = useState(""); // passwords match
  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    if (containsUL && containsLL && containsN && containsSC && contains8C) {
      return setAllValid(true);
    }

    return setAllValid(false);
  }, [containsUL, containsLL, containsN, containsSC, contains8C]);

  const validatePassword = (string) => {
    // has uppercase letter
    if (string.toLowerCase() != string) setContainsUL(true);
    else setContainsUL(false);

    // has lowercase letter
    if (string.toUpperCase() != string) setContainsLL(true);
    else setContainsLL(false);

    // has number
    if (/\d/.test(string)) setContainsN(true);
    else setContainsN(false);

    // has special character
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(string))
      setContainsSC(true);
    else setContainsSC(false);

    // has 8 characters
    if (string.length >= 8) setContains8C(true);
    else setContains8C(false);

    // all validations passed
  };

  const handleError = (data) => {
    data.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    return Toast.fire({
      icon: "error",
      title: t("login.errorchangepass"),
      background: "#000000",
      color: "#fff",
    });
  };

  const typeModal = useMemo(() => {
    if (modalType === 0) {
      return (
        <div className="flex flex-col w-full items-center text-center gap-10 max-sm:gap-2">
          <p className="text-3xl text-primary">{t("dashboard.bienvenido")}</p>
          <p className="text-xl">{t("dashboard.continuar")}</p>

          <form
            className="flex flex-col items-center gap-5 w-full"
            onSubmit={(data) => {
              allValid ? handleSubmit(data) : handleError(data);
            }}
          >
            <div className="relative w-2/4 max-sm:w-full">
              <input
                type={view}
                placeholder={t("dashboard.digitar")}
                className="input input-bordered input-primary w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={(data) => setPasswordMatch(data.target.value)}
                onKeyUp={() => validatePassword(passwordMatch)}
              />
              <button
                type="button"
                onClick={() => {
                  view === "password" ? setView("text") : setView("password");
                }}
                className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-gray-700 hover:text-gray-600 focus:outline-none"
              >
                {view === "text" ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 fill-[#000]" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 fill-[#000]" />
                )}
              </button>
            </div>
            <div className="w-auto flex flex-col justify-center items-center">
              {containsUL ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contieneUL")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contieneUL")}</p>
                </div>
              )}
              {containsLL ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contieneLL")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contieneLL")}</p>
                </div>
              )}
              {containsN ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contieneN")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contieneN")}</p>
                </div>
              )}
              {containsSC ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contieneSC")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contieneSC")}</p>
                </div>
              )}
              {contains8C ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contiene8C")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contiene8C")}</p>
                </div>
              )}
            </div>
            <button
              className={`btn ${
                allValid
                  ? "btn-primary"
                  : "btn-active btn-ghost pointer-events-none"
              }`}
            >
              {t("dashboard.cambiarpass")}
            </button>
          </form>
        </div>
      );
    }
  }, [
    modalType,
    view,
    containsUL,
    containsLL,
    containsN,
    containsSC,
    contains8C,
    allValid,
    passwordMatch,
  ]);

  const isMobile = window.innerWidth <= 768;
  const modalSize = isMobile
    ? { initialWidth: "100%", initialHeight: "auto" }
    : { initialWidth: "40%", initialHeight: "auto" };

  const logout = () => {
    window.sessionStorage.removeItem("infoDt");
    Cookies.remove("dp");
    route.push("/");
  };

  return (
    <>
      <Modal
        opened={opened}
        centered
        size={"80%"}
        onClose={() => (modalType === 0 ? setOpened(true) : setOpened(false))}
        draggable={false}
        className={modalType === 0 && "modalChangePassword"}
      >
        {typeModal}
      </Modal>
      <Modal
        opened={opened2}
        centered
        size={"90%"}
        onClose={() => {
          logout();
          // setOpened2(false);
        }}
        className={"modalCloseDashboard"}
      >
        {/* <a href="mailto:info@adobepcclub.com">
          <figure>
            {i18n.resolvedLanguage === "por" ? (
              <img
                src="assets/dashboard/banners/bannerPApor.webp"
                alt="Sales_PA"
                className="w-full"
              ></img>
            ) : (
              <img
                src="assets/dashboard/banners/bannerPA.webp"
                alt="Sales_PA"
                className="w-full"
              ></img>
            )}
          </figure>s
        </a> */}
        <BannerColombia user={user} token={token} />
      </Modal>
      <ContainerContent pageTitle={"Dashboard"}>
        <div className="m-6 flex flex-col gap-10 ">
          <CarouselBanners />
          <hr color="red" />
          <div className="gap-10 flex flex-col h-full items-center">
            <TableStats />
            <GraphSales />
            <div className="sm:w-full w-[355px]">
              <CardChart title={"Licencias"} paragraph="">
                <LicenseChart
                  dataLeyend={[
                    "Teams",
                    "Enterprise",
                    "Education",
                    "Acrobat Pro",
                    "DC Enterprise",
                    "DC Education",
                  ]}
                  dataX={salesData.numberData}
                  dataOne={salesData.creativeCloud.teams}
                  dataTwo={salesData.creativeCloud.enterprise}
                  dataThree={salesData.creativeCloud.education}
                  dataFour={salesData.documentCloud.teams}
                  dataFive={salesData.documentCloud.enterprise}
                  dataSix={salesData.documentCloud.education}
                  colorsLine={[
                    "black",
                    "blue",
                    "green",
                    "red",
                    "orange",
                    "pink",
                  ]}
                />
              </CardChart>
            </div>
            <div className="grid w-full">
              <div>
                <h1 className="font-bold">{t("dashboard.topUsuarios")}</h1>
              </div>
              <InputReporte
                image={<SearchIcon />}
                placeHolder={t("Reportes.buscar")}
                stylesContainer={"mt-2"}
                stylesInput={
                  "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
                }
                stylesImage={"pb-0"}
              />
              <TableTopsRanking
                containerStyles={
                  "mt-4 !rounded-tl-lg !rounded-tr-lg !overflow-x-auto max-h-[300px]"
                }
                tableStyles={"table-zebra !text-sm"}
                thStyles={"sticky text-white"}
                cols={[
                  t("Top"),
                  t("tabla.nombre"),
                  t("Email"),
                  t("tabla.region"),
                ]}
              />
            </div>
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 2, 3, 4, 5],
    },
  };
}

export default dashboard;
