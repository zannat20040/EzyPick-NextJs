"use client";
import Headline from "@/_components/shared/Headline";
import ProductCard from "@/_components/shared/ProductCard";
import ViewLessAll from "@/_components/shared/ViewLessAll";
import { useState } from "react";

export default function RecommendationList({ recommendations = [] }) {
  const [isViewAll, setIsViewAll] = useState(false);

  const showRecommendation = isViewAll
    ? recommendations
    : recommendations.slice(0, 12);

  const HandleAllRecommendation = () => {
    setIsViewAll((prev) => !prev);
  };

  return (
    <div className=" ">
      <Headline
        label="Top recommendation"
        higlightedLabel="For You"
        rightComponent={
          showRecommendation.length > 12 && (
            <ViewLessAll
              HandleAllFunction={HandleAllRecommendation}
              isViewAll={isViewAll}
            />
          )
        }
      />
      <div className="container mx-auto px-5 lg:px-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {showRecommendation.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
