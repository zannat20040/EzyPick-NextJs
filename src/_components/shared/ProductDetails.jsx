"use client";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import CustomRating from "@/_components/shared/ustomRating";
import TransformSpecifications from "../ProductDetails/TransformSpecifications";
import { ProductDetailsTab } from "../ProductDetails/ProductDetailsTab";
import RecommendationList from "../Homepage/Recommend/RecommendationList";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import AddToWishlist from "../Dashboard/Buyer/WishtList/AddToWishlist";
import { useAuth } from "@/Context/AuthContext";

export default function ProductDetails({ product, id }) {
  const [productImg, setProductImg] = useState(product?.thumbnail);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();

  const HandleAdd = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  const HandleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const HandleCart = async () => {
    const storedUser = JSON.parse(localStorage.getItem("directus_user"));
    const userId = storedUser?.id;

    const cartData = {
      user_created: userId,
      product_id: product.id,
      product_name: product.name,
      image_url: `${process.env.NEXT_PUBLIC_API_URL}/assets/${product.image}`,
      price_per_unit: product.price,
      total_price: product.price * quantity,
      category: product.category,
      quantity: quantity,
    };

    try {
      // 🔍 Check if the item already exists in cart
      const checkRes = await axiosInstance.get(
        `/items/cart?filter[user_created][_eq]=${userId}&filter[product_id][_eq]=${cartData.product_id}`
      );

      const existingItem = checkRes.data.data[0];

      if (existingItem) {
        // 🔁 Update existing item
        const newQuantity = existingItem.quantity + quantity;
        const newTotal = newQuantity * product.price;

        await axiosInstance.patch(`/items/cart/${existingItem.id}`, {
          quantity: newQuantity,
          total_price: newTotal,
        });

        toast.success("Cart updated successfully!");
      } else {
        // ➕ Add new item
        await axiosInstance.post("/items/cart", cartData);
        toast.success("Item added to cart successfully!");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.errors?.[0]?.message ||
          err.message ||
          "Failed to add/update cart"
      );
    }
  };

  return (
    <div>
      <div className="px-5 lg:px-8 container mx-auto py-10">
        <div className="card rounded grid grid-cols-1 md:grid-cols-2 gap-5 justify-between items-center bg-base-100 ">
          {/* left */}
          <div className="relative">
            <div className="absolute top-2 left-2 ">
              <AddToWishlist productId={product?._id} />
            </div>
            <figure className="rounded bg-white p-5 border border-gray-200 ">
              <Image
                width={100}
                height={100}
                src={productImg || product?.thumbnail}
                alt={product?.name}
                className="rounded w-full h-full "
              />
            </figure>
            <div className="flex gap-2 items-center mt-2">
              {product?.gallery?.map((img, index) => (
                <div
                  className="h-16 w-16 rounded   p-2 bg-white border border-gray-200 cursor-pointer"
                  onClick={() => setProductImg(img)}
                >
                  <Image
                    width={100}
                    height={100}
                    src={img}
                    alt={`imgGallery${index + 1}`}
                    className="rounded w-full h-full text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* right  */}
          <div className=" flex flex-col gap-0 rounded p-5 ">
            <span className="text-gray-500 text-sm capitalize">
              {product?.sellerName || "Unknown user"}
            </span>
            <h2 className="card-title text-2xl mb-2">{product?.name}</h2>

            <div className="flex items-center gap-3 mb-2">
              <CustomRating rating={product?.rating} />
              <span className="text-sm text-gray-500">
                {product?.rating}{" "}
                <span>(Based on {product?.reviews} reviews)</span>
              </span>
            </div>

            <TransformSpecifications
              specs={product?.specifications}
              price={product?.price}
              discount={product?.discount}
            />

            <p className="font-bold text-sm my-5">
              Last {product?.stock} left -{" "}
              <span className="font-normal">make it yours</span>
            </p>

            {/* button */}
            <div className=" flex gap-2 ">
              <div className="flex  items-center bg-neutral-100 rounded-md ">
                <button
                  onClick={HandleAdd}
                  className="btn outline-0 border-0 rounded-r-none  hover:text-white p-3 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all "
                >
                  <FaPlus />
                </button>
                <button className="btn outline-0 border-0  rounded-none hover:text-white p-3 px-5 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all ">
                  {quantity}
                </button>
                <button
                  onClick={HandleRemove}
                  className="btn outline-0 border-0 rounded-l-none hover:text-white p-3 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all "
                >
                  <FaMinus />
                </button>
              </div>
              <button
                onClick={() => HandleCart()}
                className="py-2 rounded bg-pale-red text-sm text-white duration-300  text-neutral-50 font-semibold  px-10 hover:bg-black"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {/* tab */}
        <ProductDetailsTab
          details={product?.description}
          productId={product?._id}
        />
      </div>
      {/* related work*/}
      <RecommendationList recommendations={relatedProducts} />
    </div>
  );
}
