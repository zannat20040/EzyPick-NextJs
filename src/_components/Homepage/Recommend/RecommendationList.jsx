"use client";
import Headline from "@/_components/shared/Headline";
import ProductCard from "@/_components/shared/ProductCard";
import ViewLessAll from "@/_components/shared/ViewLessAll";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function RecommendationList({ product }) {
  const [fullRecommendations, setFullRecommendations] = useState([]);
  const [visibleRecommendations, setVisibleRecommendations] = useState([]);
  const [isViewAll, setIsViewAll] = useState(false);

  const HandleAllRecommendation = () => {
    if (isViewAll) {
      setVisibleRecommendations(fullRecommendations.slice(0, 10));
    } else {
      setVisibleRecommendations(fullRecommendations);
    }
    setIsViewAll(!isViewAll);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInstance.post("/api/products/recommend", {
          category: product.category.title,
          price: product.price,
          productId: product._id,
          subcategory: product.category.subcategory,
        });

        setFullRecommendations(res.data);
        setVisibleRecommendations(res.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching recommendations:", error.message);
      }
    };

    if (product) {
      fetchRecommendations();
    }
  }, [product]);

  return (
    <div>
      <Headline
        label="You may "
        higlightedLabel=" Also Like"
        rightComponent={
          fullRecommendations.length > 10 && (
            <ViewLessAll
              HandleAllFunction={HandleAllRecommendation}
              isViewAll={isViewAll}
            />
          )
        }
      />

      {visibleRecommendations.length > 0 ? (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
