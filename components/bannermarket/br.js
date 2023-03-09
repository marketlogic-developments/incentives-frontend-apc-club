import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Carousel } from "@mantine/carousel";

const BnPor = () => {
  return (
    <Carousel
      sx={{ width: " 100%" }}
      mx="auto"
      withIndicators
      withControls={false}
      height={260}
    >
      <Carousel.Slide>
        <a href="#">
          <img
            className="bannerDesk"
            src="assets/dashboard/banners/dppor.png"
          ></img>
          <img
            className="bannerMob"
            src="assets/dashboard/banners/dppormob.jpg"
          ></img>
        </a>
      </Carousel.Slide>
    </Carousel>
  );
};

export default BnPor;
