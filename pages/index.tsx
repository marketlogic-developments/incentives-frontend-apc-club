import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Registro from "../components/dashboard/registro";
import { Modal } from "@mantine/core";
import LoginTarget from "../components/login/LoginTarget";
import client from "../contentful";
import ClosePlataform from "../components/login/ClosePlataform";
import ResetPassword from "components/Module/Modales/Login/ResetPassword";
import RequestNewPassword from "components/Module/Modales/Login/RequestNewPassword";
import { useQueryParam } from "hooks/useQueryParam";
import { getTokenSessionStorage } from "services/multifuncionToken.service";

interface Props {
  maintenance: any;
}

export interface ModalStructure {
  modal: number;
  open: boolean;
}

export default function Home({ maintenance }: Props) {
  const route = useRouter();
  const adacc =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFkbWluTUwyMDI0KiJ9.5Edke0NA4KCOqxqgekyqHLjmXnHLqWIUYDD37g00J38";
  const { query } = route;
  const [register, setRegister] = useState(null);
  const [open, setOpen] = useState<ModalStructure>({
    modal: 0,
    open: false,
  });
  const queryToken = useQueryParam("token");
  const tokenSession = getTokenSessionStorage();


  useEffect(() => {
    if (queryToken) {
      setOpen(() => ({ modal: 1, open: true }));
    }

    console.log(tokenSession)

    if (tokenSession) {
      route.push("/dashboard");
    }
  }, []);

  // const handleDigipoints = async (userData) => {
  //   const compOrDist =
  //     userData.user.companyId === null
  //       ? {
  //           endpoint: "distribution-channel",
  //           byId: userData.user.distributionChannelId,
  //         }
  //       : {
  //           endpoint: "companies",
  //           byId: userData.user.companyId,
  //         };

  //   axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/${compOrDist.endpoint}/${compOrDist.byId}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           Authorization: `Bearer ${userData.token}`,
  //         },
  //       }
  //     )
  //     .then(({ data }) => {
  //       if (compOrDist.endpoint === "distribution-channel") {
  //         dispatch(setDistribuitor(data));
  //       } else {
  //         dispatch(setCompany(data));
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.message === "Request failed with status code 404") {
  //         dispatch(
  //           setCompany({
  //             CreatedAt: 0,
  //             id: 0,
  //             name: "Sin canal / distribuidor",
  //             representativeId: 0,
  //             phoneNumber: "000000",
  //             operationStatusId: 0,
  //             distChannelsId: "No",
  //             maxDayAssign: 0,
  //             resellerMasterId: "",
  //             goalsPerQuarter: "",
  //             goalsPerYear: "",
  //             partnerAdmin: {
  //               name: "No",
  //             },
  //           })
  //         );
  //       }
  //     })
  //     .finally(() => {
  //       console.log(userData);

  //       if (
  //         [null, "adobe", "adobeetla", undefined].includes(
  //           userData.user.inprogram
  //         )
  //       ) {
  //         if (userData.user.policy) {
  //           const params = new URLSearchParams(window.location.search);

  //           return params.get("redirect")
  //             ? route.push(`/${params.get("redirect")}`)
  //             : route.push("/dashboard");
  //         } else {
  //           return route.push("/terminosycondiciones");
  //         }
  //       }

  //       if (userData.user.inprogram === "etla") {
  //         if (userData.user.policyetla) {
  //           const params = new URLSearchParams(window.location.search);

  //           return params.get("redirect")
  //             ? route.push(`/${params.get("redirect")}`)
  //             : route.push("/etla/dashboardEtla");
  //         } else {
  //           return route.push("/etla/terminosycondiciones");
  //         }
  //       }

  //       dispatch(changeLoadingData(false));
  //     });

  //   axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/digipoints-redeem-status/${userData.user.id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           Authorization: `Bearer ${userData.token}`,
  //         },
  //       }
  //     )
  //     .then((dpInfo) => {
  //       const [digipoints] = dpInfo.data;
  //       if (dpInfo.data.length === 0) {
  //         dispatch(
  //           setDigipoints({
  //             assigned_points: 0,
  //             cart_points: 0,
  //           })
  //         );
  //       } else {
  //         dispatch(setDigipoints(digipoints));
  //       }
  //     });
  // };

  const setModal = (): React.ReactNode => {
    switch (open.modal) {
      case 1:
        return <ResetPassword />;
      default:
        return <RequestNewPassword />;
    }
  };

  return (
    <>
      <Modal
        opened={open.open}
        onClose={() => setOpen((prev) => ({ ...prev, open: false }))}
        centered
        size={"50%"}
      >
        {setModal()}
      </Modal>
      <Head>
        <title title="true">Adobe APC Club</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      {maintenance.maintenance && adacc === query?.adminaccess ? (
      <ClosePlataform data={maintenance} />) : (
      <main className="mainIndex !bg-[#2C2C2C] flex flex-col-reverse justify-center lg:flex-col w-full z-40 relative overflow-x-hidden overflow-y-hidden min-h-dvh">
        <Registro close={setRegister} register={register} />
        <div className="max-sm:flex max-sm:flex-row max-sm:gap-4 max-sm:justify-center max-sm:mt-10 max-h-[100px] max-sm:max-h-[150px] flex w-full justify-between mt-10">
          <figure className="ml-10 max-sm:m-auto">
            <img
              src="assets/login/adobe.webp"
              className="max-w-[250px] max-sm:m-auto lg:w-[60%] 2xl:w-[80%]"
              alt="Principal-Adobe-Logo"
            />
          </figure>
          <div className="flex gap-6 lg:mr-6 items-center">
            <figure>
              <img
                src="assets/login/pcc.webp"
                className="max-w-[400px] max-sm:m-auto ml-auto lg:w-[60%] 2xl:w-[80%]"
                alt="10years-Logo"
              />
            </figure>
          </div>
        </div>
        <div className="container flex flex-row justify-center max-w-full max-h-full sm:my-auto items-center">
          <LoginTarget setRegister={setRegister} setOpen={setOpen} />
          <figure className="hidden max-sm:m-auto w-1/2 h-[88dvh] lg:flex">
            <img
              src="/assets/login/apcLogo.webp"
              className="max-sm:m-auto !w-full lg:object-cover object-contain h-full"
              alt="APC"
            />
          </figure>
        </div>
        {/* <figure className="absolute w-full z-[-1] opacity-25">
            <img
              src="/assets/login/bbapc.webp"
              className="min-w-full min-h-screen"
            ></img>
          </figure> */}
      </main>
      )} 
    </>
  );
}

export async function getServerSideProps() {
  const maintenance = await client.getEntries({
    content_type: "maintenance",
  });

  return {
    props: {
      maintenance: maintenance.items.map(({ fields }) => fields)[0],
    },
  };
}
