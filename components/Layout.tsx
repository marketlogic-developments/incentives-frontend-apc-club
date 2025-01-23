import { useMemo } from "react";
import { Modal } from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingUser,
  setInitialStateUser,
  userLogin,
} from "../store/reducers/currentUser.reducer";
import MobileMenu from "./MobileMenu";
import { useTranslation } from "react-i18next";
import { changeLoadingData } from "../store/reducers/loading.reducer";
import {
  setInitialStateAwards,
  setMenuMarket,
} from "../store/reducers/awards.reducer";
import { setInitialStateCompany } from "../store/reducers/company.reducer";
import { setInitialStateOrders } from "../store/reducers/orders.reducer";
import { setInitialStateSales } from "../store/reducers/sales.reducer";
import { setInitialStateTeams } from "../store/reducers/teams.reducer";
import { useState } from "react";
import MenuAPC from "./Lay0ut/Menu";
import ContainerContent from "./containerContent";
import MenuMarket from "./Lay0ut/MenuMarket";
import ModalCustomerCare from "./costumerCare/modal/ModalCustomerCare";
import { CloseCircle, Menu as MenuLines, ShoppingCard } from "./icons";
import ModalPersonalize from "./Lay0ut/ModalPersonalize";
import EyeObserver from "./Lay0ut/SwitchUser/EyeObserver";
import ModalUpdateData from "./Lay0ut/Modals/ModalUpdateData";
import ModalTCPa from "./Lay0ut/Modals/ModalTCPa";
import ModalInfoAPC from "./Lay0ut/ModalInfoAPC";
import { RootState } from "store/store";
import { useLocation } from "functions/Locations";
import {
  IconShoppingCar,
  IconWhatsapp,
} from "public/assets/Icons/Menu/MenuIcons";
import { useRouter } from "next/router";
import { useDataUser } from "functions/SetDataUser";
import DigiPointsCard from "./Lay0ut/DigiPointsCard";
import DigiPointsCollapse from "./Lay0ut/DigiPointsCollapse";
import UserOptions from "./Lay0ut/UserOptions";
import { StatusUser } from "services/User/user.service";
import ResetPassword from "./Module/Modales/Login/ResetPassword";
import adobeConcept from "../styles/CreativeConceptAdobe.json"
import Cookies from "js-cookie";

interface MyComponentProps {
  children: React.ReactNode;
}

const Layout: React.FC<MyComponentProps> = ({ children }) => {
  const { user, token, digipoints, loading, organization, status } =
    useSelector((state: RootState) => state.currentUser);
  const video = useSelector((state: RootState) => state.contentful.videos[0]);
  const loadingData = useSelector(
    (state: RootState) => state.loadingData.loadingData
  );
  const dispatch = useDispatch();
  const route = useRouter();
  const location = route.pathname;
  const sections = ["/", "/terminosycondiciones"];
  const [t, i18n] = useTranslation("global");
  const [modal, setModal] = useState(0);
  const [opened, setOpened] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuUser, setMenuUser] = useState<boolean>(false);
  const menuMarket = useSelector((state: RootState) => state.awards.menuMarket);
  const [screen, setScreen] = useState<number>(0);
  const prevSession=Cookies.get("prevSession")

  const { setDataUser } = useDataUser();
  const { Locations, textLocation } = useLocation();



  const statusUserOptions = (statusName: string): StatusUser | undefined =>
    user?.status
      ? Object.entries(user.status).find(([key]) => key === statusName)
      : undefined;

  //Get Data User
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!user && token) {
      setDataUser();
    } else if (!token) {
      route.push("/");
    }
  }, [location]);

  //Logout for Inactivity
  useEffect(() => {
    setScreen(window.innerWidth);
    const handleWindowResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  //Show Modals
  useEffect(() => {
    const updateData = statusUserOptions("UPDATE_INFORMATION");
    const resetPassword = statusUserOptions("RESET_PASSWORD");

    setModal(2);
    setOpened(true);

    if (user && !prevSession && !user.is_superuser) {
      if (user?.profile?.organizations[0]?.validations?.length) {
        setModal(3);
        return setOpened(true);
      }

      if (resetPassword ? !resetPassword[1] : false) {
        setModal(5);
        return setOpened(true);
      }

      if (updateData ? !updateData[1] : false) {
        setModal(2);
        return setOpened(true);
      }
    }
  }, [user, video, opened]);

  const profileImage: React.ReactNode = (
    <div className="bg-[#1473E6] rounded-full btn btn-circle btn-sm border-none hover:bg-[#1473E6]">
      {!user?.profile.photoProfile ? (
        <p className="text-white text-center flex w-full h-full items-center justify-center">
          {user?.profile.first_name[0]}
        </p>
      ) : (
        <img
          src={user?.profile.photoProfile}
          className="w-full h-full rounded-full"
          alt="Avatar"
        />
      )}
    </div>
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (user) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          timeoutId = setTimeout(function () {
            logout();
          }, 1800000);
        } else {
          // Si el usuario vuelve antes de que se ejecute el setTimeout, cancelarlo
          clearTimeout(timeoutId);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );

        clearTimeout(timeoutId);
      };
    }
  }, [user]);

  const closeModal = () => {
    setOpened(!opened);
  };

  const href = (page: string) => {
    if (showMenu) {
      setShowMenu(false);
    }

    route.push(page);
  };

  const logout = () => {
    route.push("/");
    dispatch(setInitialStateAwards());
    dispatch(setInitialStateCompany());
    dispatch(setInitialStateOrders());
    dispatch(setInitialStateTeams());
    dispatch(setInitialStateSales());
    dispatch(setInitialStateUser());
    sessionStorage.removeItem("token");
    // dispatch(loadingUser(true));
  };

  const typeModal = useMemo(() => {
    switch (modal) {
      case 0:
        return <ModalCustomerCare closeModal={closeModal} />;
      case 1:
        return <ModalPersonalize onClose={setOpened} />;
      case 2:
        return <ModalUpdateData onClose={setOpened} />;
      case 3:
        return <ModalTCPa />;
      case 4:
        return <ModalInfoAPC onClose={setOpened} />;
      case 5:
        return <ResetPassword setOpened={setOpened} />;
      default:
        return <></>;
    }
  }, [modal, opened]);

  const menu = (n: number): React.ReactNode => {
    if (user) {
      return Locations(user)
        .filter(({ page }) => {
          if (n === 1) {
            

            if (user?.roles[0].name === "administrador" || user?.is_superuser) {
              return [
                "/dashboard",
                "/digipointsall",
                "/reportesDashboard",
                "/comunicado",
              ].includes(page);
            }
            if (user?.roles[0].name === "partner_admin") {
              return [
                "/dashboard",
                "/digipoints/mydigipoints",
                // "/reportes/dashboards/InvoiceReportUser",
                "/comunicado",
              ].includes(page);
            }

            if (user?.roles[0].name === "partner_principal") {
              return ["/dashboard", "/puntosporventas", "/comunicado"].includes(
                page
              );
            }

            if (user?.roles[0].name === "sales_rep") {
              return [
                "/dashboard",
                "/digipoints/mydigipoints",
                "/reportes/dashboards/InvoiceReportUser",
                "/comunicado",
              ].includes(page);
            }
          }
          if (n === 2) {
            if(user?.is_superuser){
              return ["/herramientas", "/puntosporventas"].includes(page);
            }

            if (user.email === "bea24468@adobe.com" || user?.roles[0].name === "sales_rep") {
              return;
            }
            //Admin
            if (user?.roles[0].name === "administrador" ) {
              return ["/puntosporventas"].includes(page);
            }

            //Partner Admin
            if (user?.roles[0].name === "partner_admin") {
              return ["/ManagmentDigipoints" /*"/puntosporventas"*/].includes(
                page
              );
            }
          }
        })
        .map(({ icon, page, text, subsections, link }, index) => (
          <MenuAPC
            icon={icon}
            page={page}
            text={text}
            index={index}
            subsections={subsections}
            href={href}
            location={location}
            collapse={collapse}
            link={link as string}
          />
        ));
    }
  };

  const actionCustomerCare = () => {
    setModal(0);
    setOpened(true);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center z-50">
        <div className="spinner"></div>
      </div>
    );
  }

  if (sections.includes(location)) {
    return (
      <>
        {loadingData && (
          <div
            className="fixed h-screen w-screen flex items-center justify-center bg-[rgba(255,255,255,0.8)]"
            style={{ zIndex: 201 }}
          >
            <div className="spinner"></div>
          </div>
        )}
        {children}
      </>
    );
  }

  return (
    <>
      {loadingData && (
        <div
          className="fixed h-screen w-screen flex items-center justify-center z-50 bg-[rgba(255,255,255,0.8)]"
          style={{ zIndex: 201 }}
        >
          <div className="spinner"></div>
        </div>
      )}
      <Modal
        opened={opened}
        withCloseButton={[0].includes(modal) ? true : false}
        onClose={
          [0].includes(modal)
            ? closeModal
            : [3].includes(modal)
            ? () => logout()
            : () => {}
        }
        fullScreen={[1, 2].includes(modal)}
        centered
        size={"auto"}
        overlayProps={{
          blur: 5,
          opacity: [0, 3].includes(modal) ? 0.85 : 0.55,
        }}
        transitionProps={{ transition: "rotate-left" }}
        closeButtonProps={{
          variant: "none",
          size: "auto",
          children: <CloseCircle />,
        }}
        padding={0}
      >
        {typeModal}
      </Modal>
      <ContainerContent pageTitle={textLocation(user)}>
        <div className="containerGlobal">
          <div className="globalContent bg-primary ">
            <div
              className={`containerLayout`}
              style={{
                ["--wmenu" as any]: collapse ? "5.56%" : "18.3%",
                ["--wminmenu" as any]: collapse ? "82px" : "256px",
                ["--showmenu" as any]: showMenu ? "flex" : "none",
              }}
            >
              <div className="flex flex-col py-6 gap-6 h-full">
                {
                  <MenuLines
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    switchUser={prevSession}
                    styles={showMenu ? "h-[50px]" : "hidden"}
                  />
                }
                <div className="flex flex-col gap-6 px-6">
                  <div
                    className="logoAdobe cursor-pointer"
                    style={{
                      ["--wlogo" as any]: collapse ? "100%" : "40%",
                    }}
                    onClick={() => route.push("/dashboard")}
                  >
                    <figure className="flex">
                      <img
                        src={adobeConcept.A}
                        alt="apc_canales"
                      ></img>
                    </figure>
                  </div>

                  {collapse ? <DigiPointsCollapse /> : <DigiPointsCard />}
                </div>
                <div className="flex flex-col gap-6 overflow-y-scroll scrollMenu w-full">
                  <div className="containerRedirections gap-2">{menu(1)}</div>
                 
                   
                      <hr className="mx-6" />
                      <div className="containerRedirections gap-2">
                        {menu(2)}
                      </div>
                  
               
                </div>
                <div className="flex justify-center w-full mt-auto">
                  {collapse ? (
                    <figure className="flex w-[35px]">
                      <img
                        src="/assets/dashboard/Logo11.png"
                        alt="apc_canales"
                      ></img>
                    </figure>
                  ) : (
                    <figure className="flex">
                      <img
                        src={adobeConcept.yearsLogoGrey}
                        alt="apc_canales"
                      ></img>
                    </figure>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <div
                className={`w-full ${prevSession ? "pt-0 px-0" : "pt-1 px-6"}`}
              >
                <div
                  className={`containerNavbar ${
                    prevSession ? "!bg-[#232B2F] py-2" : "!bg-[#ffff] py-2"
                  }`}
                >
                  <div className="sticky grid justify-items-center items-center">
                    <div className="md:hidden flex">
                      <MenuLines
                        onClick={() => setShowMenu(!showMenu)}
                        switchUser={prevSession}
                      />
                    </div>
                    <div className="md:flex hidden">
                      <MenuLines
                        onClick={() => setCollapse(!collapse)}
                        switchUser={prevSession}
                      />
                    </div>
                  </div>
                  <div className="navbar grid grid-cols-3">
                    <div className="w-auto">
                      <p
                        className={`sm:!text-3xl md:!text-3xl !text-sm font-bold ${
                          prevSession && "text-white"
                        }`}
                      >
                        {textLocation(user)}
                      </p>
                    </div>
                    {screen > 639 && (
                      <div className="sm:visible invisible notifications grid grid-cols-6 content-center gap-5">
                        {/* 1 */}
                        <div className="w-auto">
                          <div
                            className="shoopingMarket cursor-pointer"
                            onClick={() => dispatch(setMenuMarket(!menuMarket))}
                          >
                            <IconShoppingCar userSwitch={prevSession} />
                          </div>
                        </div>
                        {/* 2 */}
                        {prevSession && <EyeObserver />}
                        {/* 3 */}
                        <div className="w-full col-span-2 sm:mr-0 md:mr-0 lg:mr-0 mr-3">
                          <div className="relative">
                            <div className="menumobile hidden">
                              <MobileMenu locations={Locations(user)} />
                            </div>
                            <div
                              className="flex items-center gap-3 bg-[#F5F5F5] rounded-full  sm:w-[217px] md:w-[217px] p-3 text-xs cursor-pointer"
                              onClick={() => setMenuUser(!menuUser)}
                            >
                              {profileImage}
                              <div className="username">
                                <p className="lg:text-sm xl:text-base w-[150px] truncate">
                                  {user?.profile.first_name}
                                </p>
                              </div>
                            </div>
                          </div>
                          {menuUser && (
                            <UserOptions
                              user={user}
                              token={token}
                              logout={logout}
                              menuUser={menuUser}
                              setMenuUser={setMenuUser}
                              actionCustomerCare={actionCustomerCare}
                              size={screen}
                            />
                          )}
                        </div>
                      </div>
                    )}
                    {screen < 639 && prevSession && <EyeObserver />}
                  </div>
                </div>
                <div
                  className={`pt-1 overflow-hidden lg:overflow-visible ${
                    prevSession ? "px-6" : "px-0"
                  }`}
                >
                  {children}
                </div>

                {screen < 639 && (
                  <div className="sticky bottom-0 w-full border-t-2 object-bottom">
                    <div className="navbar grid grid-cols-2 justify-items-center bg-white">
                      <div
                        className="shoopingMarket cursor-pointer"
                        onClick={() => dispatch(setMenuMarket(!menuMarket))}
                      >
                        <ShoppingCard />
                      </div>
                      <div className="" onClick={() => setMenuUser(!menuUser)}>
                        {profileImage}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {menuMarket && <MenuMarket />}
              {screen < 767 && menuUser && (
                <UserOptions
                  user={user}
                  token={token}
                  logout={logout}
                  menuUser={menuUser}
                  setMenuUser={setMenuUser}
                  actionCustomerCare={actionCustomerCare}
                  size={screen}
                />
              )}
              {screen > 639 && (
                <a
                  href="https://api.whatsapp.com/send?phone=5715800310&text=Hola,%20Necesito%20informacion%20sobre"
                  target="_blank"
                  className="rounded-full border flex w-fit right-0 bottom-0 fixed p-3 mr-6 mb-6 bg-white whatsappButton z-[1]"
                >
                  <IconWhatsapp />
                </a>
              )}
            </div>
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export default Layout;
