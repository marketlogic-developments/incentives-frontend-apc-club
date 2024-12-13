import { DefaultTFuncReturn, TFunction } from "i18next";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  IconComunicado,
  IconCustomerCare,
  IconDigipoints,
  IconManagmentDigipoints,
  IconPromotions,
  IconPuntosPorVentas,
  IconReportesDashboard,
  IconReportTyC,
  IconSettings,
  InvoiceReportUser,
} from "public/assets/Icons/Menu/MenuIcons";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CurrentUser } from "services/User/user.service";
import { changeLoadingData } from "store/reducers/loading.reducer";

interface Props {
  page: string;
  icon: JSX.Element;
  iconactive?: string;
  text: string;
  subsections?: any;
}

export const useLocation = () => {
  const [t, i18n] = useTranslation("global");

  const Locations = (user: CurrentUser | null): Props[] => {
    const locations = [
      {
        page: "/dashboard",
        icon: <DashboardIcon />,
        iconactive: "",
        text: t("menu.Dashboard"),
      },
      {
        page: "/reportes/dashboards/InvoiceReportUser",
        icon: <InvoiceReportUser />,
        iconactive: "",
        text: "Invoice Report",
      },
      {
        page: "/comunicado",
        iconactive: "",
        icon: <IconComunicado />,
        text: t("menu.comunicados"),
      },
      {
        page:
          user?.roles.name === "admin"
            ? "/digipointsall"
            : "/digipoints/mydigipoints",
        icon: <IconDigipoints />,
        text: t("menu.Digipoints"),
      },
      {
        page: "/ManagmentDigipoints",
        icon: <IconManagmentDigipoints />,
        text: t("menu.DDigipoints"),
        subsections:
          user?.roles.name === "partner_admin"
            ? [
                {
                  page: "/digipoints/createteam",
                  icon: <></>,
                  text: t("digipoints.crearEquipos"),
                },
                {
                  page: "/digipoints/digipointdistribution",
                  icon: <></>,
                  text: t("menu.AsignarDigipoints"),
                },
              ]
            : undefined,
      },
      {
        page: "/promociones",
        icon: <IconPromotions />,
        iconactive: "",
        text: "Promociones",
      },
      {
        page: "/reportesDashboard",
        icon: <IconReportesDashboard />,
        iconactive: "",
        text: t("menu.Reportes"),
      },
      {
        page: "/puntosporventas",
        icon: <IconPuntosPorVentas />,
        iconactive: "",
        text: t("menu.Puntos_por_ventas"),
      },
      {
        page: "/reportTyC",
        icon: <IconReportTyC />,
        iconactive: "",
        text: "Reporte T&C",
      },
      {
        page: "/herramientas",
        icon: <IconSettings />,
        iconactive: "",
        text: t("menu.admin"),
        subsections: [
          {
            page: "/premios",
            icon: <></>,
            iconactive: "",
            text: t("menu.Premios"),
          },
          {
            page: "/allredeem",
            icon: <></>,
            iconactive: "",
            text: t("menu.redenciones"),
          },
          {
            page: "/cargaventas",
            icon: <></>,
            iconactive: "",
            text: t("menu.Carga_de_Ventas"),
          },
          {
            page: "/reglas",
            icon: <></>,
            iconactive: "",
            text: t("menu.reglas"),
          },
        ],
      },
      {
        page: "/customercare",
        icon: <IconCustomerCare />,
        iconactive: "",
        text: "Customer Care",
      },
    ];

    return locations;
  };

  const textLocation = (user: CurrentUser | null): DefaultTFuncReturn => {
    const dataMenu = Locations(user);
    const router = useRouter();
    const location = router.pathname;
    const dispatch = useDispatch();

    const item = dataMenu.find((i) => i.page === location);

    if (item === undefined) {
      const locationsWithSubsections = dataMenu
        .filter(({ subsections }) => subsections)
        .map(({ subsections }) => subsections);

      const subsectionText = locationsWithSubsections
        .flat()
        .find((item) => item?.page === location);

      if (subsectionText === undefined) {
        if (location.includes("user")) {
          return t("user.ajustesdeperfil");
        }

        if (location === "/catalogo") {
          return t("menu.catalogo");
        }

        if (location === "/shoppingCar") {
          return t("shoopingcar.carrito");
        }

        if (location === "/estadoProducto") {
          return t("estadoProducto.estado");
        }

        if (location === "/howtowin") {
          return t("dashboard.htw");
        }

        if (
          [
            "/reportes/dashboards/SalesPerformance",
            "/reportes/dashboards/DigiPointsPerformance",
            "/reportes/dashboards/UserPerformance",
            "/reportes/dashboards/PartnerTyc",
            "/reportes/dashboards/InvoiceReport",
            "/reportes/dashboards/DigiPointsRedemption",
            "/reportes/dashboards/DigiPointsPromotions",
            "/reportes/dashboards/DigiPointsBehavior",
            "/reportes/dashboards/GoogleAnalytic",
            "/reportes/dashboards/CustomCare",
            "/reportes/dashboards/SoImportReport",
            "/reportes/dashboards/RegistrationPerformance",
            "/reportes/dashboards/FollowUp",
            "/reportes/dashboards/Summary",
          ].includes(location)
        ) {
          return t("Reportes.reportes");
        }
        if (location === "/reportes/dashboards/InvoiceReportUser") {
          return "Invoice Report";
        }

        if (location.includes("comunicado")) {
          return t("menu.comunicados");
        }

        if (location.includes("organizacion")) {
          return t("menu.Participantes");
        }

        if (location.includes("productos")) {
          return t("menu.Productos");
        }

        dispatch(changeLoadingData(true));
        router.push("/dashboard");
        return "Redirect";
      }

      return subsectionText.text;
    }

    return item.text;
  };

  return { textLocation, Locations };
};
