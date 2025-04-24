import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import UpdatedProductForm from "@/_components/Dashboard/Seller/Update Product/UpdatedProductForm";

// ✅ Fetch product by ID
async function getProductById(id) {
  try {
    const res = await axiosInstance.get(`/api/product/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default async function EditProductPage({ params }) {
  const { id } = params;

  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="text-red-500 text-center py-10">Product not found.</div>
    );
  }

  return (
    <>
      <BreadCrumbsComp
        category={`${product.sellerName}`}
        subcategory={"update product"}
      />
      <UpdatedProductForm product={product}/>
    </>
  );
}
