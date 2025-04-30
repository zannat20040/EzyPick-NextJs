import axiosInstance from "./axiosInstance";

export const logSearch = async ({ email, term }) => {
  if (!email || !term) return;

  const searchData = {
    email,
    type: "search",
    productId: term, // for search, treat term as ID
    productName: term,
    category: term,
    subcategory: term,
    seller: "N/A",
    price: 0,
  };

  console.log(searchData);
  try {
    await axiosInstance.post("/api/products/track-behavior", searchData);
  } catch (err) {
    console.error("❌ Search tracking failed:", err.message);
  }
};
