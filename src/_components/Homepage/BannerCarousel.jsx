"use client";
import { useCallback, useEffect, useState } from "react";
import img1 from "../../../public/assets/banner-online-fashion-sale_23-2148585402.jpg";
import img2 from "../../../public/assets/shopping-online-banner-template_23-2148578528.jpg";
import img3 from "../../../public/assets/shopping-online-banner-template_23-2148578529.jpg";

export const BannerCarousel = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const carouselImages = [    "/assets/banner-online-fashion-sale_23-2148585402.jpg",
    "/assets/shopping-online-banner-template_23-2148578528.jpg",
    "/assets/shopping-online-banner-template_23-2148578529.jpg",
];
  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1
    );
  const nextSlider = useCallback(
    () =>
      setCurrentSlider((currentSlider) =>
        currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1
      ),
    [carouselImages.length]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <div className="h-60 w-full md:h-[300px] lg:h-[450px] relative overflow-hidden">
    
      {/* dots */}
      <div className="flex justify-center items-center rounded-full z-50 absolute bottom-4 w-full gap-1">
        {carouselImages.map((img, idx) => (
          <button
            key={`${img}_${idx}`}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-full duration-500 ${
              currentSlider === idx ? "w-8 bg-pale-red" : "w-2 bg-white"
            } h-1`}
          ></button>
        ))}
      </div>
      {/* Carousel container */}
      <div
        className="ease-linear duration-500 flex transform-gpu"
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {/* sliders */}
        {carouselImages.map((slide, idx) => (
          <img
            key={slide}
            src={slide}
            className="min-w-full h-60 bg-black/20 sm:h-96 md:h-[540px]"
            alt={`Slider - ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
