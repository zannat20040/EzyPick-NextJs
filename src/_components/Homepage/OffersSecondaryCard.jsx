import Image from "next/image";
import React from "react";

export default function OffersSecondaryCard({ secondaryOffers }) {
  return (
    <div className="grid grid-cols-1 gap-5 w-full">
      {secondaryOffers.length > 0 &&
        secondaryOffers.map((offer, index) => (
          <div className="h-full relative" key={offer.title || index}>
            <Image
              src={offer.image}
              alt={offer.title || "secondary offer"}
              width={1024}
              height={650}
              unoptimized={true}
              quality={100}
              className="h-full w-full object-cover"
            />
            <div
              style={{
                background: `linear-gradient(to top, ${offer.bgColor}, transparent)`,
              }}
              className="h-full absolute top-0 p-5 w-full"
            >
              <p className="text-white">{offer.category}</p>
              <h1 className="font-bold text-2xl text-white">{offer.discount}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}
