"use client";
import { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export const BannerCarousel = () => {
  const [offerProducts, setOfferProducts] = useState([]);

  useEffect(() => {
    const fetchOfferProducts = async () => {
      try {
        const response = await axiosInstance.get(
          "/items/products"
        );
        const filtered = response.data.data.filter(
          (product) => product.offer && product.image
        );
        setOfferProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchOfferProducts();
  }, []);

  return (
    <div className="container px-5 lg:px-8 mx-auto">
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
        {offerProducts.map((product, index) => (
          <Image
            key={`product-${index}`}
            src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${product.image}`} // assumes image is stored as URL path
            alt={product.name || `Product ${index + 1}`}
            width={100}
            height={90}
            unoptimized={true}
            className="h-[18rem] sm:h-[20rem] md:h-[26rem] lg:h-[30rem] w-full"
          />
        ))}
      </Carousel>
    </div>
  );
};
