"use client";
import { useState } from "react";
import Headline from "@/_components/shared/Headline";
import OffersMainCard from "./OffersMainCard";
import OffersSecondaryCard from "./OffersSecondaryCard";
import ViewLessAll from "../../_components/shared/ViewLessAll";

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

  return (
    <div className="">
      <Headline
        label={"Get best deal on "}
        higlightedLabel={"Flash Sale"}
        rightComponent={
          <ViewLessAll
            data={offers}
            chunkArray={chunkArray}
            setShowOffers={setShowOffers}
          />
        }
      />

      {/* Loop through each group of 3 offers */}
      {showOffers.map((group, index) => (
        <div
          key={index}
          className={`container mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-2 mb-5 gap-5`}
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
