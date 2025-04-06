"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/json/Recommendation.json`
        );
        const data = response.data;
        const foundProduct = data.find((item) => item.id === id);
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error, setLoading, setError };
};

export default useFetchProduct;
