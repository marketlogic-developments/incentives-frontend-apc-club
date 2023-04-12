import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesByType,
  getSalesByTypeComp,
  getSalesByTypeDist,
} from "../../store/reducers/sales.reducer";

const GraphSales = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const sales = useSelector((state) => state.sales.salesbType);
  const dispatch = useDispatch();
  const [content, setContent] = useState(0);
  const [CC, setCC] = useState([]);
  const [DC, setDC] = useState([]);

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    if (token && sales.length === 0) {
      if (user.company === null) {
        dispatch(
          getSalesByTypeDist(token, user.distributionChannel.soldToParty)
        );
      } else {
        dispatch(getSalesByTypeComp(token, user.company.resellerMasterId));
      }
    }
  }, [token]);

  useEffect(() => {
    setCC(
      sales.filter(({ business_unit }) => business_unit === "Creative Cloud")
    );
    setDC(
      sales.filter(({ business_unit }) => business_unit === "Document Cloud")
    );
  }, [sales]);

  const typeOfData = useMemo(() => {
    if (content === 0) {
      return (
        <div className="grid grid-cols-3 place-items-center">
          <div className="justify-evenly flex w-1/2">
            <div className="flex flex-col items-center w-full gap-5">
              <p className="text-secondary text-xs">
                {t("dashboard.renovaciones")}
              </p>
              <div
                className={`radial-progress text-secondary flex items-center `}
                style={{
                  "--value":
                    (CC.filter(
                      ({ business_type }) => business_type === "Renewal"
                    )
                      .map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                      )
                      .reduce(
                        (currently, preValue) => currently + preValue,
                        0
                      ) *
                      100) /
                    Math.round(
                      CC.map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                      ).reduce((currently, preValue) => currently + preValue, 0)
                    ),
                  "--size": "7rem",
                  "--thickness": "5px",
                }}
              >
                <div className="flip-card-Graph">
                  <div className="flip-card-inner-Graph">
                    <div className="flip-card-front-Graph">
                      <div className="flip-card-front-Graph text-xs ">
                        <p className="text-black">
                          {Math.round(
                            (CC.filter(
                              ({ business_type }) => business_type === "Renewal"
                            )
                              .map(({ total_sales_amount }) =>
                                Number(total_sales_amount)
                              )
                              .reduce(
                                (currently, preValue) => currently + preValue,
                                0
                              ) *
                              100) /
                              Math.round(
                                CC.map(({ total_sales_amount }) =>
                                  Number(total_sales_amount)
                                ).reduce(
                                  (currently, preValue) => currently + preValue,
                                  0
                                )
                              )
                          )}
                          %
                        </p>
                        <p className="text-black">
                          $
                          {Math.round(
                            CC.filter(
                              ({ business_type }) => business_type === "Renewal"
                            )
                              .map(({ total_sales_amount }) =>
                                Number(total_sales_amount)
                              )
                              .reduce(
                                (currently, preValue) => currently + preValue,
                                0
                              )
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flip-card-back-Graph text-xs text-black">
                      <p className="text-primary">
                        {t("dashboard.dpObtenidos")}:
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 justify-center items-center  ">
            <div className="flex flex-col items-center justify-evenly w-full">
              <p className="font-bold text-xl text-secondary text-center">
                {user.roleId === 5 ? t("dashboard.mvCC") : t("dashboard.vCC")}
                <br />
                Creative Cloud
              </p>
              <p>
                $
                {Math.round(
                  CC.map(({ total_sales_amount }) =>
                    Number(total_sales_amount)
                  ).reduce((currently, preValue) => currently + preValue, 0)
                )}
              </p>
            </div>
          </div>
          <div className="justify-evenly flex w-full">
            <div className="flex flex-col items-center w-1/2 gap-5">
              <p className="text-secondary text-xs">
                {t("dashboard.nbusiness")}
              </p>
              <div
                className={`radial-progress text-secondary flex items-center`}
                style={{
                  "--value":
                    (CC.filter(
                      ({ business_type }) => business_type === "Renewal"
                    )
                      .map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                      )
                      .reduce(
                        (currently, preValue) => currently + preValue,
                        0
                      ) *
                      100) /
                    Math.round(
                      CC.map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                      ).reduce((currently, preValue) => currently + preValue, 0)
                    ),
                  "--size": "7rem",
                  "--thickness": "5px",
                }}
              >
                <div className="flip-card-Graph">
                  <div className="flip-card-inner-Graph">
                    <div className="flip-card-front-Graph text-xs text-black">
                      <p className="text-black">
                        {Math.round(
                          (CC.filter(
                            ({ business_type }) =>
                              business_type === "New Business"
                          )
                            .map(({ total_sales_amount }) =>
                              Number(total_sales_amount)
                            )
                            .reduce(
                              (currently, preValue) => currently + preValue,
                              0
                            ) *
                            100) /
                            Math.round(
                              CC.map(({ total_sales_amount }) =>
                                Number(total_sales_amount)
                              ).reduce(
                                (currently, preValue) => currently + preValue,
                                0
                              )
                            )
                        )}
                        %
                      </p>
                      <p className="text-black">
                        $
                        {Math.round(
                          CC.filter(
                            ({ business_type }) =>
                              business_type === "New Business"
                          )
                            .map(({ total_sales_amount }) =>
                              Number(total_sales_amount)
                            )
                            .reduce(
                              (currently, preValue) => currently + preValue,
                              0
                            )
                        )}
                      </p>
                    </div>
                    <div className="flip-card-back-Graph text-xs text-black">
                      <p className="text-primary">
                        {t("dashboard.dpObtenidos")}:
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (content === 1) {
      return (
        <div className="grid grid-cols-3 place-items-center">
          <div className="justify-evenly flex w-1/2">
            <div className="flex flex-col items-center w-full gap-5">
              <p className="text-xs text-primary">
                {t("dashboard.renovaciones")}
              </p>
              <div
                className={`radial-progress text-primary flex items-center `}
                style={{
                  "--value":
                    (DC.filter(
                      ({ business_type }) => business_type === "Renewal"
                    )
                      .map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                      )
                      .reduce(
                        (currently, preValue) => currently + preValue,
                        0
                      ) *
                      100) /
                    Math.round(
                      DC.map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                      ).reduce((currently, preValue) => currently + preValue, 0)
                    ),
                  "--size": "7rem",
                  "--thickness": "5px",
                }}
              >
                <div className="flip-card-Graph">
                  <div className="flip-card-inner-Graph">
                    <div className="flip-card-front-Graph">
                      <div className="flip-card-front-Graph text-xs ">
                        <p className="text-black">
                          {Math.round(
                            (DC.filter(
                              ({ business_type }) => business_type === "Renewal"
                            )
                              .map(({ total_sales_amount }) =>
                                Number(total_sales_amount)
                              )
                              .reduce(
                                (currently, preValue) => currently + preValue,
                                0
                              ) *
                              100) /
                              Math.round(
                                DC.map(({ total_sales_amount }) =>
                                  Number(total_sales_amount)
                                ).reduce(
                                  (currently, preValue) => currently + preValue,
                                  0
                                )
                              )
                          )}
                          %
                        </p>
                        <p className="text-black">
                          $
                          {Math.round(
                            DC.filter(
                              ({ business_type }) => business_type === "Renewal"
                            )
                              .map(({ total_sales_amount }) =>
                                Number(total_sales_amount)
                              )
                              .reduce(
                                (currently, preValue) => currently + preValue,
                                0
                              )
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flip-card-back-Graph text-xs text-black">
                      <p className="text-primary">
                        {t("dashboard.dpObtenidos")}:
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[60%] justify-center items-center  ">
            <div className="flex flex-col items-center justify-evenly w-full">
              <p className="font-bold text-xl text-primary text-center">
                {user.roleId === 5 ? t("dashboard.mvDC") : t("dashboard.vDC")}
                <br />
                Document Cloud
              </p>
              <p>
                $
                {Math.round(
                  DC.map(({ total_sales_amount }) =>
                    Number(total_sales_amount)
                  ).reduce((currently, preValue) => currently + preValue, 0)
                )}
              </p>
            </div>
          </div>
          <div className="justify-evenly flex w-full">
            <div className="flex flex-col items-center w-1/2 gap-5">
              <p className="text-xs text-primary">{t("dashboard.nbusiness")}</p>
              <div
                className={`radial-progress text-primary flex items-center `}
                style={{
                  "--value":
                    (DC.filter(
                      ({ business_type }) => business_type === "New Business"
                    )
                      .map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                      )
                      .reduce(
                        (currently, preValue) => currently + preValue,
                        0
                      ) *
                      100) /
                    Math.round(
                      DC.map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                      ).reduce((currently, preValue) => currently + preValue, 0)
                    ),
                  "--size": "7rem",
                  "--thickness": "5px",
                }}
              >
                <div className="flip-card-Graph">
                  <div className="flip-card-inner-Graph">
                    <div className="flip-card-front-Graph text-xs text-black">
                      <p className="text-black">
                        {Math.round(
                          (DC.filter(
                            ({ business_type }) =>
                              business_type === "New Business"
                          )
                            .map(({ total_sales_amount }) =>
                              Number(total_sales_amount)
                            )
                            .reduce(
                              (currently, preValue) => currently + preValue,
                              0
                            ) *
                            100) /
                            Math.round(
                              DC.map(({ total_sales_amount }) =>
                                Number(total_sales_amount)
                              ).reduce(
                                (currently, preValue) => currently + preValue,
                                0
                              )
                            )
                        )}
                        %
                      </p>
                      <p className="text-black">
                        $
                        {Math.round(
                          DC.filter(
                            ({ business_type }) =>
                              business_type === "New Business"
                          )
                            .map(({ total_sales_amount }) =>
                              Number(total_sales_amount)
                            )
                            .reduce(
                              (currently, preValue) => currently + preValue,
                              0
                            )
                        )}
                      </p>
                    </div>
                    <div className="flip-card-back-Graph text-xs text-black">
                      <p className="text-primary">
                        {t("dashboard.dpObtenidos")}:
                      </p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }, [content, sales, CC, DC]);

  return (
    <div className="flex flex-col w-[90%] justify-evenly">
      <div className="flex justify-around">
        <p
          className={`font-bold  ${
            content === 0 ? "titleGraphCarouselSelected" : "titleGraphCarousel"
          } cursor-pointer`}
          onClick={() => setContent(0)}
        >
          Creative Cloud
        </p>
        <p
          className={`font-bold  ${
            content === 1 ? "titleGraphCarouselSelected" : "titleGraphCarousel"
          } cursor-pointer`}
          onClick={() => setContent(1)}
        >
          Document Cloud
        </p>
      </div>
      {content === 0 ? <hr id="hrCC" /> : <hr id="hrDC" />}

      {typeOfData}
    </div>
  );
};

export default GraphSales;
