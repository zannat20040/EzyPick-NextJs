"use client";
import CategorySelector from "@/_components/Dashboard/Seller/Add Product/CatergorySelector";
import DeliveryOptionsSection from "@/_components/Dashboard/Seller/Add Product/DeliveryOptionsSection";
import DynamicSpecifications from "@/_components/Dashboard/Seller/Add Product/DynamicSpecifications";
import ProductDetailsAdd from "@/_components/Dashboard/Seller/Add Product/ProductDetailsAdd";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import FullScreenSpinner from "@/_components/shared/FullScreenSpinner";
import ImageUploader from "@/_components/shared/ImageUploader";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import getUserByEmail from "@/utils/getUserByEmail";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
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
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        const data = await getUserByEmail(user.email);
        setUserData(data);
      }
    };

    fetchUserData();
  }, [user?.email]);

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
      setIsUpload(false);
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
      sellerName: userData?.name,
    };

    console.log(productData);
    
    try {
      const res = await axiosInstance.post("/api/product/add", productData);
      toast.success("Product added successfully!");
      form.reset();
      setProductImage(null);
      setMultipleProductImage([]);
      setDeliveryOptions([]);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSpecs({});
      router.push(`/seller/myproducts/${user?.email}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product");
      console.error(err.response?.data || err);
    } finally {
      setIsUpload(false);
    }
  };

  return (
    <div className="relative">
      {isUpload && <FullScreenSpinner label={"Product is uplaoding...."} />}
      <BreadCrumbsComp
        category={`${userData?.name}`}
        subcategory={"Add new product"}
      />
      <div className="container mx-auto px-5 lg:px-8 py-5  ">
        <form
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-between "
          onSubmit={handleAddProduct}
        >
          {/* <div className=" pt-3 block md:hidden">
            <ProductDetailsAdd />
          </div> */}
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
            {/* <div className="block  lg:hidden">
              <DeliveryOptionsSection
                selectedOptions={deliveryOptions}
                onChange={setDeliveryOptions}
              />
              <div>
                <CategorySelector
                  onSelect={({ category, subcategory }) => {
                    setSelectedCategory(category);
                    setSelectedSubcategory(subcategory);
                  }}
                />
              </div>
            </div> */}
          </div>
          <div className="md:col-span-2 pt-3 ">
            <ProductDetailsAdd />
            <Button
              disabled={isUpload}
              type="submit"
              className="bg-pale-red md:block hidden mt-5 w-full text-white uppercase font-medium rounded"
            >
              Add this product
            </Button>
          </div>
          <div className="">
            <DeliveryOptionsSection
              selectedOptions={deliveryOptions}
              onChange={setDeliveryOptions}
            />
            <div>
              <CategorySelector
                onSelect={({ category, subcategory }) => {
                  setSelectedCategory(category);
                  setSelectedSubcategory(subcategory);
                }}
              />
            </div>
          </div>
          <Button
            disabled={isUpload}
            type="submit"
            className="bg-pale-red md:hidden block mt-5 w-full text-white uppercase font-medium rounded"
          >
            Add this product
          </Button>
        </form>
      </div>
    </div>
  );
}
