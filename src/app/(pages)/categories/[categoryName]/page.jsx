import ProductsByCatergory from "@/_components/ProductByCatergories/ProductsByCatergory";
import axiosInstance from "@/utils/axiosInstance";

// ✅ Fetch products by category
async function fetchProducts(categoryName) {
  try {
    const res = await axiosInstance.get(`/api/product/category/${categoryName}`);
    return res.data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// ✅ Fetch subcategories by category
async function fetchSubcategories(categoryName) {
  try {
    const res = await axiosInstance.get(`/api/categories/subcategories?category=${categoryName}`);
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
}

export default async function Page({ params }) {
  const { categoryName } = params;

  const productsByCategory = await fetchProducts(categoryName);
  const brandCatergory = await fetchSubcategories(categoryName);

  console.log("productsByCategory", productsByCategory);
  console.log("brandCatergory", brandCatergory);

  return (
    <div>
      <ProductsByCatergory
        productsByCategory={productsByCategory}
        brandCatergory={brandCatergory}
      />
    </div>
  );
}
