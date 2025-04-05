import axios from 'axios';
import React from 'react'
import AllProductList from './AllProductList';

async function getProducts() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/json/Recommendation.json`
      );
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
    return <AllProductList allProducts={allProducts}/>;
  }
  

