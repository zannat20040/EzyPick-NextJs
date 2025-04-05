"use client";
import Headline from "@/_components/shared/Headline";
import ProductCard from "@/_components/shared/ProductCard";
import ViewLessAll from "@/_components/shared/ViewLessAll";
import  {useState} from "react";

export default function RecommendationList({ recommendations }) {
  const [showRecommendation, setShowRecommendation] = useState(
    recommendations.slice(0, 7)
  );
  const [isViewAll, setIsViewAll] = useState(false);

  const HandleAllRecommendation = () => {
    if (isViewAll) {
      setShowRecommendation(recommendations.slice(0, 7));
    } else {
      setShowRecommendation(recommendations);
    }
    setIsViewAll(!isViewAll);
  };
  return (
    <div className=" ">
      <Headline
        label="Top recommendation"
        higlightedLabel="For You"
        rightComponent={
          <ViewLessAll
            HandleAllFunction={HandleAllRecommendation}
            isViewAll={isViewAll}
          />
        }
      />
      <div className="container mx-auto px-5 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {showRecommendation.map((product) => (
        <ProductCard product={product}/>
        ))}
      </div>
    </div>
  );
}
