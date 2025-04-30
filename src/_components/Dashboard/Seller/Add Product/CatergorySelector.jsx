"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";

export default function CategorySelector({
  onSelect,
  initialCategory,
  initialSubcategory,
}) {
  /* ─────────── state ─────────── */
  const [categoryQuery, setCategoryQuery] = useState(initialCategory ?? "");
  const [subcategoryQuery, setSubcategoryQuery] = useState(
    initialSubcategory ?? ""
  );
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState(initialSubcategory);

  const [categories, setCategories] = useState([]);          // [{category, subcategory:[]}]
  const [err, setErr] = useState({ cat: "", sub: "" });

  /* ─────────── fetch once ─────────── */
  useEffect(() => {
    axiosInstance
      .get("/api/categories")
      .then((r) => setCategories(r.data))
      .catch(() => setErr((e) => ({ ...e, cat: "Failed to load categories" })));
  }, []);

  /* ─────────── derived lists ─────────── */
  const filteredCategories = useMemo(
    () =>
      categories.filter((c) =>
        c.category.toLowerCase().includes(categoryQuery.toLowerCase())
      ),
    [categories, categoryQuery]
  );

  const currentSubcats = useMemo(() => {
    const match = categories.find((c) => c.category === selectedCategory);
    return match?.subcategory ?? [];
  }, [categories, selectedCategory]);

  const filteredSubcats = useMemo(
    () =>
      currentSubcats.filter((s) =>
        s.toLowerCase().includes(subcategoryQuery.toLowerCase())
      ),
    [currentSubcats, subcategoryQuery]
  );

  /* ─────────── helpers ─────────── */
  const refreshCategories = useCallback(
    (newCat) => setCategories((prev) => [...prev, newCat]),
    []
  );

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCategoryQuery(cat);
    setSelectedSubcategory(null);
    setSubcategoryQuery("");
  };

  const handleAddCategory = async () => {
    const title = categoryQuery.trim();
    if (!title) return;
    try {
      await axiosInstance.post("/api/categories", { category: title });
      refreshCategories({ category: title, subcategory: [] });
      handleCategorySelect(title);
    } catch {
      setErr((e) => ({ ...e, cat: "Failed to add category" }));
    }
  };

  const handleSubcategorySelect = (sub) => {
    setSelectedSubcategory(sub);
    setSubcategoryQuery(sub);
    onSelect?.({ category: selectedCategory, subcategory: sub });
  };

  const handleAddSubcategory = async () => {
    const title = subcategoryQuery.trim();
    if (!title) return;
    try {
      await axiosInstance.post("/api/categories/add-subcategory", {
        category: selectedCategory,
        title,
      });

      // locally patch state instead of refetching
      setCategories((prev) =>
        prev.map((c) =>
          c.category === selectedCategory
            ? { ...c, subcategory: [...c.subcategory, title] }
            : c
        )
      );
      handleSubcategorySelect(title);
    } catch {
      setErr((e) => ({ ...e, sub: "Failed to add subcategory" }));
    }
  };

  /* ─────────── UI ─────────── */
  return (
    <div className="space-y-4 text-gray-600 mt-5">
      {/* ---------- category ---------- */}
      <div>
        <label className="text-sm font-medium">
          Category <span className="text-red-600">*</span>
        </label>
        <input
          value={categoryQuery}
          onChange={(e) => setCategoryQuery(e.target.value)}
          placeholder="Search or type to add"
          className="w-full px-2 mt-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
        />

        {err.cat && (
          <p className="text-red-600 p-1 flex items-center gap-2 bg-red-50 mt-2 text-xs px-3 rounded font-semibold">
            <RxCrossCircled
              className="text-red-600 text-base cursor-pointer"
              onClick={() => setErr((e) => ({ ...e, cat: "" }))}
            />
            {err.cat}
          </p>
        )}

        <div className="mt-1 max-h-[150px] overflow-y-auto">
          {filteredCategories.map((c) => (
            <div
              key={c.category}
              className="px-2 py-1 text-sm cursor-pointer rounded hover:bg-gray-200"
              onClick={() => handleCategorySelect(c.category)}
            >
              {c.category}
            </div>
          ))}

          {!categories.some((c) => c.category === categoryQuery) &&
            categoryQuery && (
              <button
                type="button"
                onClick={handleAddCategory}
                className="text-sm text-pale-red mt-1"
              >
                + Add "{categoryQuery}"
              </button>
            )}
        </div>
      </div>

      {/* ---------- subcategory ---------- */}
      {selectedCategory && (
        <div>
          <label className="text-sm font-medium">
            Subcategory <span className="text-red-600">*</span>
          </label>
          <input
            value={subcategoryQuery}
            onChange={(e) => setSubcategoryQuery(e.target.value)}
            placeholder="Search or type to add"
            className="w-full px-2 mt-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
          />

          {err.sub && (
            <p className="text-red-600 p-1 flex items-center gap-2 bg-red-50 mt-2 text-xs px-3 rounded font-semibold">
              <RxCrossCircled
                className="text-red-600 text-base cursor-pointer"
                onClick={() => setErr((e) => ({ ...e, sub: "" }))}
              />
              {err.sub}
            </p>
          )}

          <div className="mt-1 max-h-[150px] overflow-y-auto">
            {filteredSubcats.map((s) => (
              <div
                key={s}
                className="px-2 py-1 text-sm cursor-pointer rounded hover:bg-gray-200"
                onClick={() => handleSubcategorySelect(s)}
              >
                {s}
              </div>
            ))}

            {!currentSubcats.includes(subcategoryQuery) && subcategoryQuery && (
              <button
                type="button"
                onClick={handleAddSubcategory}
                className="text-sm text-pale-red mt-1"
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
