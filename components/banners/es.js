import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Carousel } from "@mantine/carousel";

const BnESP = () => {
    const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (

<Carousel
            sx={{ width: " 100%" }}
            mx="auto"
            withIndicators
            withControls={false}
            height={260}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <Carousel.Slide>
                    <img className="bannerDesk" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannerescritoriobienvenidaesp.jpg"></img>
                    <img className="bannerMob" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannercelularbienvenidaesp.jpg"></img>
            </Carousel.Slide>
            {/* <Carousel.Slide>
                <a href="/mkt/promociones.html" target="_blank">
                    <img className="bannerDesk" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebcrbannerescritorioagentesesp.jpg"></img>
                    <img className="bannerMob" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannercelularagentesesp.jpg"></img>
                </a>
            </Carousel.Slide> */}
            <Carousel.Slide>
                <a href="/mkt/sabes-cuando-verlos-reflejados.html" target="_blank">
                    <img className="bannerDesk" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannerescritorioflowchartesp.jpg"></img>
                    <img className="bannerMob" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannercelularflowchartesp.jpg"></img>
                </a>
            </Carousel.Slide>
          </Carousel>

);
};

export default BnESP;
