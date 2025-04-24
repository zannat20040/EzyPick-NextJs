"use client";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import getUserByEmail from "@/utils/getUserByEmail";

export default function AddToCartlist({ productId }) {
  const { user } = useAuth();

  const HandleAddToCart = async () => {
    if (!user?.email) {
      return toast.error("Please log in to add to cart.");
    }

    try {
      const userData = await getUserByEmail(user.email);
      if (!userData) {
        return toast.error("Failed to get user data.");
      }

      const res = await axiosInstance.post("/api/user-cart/cart/add", {
        email: user.email,
        username: userData.name,
        productId,
        quantity: 1, // optional, default will be 1 if not sent
      });

      if (res.data) {
        toast.success("Added to cart!");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to add to cart"
      );
    }
  };

  return (
    <FaCartShopping
      onClick={HandleAddToCart}
      className="bg-pale-red text-white p-2 w-8 h-8 text-lg rounded hover:bg-gray-300 hover:text-black duration-500 transition-all ease-in-out cursor-pointer"
    />
  );
}
