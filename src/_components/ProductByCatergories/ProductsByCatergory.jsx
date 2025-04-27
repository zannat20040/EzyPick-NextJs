"use client";
import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import axiosInstance from "@/utils/axiosInstance";

export default function ProductsByCategory({
  productsByCategory,
  brandCatergory = [],
}) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [deliveryType, setDeliveryType] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [sortOption, setSortOption] = useState("price_low");
  const [brandFilter, setBrandFilter] = useState([]);
  const [allDeliveryOptions, setAllDeliveryOptions] = useState([]); // ✅ Dynamic list from DB

  const toggleChecked = (value, listSetter) =>
    listSetter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  useEffect(() => {
    async function fetchDeliveryOptions() {
      try {
        const res = await axiosInstance.get("/api/deliveryoptions");
        if (res.data.options) {
          // 🔥 Extract only title from each delivery option
          const titles = res.data.options.map((option) => option.title);
          setAllDeliveryOptions(titles); // ✅ only ["Cash on delivery", "Standard Delivery", ...]
        }
      } catch (error) {
        console.error("Failed to fetch delivery options:", error);
      }
    }

    fetchDeliveryOptions();
  }, []);

  const filteredProducts = useMemo(() => {
    return productsByCategory.filter((product) => {
      const productPrice = parseFloat(product.price) || 0;

      const matchesSearch =
        (product.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (product.description?.toLowerCase() || "").includes(
          search.toLowerCase()
        );

      const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

      const matchesDelivery =
        deliveryType.length === 0 ||
        deliveryType.some((type) =>
          (product.delivery_options || []).includes(type)
        ); // ✅ fixed

      const matchesRating =
        ratingFilter.length === 0 ||
        ratingFilter.some(
          (rating) => Math.floor(product.rating || 0) >= rating
        ); // ✅ fixed

      const matchesBrand =
        brandFilter.length === 0 ||
        (product.category?.subcategory &&
          brandFilter.includes(product.category.subcategory)); // ✅ safer

      return (
        matchesSearch &&
        matchesPrice &&
        matchesDelivery &&
        matchesRating &&
        matchesBrand
      );
    });
  }, [
    productsByCategory,
    search,
    minPrice,
    maxPrice,
    deliveryType,
    ratingFilter,
    brandFilter,
  ]);

  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    switch (sortOption) {
      case "price_low":
        return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price_high":
        return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "date_new":
        return arr.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "date_old":
        return arr.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return arr;
    }
  }, [filteredProducts, sortOption]);

  return (
    <section className="px-5 lg:px-8 container mx-auto mt-10">
      {/* Search Bar */}
      <div className="flex justify-end">
        <div className="mb-4 w-[35%]">
          <input
            type="text"
            placeholder="Search products…"
            className="input border border-gray-200 w-full outline-none focus:outline-none shadow-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-5 mt-10 gap-6 justify-between">
        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Sort Options */}
          <div>
            <h3 className="font-semibold mb-2">Sort by</h3>
            {[
              { value: "price_low", label: "Price (Low → High)" },
              { value: "price_high", label: "Price (High → Low)" },
              { value: "date_new", label: "Newest First" },
              { value: "date_old", label: "Oldest First" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sort"
                  className="radio radio-xs text-pale-red"
                  value={value}
                  checked={sortOption === value}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>

          {/* Brand (Subcategory) Filter */}
          <div>
            <h3 className="font-semibold mb-2">Subcategory</h3>
            <div className="flex flex-wrap gap-2">
              {brandCatergory?.map((sub) => (
                <label key={sub} className="label cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm rounded-sm text-pale-red"
                    checked={brandFilter.includes(sub)}
                    onChange={() => toggleChecked(sub, setBrandFilter)}
                  />
                  <span className="label-text">{sub}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price (৳)</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="input input-bordered input-sm w-20"
                min={0}
                value={minPrice}
                onChange={(e) => setMinPrice(+e.target.value)}
              />
              <span>—</span>
              <input
                type="number"
                className="input input-bordered input-sm w-20"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
              />
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <h3 className="font-semibold mb-2">Delivery Type</h3>
            <div className="flex flex-wrap gap-2">
              {allDeliveryOptions.length > 0 ? (
                allDeliveryOptions.map((type) => (
                  <label key={type} className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded-sm text-pale-red"
                      checked={deliveryType.includes(type)}
                      onChange={() => toggleChecked(type, setDeliveryType)}
                    />
                    <span className="label-text">{type}</span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-400">No delivery options</p>
              )}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold mb-2">Rating</h3>
            <div className="flex flex-wrap gap-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <label key={stars} className="label cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm rounded-sm text-pale-red"
                    checked={ratingFilter.includes(stars)}
                    onChange={() => toggleChecked(stars, setRatingFilter)}
                  />
                  <span className="label-text flex items-center gap-1">
                    {Array.from({ length: stars }).map((_, i) => (
                      <span key={i} className="text-pale-red">
                        ★
                      </span>
                    ))}
                    &nbsp;&amp; up
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Listing */}
        <div className="col-span-4 ">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <p className="text-gray-600 text-center p-2 col-span-4">No items found for this category</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
