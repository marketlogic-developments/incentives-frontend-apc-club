import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CarouselBanners = ({ banners }) => {
  const [t, i18n] = useTranslation("global");
  const route = useRouter();
  const user = useSelector((state) => state.user.user);
  const [counter, setCounter] = useState(0);

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
      onSlideChange={(i) => setCounter(i)}
      initialSlide={counter}
      loop
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
                          : data.bannerEsp.fields.file.url
                      }
                      className="bannersImg"
                    />
                  </figure>
                </div>
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
