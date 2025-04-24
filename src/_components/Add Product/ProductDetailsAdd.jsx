import React from "react";

export default function ProductDetailsAdd({ initialData = {} }) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name="name"
        type="text"
        placeholder="Enter product name"
        required
        defaultValue={initialData.name}
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <textarea
        name="description"
        placeholder="Enter detailed product description"
        required
        rows={10}
        defaultValue={initialData.description}
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <input
        min="0"
        name="price"
        type="number"
        placeholder="Enter product price (৳)"
        required
        defaultValue={initialData.price}
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <input
        min="0"
        max="100"
        name="discount"
        type="number"
        defaultValue={initialData.discount}
        placeholder="Enter discount percentage (e.g. 10 for 10%, Optional)"
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <input
        name="stock"
        type="number"
        min="0"
        placeholder="Enter available stock quantity"
        required
        defaultValue={initialData.stock}
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />

      <input
        name="offer"
        type="text"
        defaultValue={initialData.offer}
        placeholder="Enter promotional offer title (optional)"
        className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
      />
    </div>
  );
}
