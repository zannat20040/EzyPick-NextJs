"use client";
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance"; // Don't forget to import
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import getUserByEmail from "@/utils/getUserByEmail";
import ImageUploader from "@/_components/shared/ImageUploader";
import DynamicSpecifications from "../Add Product/DynamicSpecifications";
import ProductDetailsAdd from "../Add Product/ProductDetailsAdd";
import DeliveryOptionsSection from "../Add Product/DeliveryOptionsSection";
import CategorySelector from "../Add Product/CatergorySelector";
import FullScreenSpinner from "@/_components/shared/FullScreenSpinner";

export default function UpdatedProductForm({ product }) {
  const { user } = useAuth();
  const router = useRouter();
  const [productImage, setProductImage] = useState(product?.thumbnail || null);
  const [multipleProductImage, setMultipleProductImage] = useState(
    product?.gallery || []
  );
  const [deliveryOptions, setDeliveryOptions] = useState(
    product?.delivery_options || []
  );
  const [selectedCategory, setSelectedCategory] = useState(
    product?.category?.title || null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    product?.category?.subcategory || null
  );
  const [specs, setSpecs] = useState(product?.specifications || {});
  const [isUpload, setIsUpload] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        const data = await getUserByEmail(user.email);
        setUserData(data);
      }
    };

    fetchUserData();
  }, [user?.email]);

  useEffect(() => {
    if (!product) return; // still loading

    setProductImage(product.thumbnail || null);
    setMultipleProductImage(product.gallery || []);
    setDeliveryOptions(product.delivery_options || []);
    setSelectedCategory(product.category?.title || null);
    setSelectedSubcategory(product.category?.subcategory || null);
    setSpecs(product.specifications || {});
  }, [product]);

  const handleSave = (updatedSpecs) => {
    setSpecs(updatedSpecs);
  };

  const handleUpdateProduct = async (e) => {
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
      !deliveryOptions.length > 0 ||
      !selectedCategory ||
      !selectedSubcategory
    ) {
      toast.error("Please fill in all required fields and upload an image.");
      setIsUpload(false);
      return;
    }

    const updatedProduct = {
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
      sellerName: userData?.name,
    };

    try {
      const res = await axiosInstance.put(
        `/api/product/${product._id}`,
        updatedProduct
      );
      if (res.data) {
        toast.success("Product updated successfully!");
      }
      router.push(`/seller/myproducts/${user?.email}`);
    } catch (err) {
      toast.error(
        err.response.data.error.message ||
          err.message ||
          "Failed to update product"
      );
      console.error(err);
    } finally {
      setIsUpload(false);
    }
  };

  return (
    <div className="container mx-auto px-5 lg:px-8 py-5 relative">
      {isUpload && <FullScreenSpinner label={"Product is updating...."} />}

      <form
        className="grid grid-cols-4 gap-5 justify-between"
        onSubmit={handleUpdateProduct}
      >
        <div>
          <ImageUploader
            placeholder="Upload the product thumbnail"
            onUploadSuccess={(id) => setProductImage(id)}
            initialImage={productImage}
            additional_note="Only PNG, JPG or JPEG allowed"
            multiple={false}
          />
          <ImageUploader
            placeholder="Upload the products all image"
            onUploadSuccess={(images) => setMultipleProductImage(images)}
            initialImages={multipleProductImage}
            additional_note="Only PNG, JPG or JPEG allowed. Multiple images allowed"
            multiple={true}
          />
          <DynamicSpecifications
            initialData={specs} // ✅ Pre-fill specifications
            onSave={handleSave}
          />
        </div>
        <div className="col-span-2 pt-3">
          <ProductDetailsAdd initialData={product} />{" "}
          {/* ✅ Pass product data to pre-fill inputs */}
          <Button
            disabled={isUpload}
            type="submit"
            className="bg-pale-red mt-5 w-full text-white uppercase font-medium rounded"
          >
            Update Product
          </Button>
        </div>
        <div>
          <DeliveryOptionsSection
            selectedOptions={deliveryOptions}
            onChange={setDeliveryOptions}
          />
          <CategorySelector
            initialCategory={product?.category?.title}
            initialSubcategory={product?.category?.subcategory}
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
