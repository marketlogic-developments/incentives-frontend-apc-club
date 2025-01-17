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
import adobeConcept from "../styles/CreativeConceptAdobe.json"

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


  useEffect(() => {
    if (queryToken) {
      setOpen(() => ({ modal: 1, open: true }));
    }
  }, []);


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
      <main className="mainIndex flex flex-col-reverse justify-center lg:flex-col w-full z-40 relative overflow-x-hidden overflow-y-hidden min-h-dvh">
        <Registro close={setRegister} register={register} />
        <div className="max-sm:flex max-sm:flex-row max-sm:gap-4 max-sm:justify-center max-sm:mt-10 max-h-[100px] max-sm:max-h-[150px] flex w-full justify-between mt-10">
          <figure className="ml-10 max-sm:m-auto">
            <img
              src={adobeConcept.principalLogo}
              className="max-w-[250px] max-sm:m-auto lg:w-[60%] 2xl:w-[80%]"
              alt="Principal-Adobe-Logo"
            />
          </figure>
          <div className="flex gap-6 lg:mr-6 items-center">
            <figure>
              <img
                src={adobeConcept.yearsLogo}
                className="max-w-[400px] max-sm:m-auto ml-auto lg:w-[60%] 2xl:w-[80%]"
                alt="10years-Logo"
              />
            </figure>
          </div>
        </div>
        <div className="container flex flex-row justify-center max-w-full max-h-full sm:my-auto items-center h-[80dvh]">
          {/* <figure className="hidden max-sm:m-auto w-1/2 h-[88dvh] lg:flex">
            <img
              src="/assets/login/apcLogo.webp"
              className="max-sm:m-auto !w-full lg:object-cover object-contain h-full"
              alt="APC"
            />
          </figure> */}
          <div className="bg-[#E5E5E5] h-full max-h-[734px] rounded-l-xl relative flex justify-end overflow-hidden" style={{width:"calc(50% - 75px)"}}>
            <video autoPlay muted loop className="h-full">
              <source src={adobeConcept.loginConcept} type="video/mp4"/>
            </video>
          </div>
          <LoginTarget setRegister={setRegister} setOpen={setOpen} />
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
