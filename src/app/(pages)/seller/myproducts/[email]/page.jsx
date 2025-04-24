import axiosInstance from "@/utils/axiosInstance";
import SellerProductList from "@/_components/Dashboard/Seller/SellerAllProduct/SellerProductList";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";

// ✅ Fetch products by user email
async function getUserProducts(email) {
  try {
    const response = await axiosInstance.get(`/api/product/user/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user products:", error);
    return [];
  }
}

export default async function Page({ params }) {
  const { email } = params;
  const products = await getUserProducts(email);

  if (!products.length) {
    return (
      <div className="text-center py-10">You have no products listed.</div>
    );
  }

  return (
    <>
      <BreadCrumbsComp
        category={products[0]?.sellerName}
        subcategory={"my all products"}
      />
      <SellerProductList allProducts={products} />;
    </>
  );
}
