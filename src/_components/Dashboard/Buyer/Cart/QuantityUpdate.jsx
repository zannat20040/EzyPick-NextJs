"use client";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function QuantityUpdate({ productId,  quantity, setQuantity }) {
  const { user } = useAuth();

  console.log(productId)

  const HandleAdd = async () => {
    if (!user?.email || !productId) {
      return toast.error("Please log in and select a product");
    }

    try {
      const res = await axiosInstance.post("/api/user-cart/cart/increase", {
        email: user.email,
        productId: productId,
        action: "increase", // ✅ Required field
      });

      if (res.status === 200) {
        setQuantity((prev) => prev + 1);
        toast.success("Quantity increased");
      } else {
        toast.error(res.data?.message || "Failed to increase quantity");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  const HandleRemove = async () => {
    if (quantity <= 1) {
      toast.error("Minimum quantity is 1");
      return;
    }

    try {
      // 👇 Update in UI
      setQuantity((prev) => prev - 1);

      // 👇 Update in backend
      await axiosInstance.post("/api/user-cart/cart/increase", {
        email: user.email,
        productId: productId,
        action: "decrease",
      });

      toast.success("Quantity decreased");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  return (
      <div className="flex  items-center bg-neutral-100 rounded-md ">
        <button
          onClick={HandleAdd}
          className="btn outline-0 border-0 rounded-r-none  hover:text-white p-3 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all "
        >
          <FaPlus />
        </button>
        <button className="btn outline-0 border-0  rounded-none hover:text-white p-3 px-5 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all ">
          {quantity}
        </button>
        <button
          onClick={HandleRemove}
          className="btn outline-0 border-0 rounded-l-none hover:text-white p-3 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all "
        >
          <FaMinus />
        </button>
      </div>
  );
}
