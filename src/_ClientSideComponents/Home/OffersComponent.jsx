// app/components/OffersComponent.jsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Pagination from "../Shared/Pagination";
import Headline from "@/_components/shared/Headline";

const ITEMS_PER_PAGE = 3;

export default function OffersComponent({ offers }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate current offers
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOffers = offers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // First offer is main, rest are secondary
  const mainOffer = currentOffers[0];
  const secondaryOffers = currentOffers.slice(1);

  const totalPages = Math.ceil(offers.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex justify-between  gap-5 items-center container mx-auto">
        <Headline label={"Flash Sales"} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="container mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* First Large Offer */}
        {mainOffer && (
          <div className="h-full relative">
            <Image
              src={mainOffer.image}
              alt={mainOffer.title}
              width={1024}
              height={650}
              unoptimized={true}
              quality={100}
              className="h-full w-full object-cover"
            />
            <div
              style={{
                background: `linear-gradient(to top, ${mainOffer.bgColor}, transparent)`,
              }}
              className={`h-full absolute top-0 p-5 w-full `}
            >
              <p className="text-white">{mainOffer.category}</p>
              <h1 className="font-bold text-2xl text-white">
                {mainOffer.discount}
              </h1>
            </div>
          </div>
        )}

        {/* Two Smaller Offers */}
        <div className="grid grid-cols-1 gap-5 w-full">
          {secondaryOffers.map((offer) => (
            <div className="h-full relative" key={offer.title}>
              <Image
                src={offer.image}
                alt={offer.title}
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
                className={`h-full absolute top-0 p-5  w-full`}
              >
                <p className="text-white">{offer.category}</p>
                <h1 className="font-bold text-2xl text-white">
                  {offer.discount}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
