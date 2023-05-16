import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const CarouselBanners = () => {
  const [t, i18n] = useTranslation("global");
  const route = useRouter();
  return (
    <Carousel
      mx="auto"
      withIndicators
      styles={{
        indicator: {
          height: "1rem",
          width: "1rem",
          backgroundColor: "#eb1000",
        },
        control: {
          marginLeft: "-60px",
          marginRight: "-60px",
          backgroundColor: "#eb1000",
        },
      }}
    >
      <Carousel.Slide>
        <div
          className="w-full flex justify-center cursor-pointer"
          onClick={() => route.push("/howtowin")}
        >
          <figure className="w-full">
            {i18n.resolvedLanguage === "por" ? (
              <img
                src="assets/dashboard/banners/htwPor.webp"
                className="bannersImg"
                style={{ width: "auto" }}
              />
            ) : (
              <img
                src="assets/dashboard/banners/htw.webp"
                className="bannersImg"
              />
            )}
          </figure>
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div
          className="w-full flex justify-center cursor-pointer"
          onClick={() => route.push("/releases/marketplace")}
        >
          <figure className="w-full">
            <img
              src={
                i18n.resolvedLanguage === "por"
                  ? "assets/dashboard/banners/bannerMarketPlacePor.webp"
                  : "assets/dashboard/banners/bannerMarketPlace.webp"
              }
              className="bannersImg"
            />
          </figure>
        </div>
      </Carousel.Slide>
    </Carousel>
  );
};

export default CarouselBanners;
