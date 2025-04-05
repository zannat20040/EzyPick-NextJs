import RecommendationList from "@/_ClientSideComponents/Home/RecommendationList";
import axios from "axios";
import React from "react";

async function getRecommentation() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/json/Recommendation.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Recommentation() {
  const recommendations = await getRecommentation();

  if (!recommendations.length) {
    return <div className="text-center py-10">No Recommentation available.</div>;
  }
  return <RecommendationList recommendations={recommendations}/>;
}
