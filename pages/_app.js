import "../styles/global.scss";
import Layout from "../components/Layout";
import { MantineProvider } from "@mantine/core";
import { UserContext } from "../components/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "../translation/es/global.json";
import global_por from "../translation/por/global.json";

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
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Footer />
        </MantineProvider>
      </Provider>
    </I18nextProvider>
  ) : (
    render
  );
}
