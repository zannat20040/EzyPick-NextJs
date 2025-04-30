"use client";
import { useAuth } from "@/Context/AuthContext";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import AIrecommendationList from "./AIrecommendationList";

export default function AIrecommendation() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInstance.post("/api/products/airecommends", {
          email: user.email,
        });

        const productIDs = res.data.recommendations;

        const allProductsRes = await axiosInstance.get("/api/product"); // make sure this returns an array
        const allProducts = allProductsRes.data;

        const matchedProducts = allProducts.filter((product) =>
          productIDs.includes(product._id)
        );

        setRecommendations(matchedProducts);
      } catch (err) {
        console.error("Failed to fetch AI recommendations:", err);
      }
    };

    if (user?.email) {
      fetchRecommendations();
    }
  }, [user?.email]);

  return (
    <div className="">
      {recommendations.length > 0 && (
        <AIrecommendationList airecommendations={recommendations} />
      )}
    </div>
  );
}
