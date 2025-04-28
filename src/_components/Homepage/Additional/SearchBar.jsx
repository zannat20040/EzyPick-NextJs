"use client";
import { IoMic, IoSearch } from "react-icons/io5";
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance"; // Assuming you have this!

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (!newQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axiosInstance.post("/api/products/search", { query: newQuery });
      setResults(res.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="relative mx-auto shadow-none border border-gray-200">
      <div className="flex items-center rounded-md shadow-none">
        <div className="absolute flex items-center pl-2.5">
          <IoMic className="text-pale-red cursor-pointer" />
          <div className="h-6 border-l border-slate-500 ml-2.5"></div>
        </div>

        <input
          className="w-full bg-transparent p-3 placeholder:text-slate-400 text-slate-700 text-sm pr-3 pl-14 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
          placeholder="Search your need"
          value={query}
          onChange={handleChange}
        />

        <button
          className="bg-slate-800 p-3 rounded-none text-center text-sm text-white transition-all hover:bg-pale-red border-l border-gray-200 group disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          disabled
        >
          <IoSearch className="text-pale-red group-hover:text-white" />
        </button>
      </div>

      {/* Search Result Box */}
      {query.trim() && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full translate-y-[10px] w-full bg-white border border-gray-200 z-40 rounded p-3 max-h-96 overflow-y-auto shadow">
          {results.map((product) => (
            <div key={product.id} className="border-b py-2 last:border-b-0">
              <p className="text-sm">{product.name}</p>
              <p className="text-xs uppercase font-semibold opacity-60">
                ৳{product.price}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* If no result and query is not empty */}
      {query.trim() && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full translate-y-[10px] w-full bg-white border border-gray-200 z-40 rounded p-3 max-h-96 overflow-y-auto shadow">
          <div className="text-center text-gray-500 text-sm">
            No products found...
          </div>
        </div>
      )}
    </div>
  );
}
