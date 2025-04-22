import React from "react";

export default function ProductDetailsAdd() {
  return (
    <div className="flex flex-col gap-2">
      <input
        name="name"
        type="text"
        placeholder="Enter product name"
        required
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <textarea
        name="description"
        placeholder="Enter detailed product description"
        required
        rows={10}
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <input
        name="price"
        type="number"
        placeholder="Enter product price (৳)"
        required
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <input
        name="discount"
        type="number"
        placeholder="Enter discount percentage (e.g. 10 for 10%, Optional)"
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <input
        name="stock"
        type="number"
        placeholder="Enter available stock quantity"
        required
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <input
        name="offer"
        type="text"
        placeholder="Enter promotional offer title (optional)"
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />
    </div>
  );
}
