import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const CarouselBanners = () => {
  const [t, i18n] = useTranslation("global");
  const route = useRouter();
  const [counter, setCounter] = useState(0);

  console.log(counter);

  return (
    <Carousel
      mx="auto"
      withIndicators
      onSlideChange={(i) => setCounter(i)}
      initialSlide={counter}
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
      <Carousel.Slide>
        <a
          className="w-full flex justify-center cursor-pointer p-[1px]"
          href={
            i18n.resolvedLanguage === "por"
              ? "assets/pdf/pdfPromo1Por.pdf"
              : "assets/pdf/pdfPromo1Esp.pdf"
          }
          target="_blank"
        >
          <figure className="w-full">
            <img
              src={
                i18n.resolvedLanguage === "por"
                  ? "assets/dashboard/banners/bannerPromo1Por.webp"
                  : "assets/dashboard/banners/bannerPromo1.webp"
              }
              className="bannersImg"
            />
          </figure>
        </a>
      </Carousel.Slide>
      <Carousel.Slide>
        <div
          className="w-full flex justify-center cursor-pointer p-[1px]"
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
      <Carousel.Slide>
        <div
          className="w-full flex justify-center cursor-pointer p-[1px]"
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
    </Carousel>
  );
};

export default CarouselBanners;
