import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Carousel } from "@mantine/carousel";

const BnPor = () => {
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
                    <img className="bannerDesk" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannerescritoriobienvenidapor.jpg"></img>
                    <img className="bannerMob" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannercelularbienvenidapor.jpg"></img>
            </Carousel.Slide>
            <Carousel.Slide>
                <a href="/mkt/promociones.html" target="_blank">
                    <img className="bannerDesk" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebcrbannerescritorioagentespor.jpg"></img>
                    <img className="bannerMob" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannercelularagentespor.jpg"></img>
                </a>
            </Carousel.Slide>
            <Carousel.Slide>
                <a href="/mkt/voc-sabe-quando-vai-v-los-na-sua-conta.html" target="_blank">
                    <img className="bannerDesk" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannerescritorioflowchartpor.jpg"></img>
                    <img className="bannerMob" src="https://hkegkg.stripocdn.email/content/guids/CABINET_575d536c6464b045851200b4c4f7fe5fda63e318e7ca2ae8a62ad09a1f6c8000/images/coadobebannercelularflowchartpor.jpg"></img>
                </a>
            </Carousel.Slide>
          </Carousel>

);
};

export default BnPor;
