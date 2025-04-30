"use client";
import Headline from "@/_components/shared/Headline";
import ProductCard from "@/_components/shared/ProductCard";
import ViewLessAll from "@/_components/shared/ViewLessAll";
import { useState, useEffect } from "react";

export default function AIrecommendationList({ airecommendations }) {
  const [originalRecommendations, setOriginalRecommendations] = useState(
    airecommendations || []
  );
  const [visibleRecommendations, setVisibleRecommendations] = useState(
    airecommendations?.slice(0, 10) || []
  );
  const [isViewAll, setIsViewAll] = useState(false);

  const HandleAllRecommendation = () => {
    if (isViewAll) {
      setVisibleRecommendations(originalRecommendations.slice(0, 10)); // Show less
    } else {
      setVisibleRecommendations(originalRecommendations); // Show all
    }
    setIsViewAll(!isViewAll);
  };

  return (
    <div>
      <Headline
        label="Get the best products"
        higlightedLabel=" For you"
        rightComponent={
          originalRecommendations.length > 10 && (
            <ViewLessAll
              HandleAllFunction={HandleAllRecommendation}
              isViewAll={isViewAll}
            />
          )
        }
      />

      {visibleRecommendations.length > 0 ? (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 px-5 lg:px-8">
          {visibleRecommendations.map((product) => (
            <ProductCard product={product} key={product.id || product._id} />
          ))}
        </div>
      ) : (
        <p className="container mx-auto py-4 px-5 lg:px-8 text-gray-500 text-sm col-span-5">
          No product available which you may like
        </p>
      )}
    </div>
  );
}
