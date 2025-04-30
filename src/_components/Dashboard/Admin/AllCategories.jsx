"use client";

import Image from "next/image";
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

export default function AllCategories({ categories: initialCategories }) {
  const [categories, setCategories] = useState(initialCategories); // ✅ local state
  const [loadingId, setLoadingId] = useState(null);

  const handleThumbnailUpload = async (e, categoryId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoadingId(categoryId);

      // 🔥 Step 1: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData
      );

      const uploadedUrl = res.data.secure_url;
      if (!uploadedUrl) {
        throw new Error("Failed to upload to Cloudinary");
      }

      // 🔥 Step 2: Update category thumbnail in backend
      await axiosInstance.put(`/api/categories/${categoryId}/thumbnail`, {
        thumbnail: uploadedUrl,
      });

      // ✅ Step 3: Instantly update thumbnail in frontend without reload
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === categoryId ? { ...cat, thumbnail: uploadedUrl } : cat
        )
      );

      toast.success("Thumbnail updated successfully!");
    } catch (error) {
      console.error("Thumbnail upload/update error:", error);
      toast.error("Failed to update thumbnail");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="container mx-auto my-10 px-5 lg:px-8">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Category ID</th>
              <th>Title</th>
              <th>Subcategories</th>
              <th className="text-center">Thumbnail</th>
              <th className="text-center">Update</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-100 py-2">
                  <td className="text-xs text-gray-500 text-center py-2">
                    {category._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="font-semibold capitalize py-2">
                    {category.category}
                  </td>
                  <td className="text-xs text-gray-600 py-2">
                    {category.subcategory?.length > 0
                      ? category.subcategory.join(", ")
                      : "No subcategories"}
                  </td>
                  <td className="py-2">
                    {category.thumbnail ? (
                      <div className="w-12 h-12 mx-auto relative bg-white rounded-lg overflow-hidden">
                        <Image
                          src={category.thumbnail}
                          alt="Category Thumbnail"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center text-xs">No thumbnail available</p>
                    )}
                  </td>
                  <td className="py-2">
                    <div className="flex flex-col items-center gap-1 justify-center">
                      <label className="text-xs text-pale-red underline cursor-pointer">
                        {loadingId === category._id
                          ? "Updating..."
                          : "Update Image"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleThumbnailUpload(e, category._id)
                          }
                          className="hidden"
                          disabled={loadingId === category._id}
                        />
                      </label>
                      <span className="text-[10px] text-gray-400">
                        No Thumbnail
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
