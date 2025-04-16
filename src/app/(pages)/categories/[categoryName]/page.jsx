'use client'
import ProductsByCatergory from "@/_components/ProductByCatergories/ProductsByCatergory";
import React from "react";
import products from "../../../../../public/json/Recommendation.json";

export default function page({ params }) {
  const { categoryName } = params;

  const productsByCategory = products
    ? products.filter((product) => product.category === categoryName)
    : [];

  return (
    <div>
      <ProductsByCatergory productsByCategory={productsByCategory} />
    </div>
  );
}
