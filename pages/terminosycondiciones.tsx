import Head from "next/head";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const terminosycondiciones = () => {
  const { user } = useSelector((state: RootState) => state.currentUser);
  const [t, i18n] = useTranslation("global");
  const iframeRef = useRef(null);

  return (
    <>
      <Head>
        <title>Terminos y Condiciones</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main
        className="flex justify-center relative h-screen bg-white"
        style={{ maxWidth: "100%", zIndex: 50, marginTop: "5vh" }}
      >
        <div className="flex flex-col items-center w-full gap-5">
          {/* <div className="m-6 flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl">
                {t("terminosycondiciones.TerminosyCondiciones")}
              </h1>
            </div>
          </div> */}

          {user?.profile.language === "por" ? (
            <iframe
              ref={iframeRef}
              title="TermsAndContidionsAdobeSign"
              src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBlRuZiHlh4EVcsdkw0LkFgNa32kzfm7PqWXnwF_Tzv2NFGZRkZL0qgqfwR6L753eM*"
              className="iframeTandC"
            ></iframe>
          ) : (
            <iframe
              ref={iframeRef}
              title="TermsAndContidionsAdobeSign"
              src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhC4CVw9DB7M44zZFjyJfgDjY3Pa8BDT_NWQ5Co-vXC8CTRH8J12bnVolS_BRmYA6bU*"
              className="iframeTandC"
            ></iframe>
          )}
          <div className="flex gap-5 items-center">
            <div className="rounded-full bg-primary p-2 w-[30px] h-[30px] flex justify-center items-center">
              <p className="text-white">1</p>
            </div>
            <p>{t("terminosycondiciones.aceptar")}</p>
          </div>

          <div className="flex gap-5 items-center">
            <div className="rounded-full bg-primary p-2 w-[30px] h-[30px] flex justify-center items-center">
              <p className="text-white">2</p>
            </div>
            <p>{t("terminosycondiciones.click")}</p>
          </div>

          <div className="flex gap-5 items-center">
            <div className="rounded-full bg-primary p-2 w-[30px] h-[30px] flex justify-center items-center">
              <p className="text-white">3</p>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: String(t("terminosycondiciones.deseas")),
              }}
            />
          </div>
          <div className="flex gap-5 items-center">
            <div className="rounded-full bg-primary p-2 w-[30px] h-[30px] flex justify-center items-center">
              <p className="text-white">4</p>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: String(t("terminosycondiciones.paso4")),
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default terminosycondiciones;
