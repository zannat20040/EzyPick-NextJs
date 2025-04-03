"use client";
import { useState } from "react";
import Headline from "@/_components/shared/Headline";
import OffersMainCard from "./OffersMainCard";
import OffersSecondaryCard from "./OffersSecondaryCard";
import ViewLessAll from "../Shared/ViewLessAll";

// Function to split array into chunks of 3
const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

export default function OffersComponent({ offers }) {
  const [showOffers, setShowOffers] = useState(
    chunkArray(offers, 3).slice(0, 1)
  );
  const [isViewAll, setIsViewAll] = useState(false);

  const HandleAllOffer = () => {
    if (isViewAll) {
      setShowOffers(chunkArray(offers, 3).slice(0, 1)); // Show only first 3 when "View Less"
    } else {
      setShowOffers(chunkArray(offers, 3)); // Show all chunks when "View All"
    }
    setIsViewAll(!isViewAll);
  };

  return (
    <div className="space-y-6">
      <Headline
        label={"Get best deal on "}
        higlightedLabel={"Flash sale"}
        rightComponent={<ViewLessAll HandleAllOffer={HandleAllOffer} isViewAll={isViewAll}/>}
      />

      {/* Loop through each group of 3 offers */}
      {showOffers.map((group, index) => (
        <div
          key={index}
          className={`container mx-auto px-5 lg:px-8 grid grid-cols-2 mb-5 gap-5`}
        >
          {index % 2 === 0 ? (
            <>
              {/* First Large Offer */}
              <OffersMainCard mainOffer={group[0]} />
              {/* Two Smaller Offers */}
              <OffersSecondaryCard secondaryOffers={group.slice(1)} />
            </>
          ) : (
            <>
              {/* First Large Offer */}
              <OffersSecondaryCard secondaryOffers={group.slice(1)} />

              {/* Two Smaller Offers */}
              <OffersMainCard mainOffer={group[0]} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
