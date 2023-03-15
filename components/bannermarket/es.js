import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Carousel } from "@mantine/carousel";

const BnESP = () => {
  return (
    <Carousel
      sx={{ width: " 100%" }}
      mx="auto"
      draggable={false}
      withControls={false}
      height={260}
    >
      <Carousel.Slide>
        <a href="#">
          <img
            className="bannerDesk"
            src="assets/dashboard/banners/bannerDP.webp"
            alt="bannerDigipoints"
          ></img>
          <img
            className="bannerMob"
            src="assets/dashboard/banners/bannerDPcel.png"
            alt="bannerDigipoints"
          ></img>
        </a>
      </Carousel.Slide>
    </Carousel>
  );
};

export default BnESP;
