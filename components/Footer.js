import Link from "next/link";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.user);
  const [t, i18n] = useTranslation("global");
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";
  const sections = ["/", "/terminosycondiciones"];

  const footer = useMemo(() => {
    if (sections.includes(location)) {
      return <></>;
    }

    if (!sections.includes(location)) {
      return (
        <div className="w-full bg-secondary flex max-sm:flex-col absolute text-white justify-center gap-5 items-center py-5 max-sm:py-10 z-0">
          <a
            href={`${
              user.roleId === 1
                ? "assets/pdf/Términos_y_Condiciones.pdf"
                : "assets/pdf/Termos_e_Condições.pdf"
            }`}
            download
          >
            {t("terminosycondiciones.TerminosyCondiciones")}
          </a>
        </div>
      );
    }
  }, [location]);

  return footer;
};

export default Footer;
