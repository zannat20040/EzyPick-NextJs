import ProductDetails from "@/_components/shared/ProductDetails";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import axiosInstance from "@/utils/axiosInstance";
import React from "react";

// ✅ Async function to get a single product by ID
async function getProductById(id) {
  try {
    const response = await axiosInstance.get(`/api/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// ✅ Server component
export default async function page({ params }) {
  const { pid } = params;
  const id = pid.replace("pid-", "");

  const product = await getProductById(id);

  if (!product) {
    return (
        <h2 className="text-center text-pale-red p-6">Product not found</h2>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BreadCrumbsComp
        category={product.category.title}
        subcategory={product.category.subcategory}
      />
      <ProductDetails product={product} />
    </div>
  );
}
