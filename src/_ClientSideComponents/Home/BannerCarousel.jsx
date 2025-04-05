"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export const BannerCarousel = () => {
  const carouselImages = [
    "/assets/Banner/banner-online-fashion-sale_23-2148585402.jpg",
    "/assets/Banner/shopping-online-banner-template_23-2148578528.jpg",
    "/assets/Banner/shopping-online-banner-template_23-2148578529.jpg",
  ];
  return (
    <Carousel
      loop={true}
      prevArrow={0}
      nextArrow={0}
      autoplay={true}
      autoplayDelay={3000}
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-[35] flex -translate-x-2/4 gap-2">
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
      {carouselImages?.map((slide, index) => (
        <Image
          key={`img-${index + 1}`}
          src={slide}
          alt={`slide${index + 1}`}
          width={100}
          height={90}
          unoptimized={true}
          className="h-[18rem] sm:h-[20rem] md:h-[26rem] lg:h-[30rem] w-full "
        />
      ))}
    </Carousel>
  );
};
