"use client";
import React from "react";
import { IoHeartSharp } from "react-icons/io5";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import getUserByEmail from "@/utils/getUserByEmail";

export default function AddToWishlist({ productId }) {
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
          productId,
        });

        if (res.data) {
          toast.success("Added to wishlist!");
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
      className="bg-pale-red text-white p-2 w-8 h-8 text-lg rounded hover:bg-gray-300 hover:text-black duration-500 transition-all ease-in-out cursor-pointer"
    />
  );
}
