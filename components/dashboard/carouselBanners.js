import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/router";
import React, { useMemo, useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CarouselBanners = ({ banners }) => {
  const [t, i18n] = useTranslation("global");
  const route = useRouter();
  const user = useSelector((state) => state.user.user);
  const [counter, setCounter] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const href = (compOrDist, data) => {
    if (compOrDist) {
      const type = data
        .filter(({ fields }) =>
          user.companyId !== null
            ? fields.description.includes("Canales")
            : fields.description.includes("Distribuidores")
        )
        .map(({ fields }) => fields);

      const pdf =
        i18n.resolvedLanguage === "por"
          ? type[
              type.findIndex((element) => element.description.includes("POR"))
            ]
          : type[
              type.findIndex((element) => !element.description.includes("POR"))
            ];

      return pdf?.file?.url;
    }

    const type = data.map(({ fields }) => fields);

    const pdf =
      i18n.resolvedLanguage === "por"
        ? type[type.findIndex((element) => element.description.includes("POR"))]
        : type[
            type.findIndex((element) => !element.description.includes("POR"))
          ];

    return pdf?.file?.url;
  };

  return (
    <Carousel
      mx="auto"
      withIndicators
      plugins={[autoplay.current]}
      onSlideChange={(i) => setCounter(i)}
      initialSlide={counter}
      loop
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      styles={{
        indicator: {
          height: "1rem",
          width: "1rem",
          backgroundColor: "#eb1000",
        },
        control: {
          marginLeft: "-50px",
          marginRight: "-50px",
          backgroundColor: "#eb1000",
        },
      }}
    >
      {user.roleId === 3 && user.region === "BRAZIL" && (
        <Carousel.Slide>
          <a
            className="w-full flex justify-center cursor-pointer p-[1px]"
            href={"https://evt.to/eaguuosuw"}
            target="_blank"
          >
            <figure className="w-full">
              <img
                src={
                  "https://images.ctfassets.net/3rdahgbju2vz/2bdXwai5k4xIrF8h1cSYMI/22defd4a77a1bd5462ba86bb61a8c7ae/CO_ADB_BANNER_Webinar_PA_POR.jpg"
                }
                className="bannersImg"
              />
            </figure>
          </a>
        </Carousel.Slide>
      )}
      {[...banners]
        .sort((a, b) => a.order - b.order)
        .map((data) => {
          return (
            <Carousel.Slide>
              {data.typeRedirection ? (
                <div
                  className="w-full flex justify-center cursor-pointer p-[1px]"
                  onClick={() => route.push(data.redirection)}
                >
                  <figure className="w-full">
                    <img
                      src={
                        i18n.resolvedLanguage === "por"
                          ? data.bannerPor.fields.file.url
                          : i18n.resolvedLanguage === "en"
                          ? data.bannerEn.fields.file.url
                          : data.bannerEsp.fields.file.url
                      }
                      className="bannersImg"
                    />
                  </figure>
                </div>
              ) : data.typeRedirectionLink ? (
                <a
                  className="w-full flex justify-center cursor-pointer p-[1px]"
                  href={
                    i18n.resolvedLanguage === "por"
                      ? data.redirectionPor
                      : i18n.resolvedLanguage === "en"
                      ? data.redirectionEn
                      : data.redirection
                  }
                  target="_blank"
                >
                  <figure className="w-full">
                    <img
                      src={
                        i18n.resolvedLanguage === "por"
                          ? data.bannerPor.fields.file.url
                          : i18n.resolvedLanguage === "en"
                          ? data.bannerEn.fields.file.url
                          : data.bannerEsp.fields.file.url
                      }
                      className="bannersImg"
                    />
                  </figure>
                </a>
              ) : (
                <a
                  className="w-full flex justify-center cursor-pointer p-[1px]"
                  href={href(data.companyAndDistribuitors, data.pdfs)}
                  target="_blank"
                >
                  <figure className="w-full">
                    <img
                      src={
                        i18n.resolvedLanguage === "por"
                          ? data.bannerPor.fields.file.url
                          : i18n.resolvedLanguage === "en"
                          ? data.bannerEn.fields.file.url
                          : data.bannerEsp.fields.file.url
                      }
                      className="bannersImg"
                    />
                  </figure>
                </a>
              )}
            </Carousel.Slide>
          );
        })}
    </Carousel>
  );
};

export default CarouselBanners;
