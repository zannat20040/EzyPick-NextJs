'use client'
import React, { useState, useEffect } from "react";
import { IoMic, IoSearch } from "react-icons/io5";
import axiosInstance from "@/utils/axiosInstance";
import { translateQueryFrontend } from "@/utils/translateQueryFrontend";
import { logSearch } from "@/utils/searchInteration";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [translatedQuery, setTranslatedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // ✅ Debounce logic: wait 1s after typing
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim()) {
        try {
          setLoading(true);
          const translated = await translateQueryFrontend(query);
          setTranslatedQuery(translated);

          // ✅ Log the search
          if (user?.email) {
            await logSearch({ email: user.email, term: translated });
          }

          // ✅ Call search API
          const res = await axiosInstance.post("/api/products/search", {
            query: translated,
          });
          setResults(res.data);
        } catch (err) {
          console.error("Error:", err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 1000); // ✅ wait 1000ms (1 second)

    return () => clearTimeout(delay); // ✅ clear if user types again
  }, [query]);

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
          onChange={(e) => setQuery(e.target.value)} // ✅ live typing
        />

        <div
          className={`bg-slate-800 p-3 rounded-none text-sm text-white border-l border-gray-200 ${
            loading ? "bg-pale-red" : ""
          }`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
          ) : (
            <IoSearch className="text-pale-red" />
          )}
        </div>
      </div>

      {/* Search Result Box */}
      {query.trim() && !loading && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full translate-y-[10px] w-full bg-white border border-gray-200 z-40 rounded p-3 max-h-96 overflow-y-auto shadow">
          {results.map((product) => (
            <Link
              href={`/product/${product.name}/pid-${product.id}`}
              key={product.id}
            >
              <div className="border-b py-2">
                <p className="text-sm">{product.name}</p>
                <p className="text-xs uppercase font-semibold opacity-60">
                  ৳{product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* If no result and query is not empty */}
      {query.trim() && !loading && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full translate-y-[10px] w-full bg-white border border-gray-200 z-40 rounded p-3 max-h-96 overflow-y-auto shadow">
          <div className="text-center text-gray-500 text-sm">
            No products found...
          </div>
        </div>
      )}
    </div>
  );
}
