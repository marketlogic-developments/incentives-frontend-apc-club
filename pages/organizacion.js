import { useState } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Información from "../components/canal/información";
import Participantes from "../components/canal/participantes";
import Puntos from "../components/canal/puntos";
import Redenciones from "../components/canal/redenciones";
import ContainerContent from "../components/containerContent";

const organizacion = () => {
  const [oneSection, setOneSection] = useState(0);
  const user = useSelector((state) => state.user.user);
  const [t, i18n] = useTranslation("global");

  const section = useMemo(() => {
    if (oneSection === 0) {
      return <Participantes />;
    }
    if (oneSection === 1) {
      return <Puntos />;
    }
    if (oneSection === 2) {
      return <Redenciones />;
    }
    if (oneSection === 3) {
      return <Información />;
    }
  }, [oneSection]);

  return (
    <>
      <ContainerContent pageTitle={t("menu.Participantes")}>
        <div className="m-6 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">{t("menu.Participantes")}</h1>
          </div>
          {user.roleId !== 5 ? (
            <div className="grid grid-flow-col auto-cols-fr place-items-center text-center border-b cursor-pointer">
              <p
                className={`h-full w-full p-3 ${
                  oneSection === 0 &&
                  "border-b-2 border-[#eb1000] text-[#eb1000]"
                }`}
                onClick={() => setOneSection(0)}
              >
                Participantes
              </p>
              {/* <p
                className={`h-full w-full p-3 cursor-pointer ${
                  oneSection === 1 &&
                  "border-b-2 border-[#eb1000] text-[#eb1000]"
                }`}
                onClick={() => setOneSection(1)}
              >
                DigiPoints
              </p>
              <p
                className={`h-full w-full p-3 cursor-pointer ${
                  oneSection === 2 &&
                  "border-b-2 border-[#eb1000] text-[#eb1000]"
                }`}
                onClick={() => setOneSection(2)}
              >
                {t("organizacion.redenciones")}
              </p> */}
              <p
                className={`h-full w-full p-3 cursor-pointer ${
                  oneSection === 3 &&
                  "border-b-2 border-[#eb1000] text-[#eb1000]"
                }`}
                onClick={() => setOneSection(3)}
              >
                {t("organizacion.info")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 place-items-center text-center border-b">
              <p
                className={`h-full w-full p-3 cursor-pointer ${
                  oneSection === 0 &&
                  "border-b-2 border-[#eb1000] text-[#eb1000] "
                }`}
                onClick={() => setOneSection(0)}
              >
                Participantes
              </p>
              <p
                className={`h-full w-full p-3 cursor-pointer ${
                  oneSection === 3 &&
                  "border-b-2 border-[#eb1000] text-[#eb1000]"
                }`}
                onClick={() => setOneSection(3)}
              >
                Información
              </p>
            </div>
          )}

          {section}
        </div>
      </ContainerContent>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 2, 3],
    },
  };
}

export default organizacion;
