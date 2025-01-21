"use client";

import "../styles/global.scss";
import Layout from "../components/Layout";
import { MantineProvider } from "@mantine/core";
import { UserContext } from "../components/user";
import { ElementType, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Footer from "../components/Footer";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "../translation/es/global.json";
import global_por from "../translation/por/global.json";
import global_en from "../translation/en/global.json";
import { Html } from "next/document";
import Head from "next/head";
import Script from "next/script";
import Cookies from "js-cookie";

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
    en: {
      global: global_en,
    },
  },
});

interface Props {
  Component: ElementType;
  pageProps: Object;
}

export default function MyApp({ Component, pageProps }: Props) {

  return (
    <>
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Layout>
              <Component {...pageProps} />
              <Head>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=G-V1T7B23T0N`}
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V1T7B23T0N', {
              page_path: window.location.pathname,
            });
          `,
                  }}
                />
              </Head>
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
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
                }}
              />
            </Layout>
          </MantineProvider>
        </Provider>
      </I18nextProvider>
    </>
  );
}
