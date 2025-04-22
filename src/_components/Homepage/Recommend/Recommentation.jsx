import RecommendationList from "@/_components/Homepage/Recommend/RecommendationList";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import React from "react";

async function getRecommentation() {
  try {
    const response = await axiosInstance.get("/items/products");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Recommentation() {
  const recommendations = await getRecommentation();

  if (!recommendations.length) {
    return (
      <div className="text-center py-10">No Recommentation available.</div>
    );
  }
  return <RecommendationList recommendations={recommendations} />;
}
