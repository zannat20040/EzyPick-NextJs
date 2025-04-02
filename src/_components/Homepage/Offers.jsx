import React from "react";
import Image from "next/image";
import Headline from "../shared/Headline";

const Offers = () => {
  return (
    <div className="container mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* First Large Offer */}
      <div className="h-full relative">
        <Image
          src="/assets/Offers/Screen-Shot-2023-05-09-at-9.50.02-AM-1024x650.png"
          alt="New Collection Offer"
          width={1024}
          height={650}
          unoptimized={true}
          quality={100}
          className="h-full w-full object-cover"
        />
        <div className="h-full absolute top-0 p-5 bg-gradient-to-t from-pale-red w-full">
          <p className="text-white">New Collection</p>
          <h1 className="font-bold text-2xl text-white">Get Up to 40% Off</h1>
        </div>
      </div>

      {/* Two Smaller Offers */}
      <div className="grid grid-cols-1 gap-5 w-full">
        <div className="h-full relative">
          <Image
            src="/assets/Offers/Launch a New Product.webp"
            alt="Stock Clear Offer"
            width={1024}
            height={650}
            unoptimized={true}
            quality={100}
            className="h-full w-full object-cover"
          />
          <div className="h-full absolute top-0 p-5 bg-gradient-to-t from-[#d8dbe5] w-full">
            <p className="text-white">Stock Clear</p>
            <h1 className="font-bold text-2xl text-white">Get Up to 50% Off</h1>
          </div>
        </div>

        <div className="h-full relative">
          <Image
            src="/assets/Offers/iPhone-XS-1-1.webp"
            alt="Summer Sale Offer"
            width={1024}
            height={650}
            unoptimized={true}
            quality={100}
            className="h-full w-full object-cover"
          />
          <div className="h-full absolute top-0 p-5 bg-gradient-to-t from-gray-600 w-full">
            <p className="text-white">Summer Sale</p>
            <h1 className="font-bold text-2xl text-white">Sale 20%</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
