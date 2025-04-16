"use client";
import ProductsByCatergory from "@/_components/ProductByCatergories/ProductsByCatergory";
import React from "react";
import products from "../../../../../public/json/Recommendation.json";
import categories from "../../../../../public/json/Categories.json";

export default function page({ params }) {
  const { categoryName } = params;

  const productsByCategory = products
    ? products.filter((product) => product.category === categoryName)
    : [];

  const brandCatergory = categories
    ? categories.find((category) => category.category === categoryName)
        .subcategories
    : [];

  return (
    <div>
      <ProductsByCatergory
        productsByCategory={productsByCategory}
        brandCatergory={brandCatergory}
      />
    </div>
  );
}
