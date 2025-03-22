import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/router";
import React, { FC, useMemo, useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface Props {
  banners: any;
}

const CarouselBanners: FC<Props> = ({ banners }) => {
  const [t, i18n] = useTranslation("global");
  const route = useRouter();
  const { user } = useSelector((state: RootState) => state.currentUser);
  const [counter, setCounter] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 5000 }));


  const filters = (banner: any) => {
    if (banner?.exceptions) {
      const org = user?.profile.organizations;

      if (
        banner?.exceptions?.countrys.includes(org?.name) ||
        banner?.exceptions?.region.includes(org?.name)
      ) {
        return banner;
      } else return false;
    }

    return banner;
  };

  const href = (compOrDist: any, data: any) => {
    if (compOrDist) {
      const type = data
        .filter(({ fields }: { fields: any }) =>
          user?.profile.organizations
            ? fields.description.includes("Canales")
            : fields.description.includes("Distribuidores")
        )
        .map(({ fields }: { fields: any }) => fields);

      const pdf =
        i18n.resolvedLanguage === "por"
          ? type[
              type.findIndex((element: any) =>
                element.description.includes("POR")
              )
            ]
          : type[
              type.findIndex(
                (element: any) => !element.description.includes("POR")
              )
            ];

      return pdf?.file?.url;
    }

    const type = data.map(({ fields }: { fields: any }) => fields);

    const pdf =
      i18n.resolvedLanguage === "por"
        ? type[
            type.findIndex((element: any) =>
              element.description.includes("POR")
            )
          ]
        : type[
            type.findIndex(
              (element: any) => !element.description.includes("POR")
            )
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
      {[...banners]
        .sort((a, b) => a.order - b.order)
        .filter(filters)
        .map((data, index) => {
          return (
            <Carousel.Slide key={index}>
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
