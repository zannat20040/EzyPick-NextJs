import axiosInstance from "@/utils/axiosInstance";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import AllCategories from "@/_components/Dashboard/Admin/AllCategories"; // 🔥 create this component

// ✅ Fetch all categories
async function getAllCategories() {
  try {
    const response = await axiosInstance.get("/api/categories");
    console.log("All categories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Page() {
  const categories = await getAllCategories();

  if (!categories.length) {
    return <div className="text-center py-10">No categories found.</div>;
  }

  return (
    <>
      <BreadCrumbsComp category="admin" subcategory="All Categories" />
      <AllCategories categories={categories} />
    </>
  );
}
