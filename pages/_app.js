"use client";

import "../styles/global.scss";
import Layout from "../components/Layout";
import { MantineProvider } from "@mantine/core";
import { UserContext } from "../components/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Footer from "../components/Footer";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "../translation/es/global.json";
import global_por from "../translation/por/global.json";
import { Html } from "next/document";
import Head from "next/head";
import Script from "next/script";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: global_es,
    },
    por: {
      global: global_por,
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState("");
  const router = useRouter();
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";

  async function init() {
    setLoading(true);
    if (window.sessionStorage.getItem("infoDt") !== null) {
      const roll =
        JSON.parse(window.sessionStorage.getItem("infoDt")) || undefined;
      if (location.pathname === "/") {
        if (roll !== null) {
          setUser(roll?.roleId);
          setLoading(false);
          return router.push("/dashboard");
        }
      }

      if (roll !== null) {
        setUser(roll.roleId);
      }

      if (render !== "") {
        return setRender("");
      }

      if (
        pageProps.protected &&
        roll?.roleId &&
        pageProps.userTypes &&
        pageProps.userTypes.indexOf(roll?.roleId) === -1
      ) {
        router.push("/dashboard");
        setLoading(false);
        return setRender(
          <div className="pageDontAccess">
            <h1 className="dontAccess">
              Lo sentimos, no tienes acceso a esta sección, serás redirigido a
              la pantalla principal
            </h1>
            <div className="spinner"></div>
          </div>
        );
      }
    } else {
      setLoading(false);
      const search = window.location.search || "";
      return router.push({
        pathname: "/",
        search: search,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [location]);

  return render === "" ? (
    <>
      <Head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-TH6V5GN');
              `,
          }}
        />
      </Head>
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Layout>
              <Component {...pageProps} />
              <Script
                strategy="afterInteractive"
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3486911,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
                }}
              />
            </Layout>
          </MantineProvider>
        </Provider>
      </I18nextProvider>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TH6V5GN"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </>
  ) : (
    render
  );
}
