"use client";
import { useState } from "react";
import Headline from "@/_components/shared/Headline";
import OffersMainCard from "./OffersMainCard";
import OffersSecondaryCard from "./OffersSecondaryCard";
import ViewLessAll from "../../shared/ViewLessAll";

/* helper: split array into chunks of 3 */
const chunk3 = (arr) =>
  Array.from({ length: Math.ceil(arr.length / 3) }, (_, i) =>
    arr.slice(i * 3, i * 3 + 3)
  );

export default function OffersComponent({ offers }) {
  const [viewAll, setViewAll] = useState(false);

  /* show first 3 or all */
  const visibleOffers = viewAll ? offers : offers.slice(0, 3);
  const groups = chunk3(visibleOffers);

  return (
    <div>
      <Headline
        label="Get best deal on "
        higlightedLabel="Flash Sale"
        rightComponent={
          <ViewLessAll
            HandleAllFunction={() => setViewAll(!viewAll)}
            isViewAll={viewAll}
          />
        }
      />

      {groups.map((g, idx) => (
        <div
          key={idx}
          className="container mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
        >
          {idx % 2 === 0 ? (
            <>
              <OffersMainCard mainOffer={g[0]} />
              <OffersSecondaryCard secondaryOffers={g.slice(1)} />
            </>
          ) : (
            <>
              <OffersSecondaryCard secondaryOffers={g.slice(1)} />
              <OffersMainCard mainOffer={g[0]} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
