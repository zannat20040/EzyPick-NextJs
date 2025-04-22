import Image from "next/image";
import React from "react";

export default function OffersSecondaryCard({
  secondaryOffers,
}) {
  return (
    <div className="grid grid-cols-1 gap-5 w-full">
      {secondaryOffers.length > 0 &&
        secondaryOffers.map((offer, index) => (
          <div
            className="h-full max-h-[330px] relative"
            key={offer.title || index}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${offer.image}`} // assumes image is stored as URL path
              alt={offer.name || "secondary offer"}
              width={1024}
              height={650}
              unoptimized={true}
              quality={100}
              className="h-full w-full object-cover"
            />
            <div
              style={{
                background: `linear-gradient(to bottom, ${
                  index === 0 ? "#d8dbe5" : "#424242"
                }, transparent)`,
              }}
              className="h-full absolute top-0 p-5 w-full"
            >
              <p className="text-white">category</p>
              <h1 className="font-bold text-2xl text-white">{offer.offer}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}
