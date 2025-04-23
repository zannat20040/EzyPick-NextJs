import React from "react";
import AllProductList from "./AllProductList";
import axiosInstance from "@/utils/axiosInstance";

async function getProducts() {
  try {
    const response = await axiosInstance.get("/api/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Allproduct() {
  const allProducts = await getProducts();

  if (!allProducts.length) {
    return <div className="text-center py-10">No Products available.</div>;
  }
  return <AllProductList allProducts={allProducts} />;
}
