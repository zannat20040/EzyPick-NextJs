import axios from 'axios';
import CategoryList from '@/_ClientSideComponents/Home/CategoryList';

async function getCategories() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/json/Categories.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Categories() {
  const categories = await getCategories();

  if (!categories.length) {
    return <div className="text-center py-10">No categories available.</div>;
  }

  return (
      <CategoryList categories={categories} />
  );
}