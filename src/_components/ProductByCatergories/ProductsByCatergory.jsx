"use client";
import React, { useState, useMemo } from "react";
import ProductCard from "../shared/ProductCard";

export default function ProductsByCategory({ productsByCategory }) {
  /* ---------------------------- state ---------------------------- */
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [deliveryType, setDeliveryType] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);

  /* ------------------------ helpers ------------------------ */
  const toggleChecked = (value, listSetter) =>
    listSetter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

   /* ------------------------ filtering ------------------------ */
   const filteredProducts = useMemo(() => {
    return productsByCategory.filter((product) => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                           product.description.toLowerCase().includes(search.toLowerCase());

      // Price filter
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      // Delivery type filter
      const matchesDelivery = deliveryType.length === 0 || 
                             deliveryType.some(type => product.deliveryOptions.includes(type));

      // Rating filter
      const matchesRating = ratingFilter.length === 0 || 
                           ratingFilter.some(rating => Math.floor(product.rating) >= rating);

      return matchesSearch && matchesPrice && matchesDelivery && matchesRating;
    });
  }, [productsByCategory, search, minPrice, maxPrice, deliveryType, ratingFilter]);

  /* --------------------------- UI --------------------------- */
  return (
    <section className="px-5 lg:px-8 container mx-auto mt-10">
      <div className=" flex justify-end ">
        <div className="mb-4 w-[35%]">
          <input
            type="text"
            placeholder="Search products…"
            className="input  border border-gray-200 w-full outline-none focus:outline-none  shadow-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className=" grid grid-cols-5 mt-10 gap-6 justify-between">
        <div className="col-span-1 flex justify-end flex-col gap-4">
          {/* price */}
          <div>
            <h3 className="font-semibold mb-2">Price ($)</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="input input-bordered border-gray-200 focus:shadow-none input-sm focus:outline-none outline-none w-20 focus:border-gray-200"
                min={0}
                value={minPrice}
                onChange={(e) => setMinPrice(+e.target.value)}
              />
              <span>—</span>
              <input
                type="number"
                className="input input-bordered border-gray-200 focus:shadow-none input-sm focus:outline-none outline-none w-20 focus:border-gray-200"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
              />
            </div>
          </div>

          {/* delivery */}
          <div>
            <h3 className="font-semibold mb-2">Delivery Type</h3>
            <div className="flex gap-2 flex-wrap">
              {["Fast", "Standard", "Cash on delivery", "Pickup"].map(
                (type) => (
                  <label key={type} className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded-sm text-pale-red"
                      checked={deliveryType.includes(type)}
                      onChange={() => toggleChecked(type, setDeliveryType)}
                    />
                    <span className="label-text">{type}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* rating */}
          <div>
            <h3 className="font-semibold mb-2">Rating</h3>
            <div className="flex gap-2 flex-wrap">
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
                      /* unicode star, colored via Tailwind */
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

        <div className="col-span-4 ">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
