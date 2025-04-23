"use client";
import CategorySelector from "@/_components/Add Product/CatergorySelector";
import DeliveryOptionsSection from "@/_components/Add Product/DeliveryOptionsSection";
import DynamicSpecifications from "@/_components/Add Product/DynamicSpecifications";
import ProductDetailsAdd from "@/_components/Add Product/ProductDetailsAdd";
import ImageUploader from "@/_components/shared/ImageUploader";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [productImage, setProductImage] = useState(null);
  const [multipleProductImage, setMultipleProductImage] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [specs, setSpecs] = useState({});
  const { user } = useAuth();

  const handleSave = (newSpecs) => {
    setSpecs(newSpecs);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsUpload(true);

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const discount = form.discount.value ? parseFloat(form.discount.value) : 0;
    const stock = parseInt(form.stock.value);
    const offer = form.offer.value;

    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !productImage ||
      !selectedCategory ||
      !selectedSubcategory
    ) {
      toast.error("Please fill in all required fields and upload an image.");
      return;
    }

    const productData = {
      name,
      description,
      price,
      discount,
      stock,
      offer,
      thumbnail: productImage,
      gallery: multipleProductImage,
      delivery_options: deliveryOptions,
      category: {
        title: selectedCategory,
        subcategory: selectedSubcategory,
      },
      specifications: specs,
      postedBy: user?.email,
    };

    try {
      const res = await axiosInstance.post("/api/product/add", productData);
      toast.success("Product added successfully!");
      console.log(res.data);
      form.reset();
      setProductImage(null);
      setMultipleProductImage([]);
      setDeliveryOptions([]);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSpecs({});
    } catch (err) {
      toast.error("Failed to add product");
      console.error(err.response?.data || err);
    } finally {
      setIsUpload(false);
    }

    console.log("Final product data to submit:", productData);
  };

  return (
    <div className="container mx-auto px-5 lg:px-8 py-5  ">
      <form
        className="grid grid-cols-4 gap-5 justify-between "
        onSubmit={handleAddProduct}
      >
        <div>
          <ImageUploader
            placeholder="Upload the product thumbnail"
            onUploadSuccess={(id) => setProductImage(id)}
            additional_note="Only PNG, JPG or JPEG allowed"
            multiple={false}
          />
          <ImageUploader
            placeholder="Upload the products all image"
            onUploadSuccess={(images) => setMultipleProductImage(images)}
            additional_note="Only PNG, JPG or JPEG allowed. Multiple images allowed"
            multiple={true}
          />
          <DynamicSpecifications onSave={handleSave} />
        </div>
        <div className="col-span-2 pt-3">
          <ProductDetailsAdd />
          <Button
            disabled={isUpload}
            type="submit"
            className="bg-pale-red mt-5 w-full text-white uppercase font-medium rounded"
          >
            Add this product
          </Button>
        </div>
        <div className="">
          <DeliveryOptionsSection
            selectedOptions={deliveryOptions}
            onChange={setDeliveryOptions}
          />
          <CategorySelector
            onSelect={({ category, subcategory }) => {
              setSelectedCategory(category);
              setSelectedSubcategory(subcategory);
            }}
          />
        </div>
      </form>
    </div>
  );
}
