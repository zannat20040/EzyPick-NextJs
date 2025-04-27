import axiosInstance from "@/utils/axiosInstance";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import AllSellers from "@/_components/Dashboard/Admin/AllSellers";

// ✅ Fetch all sellers
async function getAllSellers() {
  try {
    const response = await axiosInstance.get("/api/users/sellers");
    console.log("All sellers:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return [];
  }
}

export default async function Page() {
  const sellers = await getAllSellers();

  if (!sellers.length) {
    return <div className="text-center py-10">No sellers found.</div>;
  }

  return (
    <>
      <BreadCrumbsComp category="admin" subcategory="All Sellers" />
      <AllSellers sellers={sellers} />
    </>
  );
}
