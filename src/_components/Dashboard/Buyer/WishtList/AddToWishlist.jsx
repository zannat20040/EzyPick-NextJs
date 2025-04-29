"use client";
import React from "react";
import { IoHeartSharp } from "react-icons/io5";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import getUserByEmail from "@/utils/getUserByEmail";
import { logInteraction } from "@/utils/logInteraction";

export default function AddToWishlist({ product }) {
  const { user } = useAuth();

  const HandleAddToWishlist = () => {
    // Run async logic inside this
    (async () => {
      if (!user?.email) {
        return toast.error("Please log in to add to wishlist.");
      }

      const userData = await getUserByEmail(user.email);
      if (!userData) return toast.error("Failed to get user data.");

      try {
        const res = await axiosInstance.post("/api/user-cart/wishlist/add", {
          email: user.email,
          username: userData.name,
          productId: product._id,
        });

        if (res.data) {
          toast.success("Added to wishlist!");
          await logInteraction({
            email: user.email,
            type: "wishlist",
            product: {
              _id: product._id,
              name: product?.name, // Optional: You can pass full product object if available
              category: product?.category?.title,
              subcategory: product?.category?.subcategory,
              seller: product?.sellerName,
              price: product?.price,
            },
          });
        }
      } catch (err) {
        console.error(err);
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to add to wishlist"
        );
      }
    })();
  };

  return (
    <IoHeartSharp
      onClick={HandleAddToWishlist}
      className="bg-gray-300  p-2 w-8 h-8 text-lg rounded hover:bg-pale-red hover:text-white duration-500 transition-all ease-in-out cursor-pointer"
    />
  );
}
