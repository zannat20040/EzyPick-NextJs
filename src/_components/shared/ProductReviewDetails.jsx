'use client'
import React, { useEffect, useState } from "react";
import CustomRating from "./ustomRating";
import axiosInstance from "@/utils/axiosInstance";

export default function ProductReviewDetails({ product }) {
  // const [productReviews, setProductReviews] = useState([]);
  // useEffect(() => {
  //   if (product?._id) {
  //     fetchProductReviews();
  //   }
  // }, [product?._id]);

  // const fetchProductReviews = async () => {
  //   try {
  //     const res = await axiosInstance.get(`/api/reviews/${product._id}`);
  //     setProductReviews(res.data.reviews || []);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  // const reviewCount = productReviews.length;

  // const avgRating =
  //   reviewCount > 0
  //     ? (
  //         productReviews.reduce((acc, review) => acc + review.rating, 0) /
  //         reviewCount
  //       ).toFixed(1)
  //     : 0;

  return (
    <>
     
    </>
  );
}
