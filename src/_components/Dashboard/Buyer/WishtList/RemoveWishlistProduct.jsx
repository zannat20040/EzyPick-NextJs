"use client";

import React from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import swal from "sweetalert";

export default function RemoveWishlistProduct({ email, productId }) {
  const handleRemove = async () => {
    const willDelete = await swal({
      title: "Are you sure you want to delete this product?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (!willDelete) {
      return swal("Product deletion from wishlist cancelled!");
    }

    try {
      const res = await axiosInstance.post("/api/user-cart/wishlist/remove", {
        email,
        productId,
      });

      if (res.data) {
        await swal("Product removed from wishlist successfully", {
          icon: "success",
        });
      }
    } catch (err) {
      toast.error("Failed to remove from wishlist");
      console.error(err);
    }
  };

  return (
    <button className="btn btn-square btn-ghost" onClick={handleRemove}>
      <RiDeleteBin7Line className="text-lg" />
    </button>
  );
}
