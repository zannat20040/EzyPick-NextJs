import axiosInstance from "./axiosInstance";

export const logInteraction = async ({ email, type, product }) => {
  if (!email || !type || !product?._id) return;

  const behaviourData = {
    email,
    type, // "click", "search", "wishlist", etc.
    productId: product._id,
    productName: product.name,
    category: product.category.title,
    subcategory: product.category.subcategory,
    seller: product.seller,
    price: product.price,
  };

  console.log(behaviourData)

//   try {
//     await axiosInstance.post("/api/products/track-behavior", behaviourData);
//   } catch (err) {
//     console.error("Interaction log failed:", err.message);
//   }
};
