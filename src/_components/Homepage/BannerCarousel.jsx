"use client";
import Image from "next/image";
import img1 from "../../assets/banner-online-fashion-sale_23-2148585402.jpg";
import img2 from "../../assets/shopping-online-banner-template_23-2148578528.jpg";
import img3 from "../../assets/shopping-online-banner-template_23-2148578529.jpg";

import { Carousel } from "@material-tailwind/react";
 
import React from 'react'

export default function BannerCarousel() {
  return (
    <Carousel
    prevArrow={''}
    nextArrow={''}
    autoplay={true}
    autoplayDelay={3000}
    loop={true}
      className=""
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-pale-red" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <Image src={img1} className="h-full w-full object-cover" alt="img1"/>
      <Image src={img2} className="h-full w-full object-cover" alt="img2"/>
      <Image src={img3} className="h-full w-full object-cover" alt="img3"/>
    
    </Carousel>
  );
}
