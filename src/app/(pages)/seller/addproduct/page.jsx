"use client";
import DeliveryOptionsSection from "@/_components/Add Product/DeliveryOptionsSection";
import DynamicSpecifications from "@/_components/Add Product/DynamicSpecifications";
import ProductDetailsAdd from "@/_components/Add Product/ProductDetailsAdd";
import ImageUploader from "@/_components/shared/ImageUploader";
import React, { useState } from "react";

export default function page() {
  const [productImage, setProductImage] = useState(null);
  const [multipleProductImage, setMultipleProductImage] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const handleSave = (specs) => {
    console.log('Saved specifications:', specs);
    // You can send this to your API or parent component
  };
  
  return (
    <div className="container mx-auto px-5 lg:px-8 py-5  ">
      <form className="grid grid-cols-4 gap-5 justify-between ">
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
          <DynamicSpecifications  onSave={handleSave}  />

        </div>
        <div className="col-span-2 pt-3">
          <ProductDetailsAdd />
        </div>
        <div className="">
          <DeliveryOptionsSection selectedOptions={deliveryOptions}
        onChange={setDeliveryOptions}/>
        </div>
      </form>
    </div>
  );
}
