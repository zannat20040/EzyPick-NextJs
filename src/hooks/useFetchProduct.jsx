"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/items/products/${id}`);
        const data = response.data.data;
        console.log("data-----------", data)
        setProduct(data);
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
