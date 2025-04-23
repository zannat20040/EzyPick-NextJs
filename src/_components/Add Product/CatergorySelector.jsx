"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";

export default function CategorySelector({ onSelect }) {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryQuery, setSubcategoryQuery] = useState("");
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [categoryError, setCategoryError] = useState(false);
  const [subcategoryError, setSubcategoryError] = useState(false);

  // 🔁 Fetch all categories from DB
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/api/categories");
        setCategoryList(res.data); // full category objects
      } catch (err) {
        setCategoryError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // 🔁 When category is selected, update subcategories
  useEffect(() => {
    if (selectedCategory) {
      const matched = categoryList.find((c) => c.category === selectedCategory);
      setSubcategoryList(matched?.subcategory || []);
    } else {
      setSubcategoryList([]);
    }
  }, [selectedCategory, categoryList]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryQuery(category);
    setSelectedSubcategory(null);
    setSubcategoryQuery("");
  };

  const handleAddCategory = async () => {
    try {
      await axiosInstance.post("/api/categories", { category: categoryQuery });
      setSelectedCategory(categoryQuery);

      // Refresh category list
      const res = await axiosInstance.get("/api/categories");
      setCategoryList(res.data.data);
    } catch (err) {
      setCategoryError("Failed to add category");
    }
  };

  const handleSubcategorySelect = (title) => {
    setSelectedSubcategory(title);
    setSubcategoryQuery(title);
    if (onSelect) onSelect({ category: selectedCategory, subcategory: title });
  };

  const handleAddSubcategory = async () => {
    try {
      await axiosInstance.post("/api/categories/add-subcategory", {
        category: selectedCategory,
        title: subcategoryQuery,
      });
      setSelectedSubcategory(subcategoryQuery);

      // Refresh category list
      const res = await axiosInstance.get("/api/categories");
      setCategoryList(res.data.data);

      if (onSelect)
        onSelect({ category: selectedCategory, subcategory: subcategoryQuery });
    } catch (err) {
      setSubcategoryError("Failed to add subcategory");
    }
  };

  return (
    <div className="space-y-4 text-gray-600 mt-5">
      <div>
        <label className="text-sm font-medium ">Category</label>
        <input
          type="text"
          value={categoryQuery}
          onChange={(e) => setCategoryQuery(e.target.value)}
          placeholder="Search or type to add"
          className="w-full px-2 mt-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
        />
        {categoryError && (
          <p className="text-red-600 p-1 flex items-center gap-2 bg-red-50 mt-2 text-xs  px-3 rounded font-semibold">
            <RxCrossCircled
              className="text-red-600 text-base cursor-pointer"
              onClick={() => setCategoryError("")}
            />
            {categoryError}
          </p>
        )}
        <div className="mt-1  max-h-[150px] overflow-y-auto">
          {categoryList
            .filter((c) =>
              c.category.toLowerCase().includes(categoryQuery.toLowerCase())
            )
            .map((c, i) => (
              <div
                key={i}
                className="px-2 py-1 text-sm cursor-pointer rounded hover:bg-gray-200"
                onClick={() => handleCategorySelect(c.category)}
              >
                {c.category}
              </div>
            ))}
          {!categoryList.some((c) => c.category === categoryQuery) &&
            categoryQuery && (
              <button
                type="button"
                className="text-sm text-pale-red mt-1"
                onClick={handleAddCategory}
              >
                + Add "{categoryQuery}"
              </button>
            )}
        </div>
      </div>

      {selectedCategory && (
        <div>
          <label className="text-sm font-medium">Subcategory</label>

          <input
            type="text"
            value={subcategoryQuery}
            onChange={(e) => setSubcategoryQuery(e.target.value)}
            placeholder="Search or type to add"
            className="w-full px-2 mt-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
          />
          {subcategoryError && (
            <p className="text-red-600 p-1 flex items-center gap-2 bg-red-50 mt-2 text-xs  px-3 rounded font-semibold">
              <RxCrossCircled
                className="text-red-600 text-base cursor-pointer"
                onClick={() => setSubcategoryError("")}
              />
              {subcategoryError}
            </p>
          )}
          <div className="mt-1  max-h-[150px] overflow-y-auto">
            {subcategoryList
              .filter((s) =>
                s.toLowerCase().includes(subcategoryQuery.toLowerCase())
              )
              .map((s, i) => (
                <div
                  key={i}
                  className="px-2 py-1 text-sm cursor-pointer rounded hover:bg-gray-200"
                  onClick={() => handleSubcategorySelect(s)}
                >
                  {s}
                </div>
              ))}
            {!subcategoryList.includes(subcategoryQuery) &&
              subcategoryQuery && (
                <button
                  type="button"
                  className="text-sm text-pale-red mt-1"
                  onClick={handleAddSubcategory}
                >
                  + Add "{subcategoryQuery}"
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
