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
                    <img className="bannerDesk" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannerescritorioinformacionpor.jpg"></img>
                    <img className="bannerMob" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannercelularinformacionpor.jpg"></img>
                </a>
            </Carousel.Slide>
          </Carousel>

);
};

export default BnPor;
