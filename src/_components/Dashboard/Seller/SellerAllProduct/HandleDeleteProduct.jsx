"use client";

import { MdOutlineDeleteOutline } from "react-icons/md";
import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import swal from "sweetalert";

export default function HandleDeleteProduct({ product, onDeleted }) {
  const handleDeleteProduct = async () => {
    const willDelete = await swal({
      title: "Are you sure you want to delete this product?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (!willDelete) {
      return swal("Your product deletion was cancelled!");
    }

    try {
      await axiosInstance.delete(`/api/product/${product._id}`);
      toast.success("Product deleted successfully");

      if (onDeleted) onDeleted(product._id); // optional UI update
      await swal("Product deleted successfully!", {
        icon: "success",
      });
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleDeleteProduct}
      className="text-pale-red hover:text-red-200"
    >
      <MdOutlineDeleteOutline className="text-lg" />
    </button>
  );
}
