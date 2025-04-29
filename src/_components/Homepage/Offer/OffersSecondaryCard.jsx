import { useAuth } from "@/Context/AuthContext";
import { logInteraction } from "@/utils/logInteraction";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OffersSecondaryCard({ secondaryOffers }) {
  const { user } = useAuth(); // assuming you store user here
  const handleTrackClick = async (e, offer) => {
    // Track but don't block navigation
    if (user?.email) {
      await logInteraction({
        email: user.email,
        type: "click",
        product: {
          _id: offer._id,
          name: offer.name,
          category: offer.category,
          subcategory: offer.category?.subcategory,
          seller: offer.sellerName,
          price: offer.price,
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 w-full">
      {secondaryOffers.length > 0 &&
        secondaryOffers.map((offer, index) => (
          <Link
            href={`/product/${offer.name}/pid-${offer._id}`}
            onClick={() => handleTrackClick(offer)}
          >
            <div
              className="h-full max-h-[330px] relative"
              key={offer.title || index}
            >
              <Image
                src={offer.thumbnail}
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
                <p className="text-white capitalize">
                  {offer?.category?.title}
                </p>
                <h1 className="font-bold text-2xl text-white">{offer.offer}</h1>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
