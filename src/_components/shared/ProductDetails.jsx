"use client";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import CustomRating from "@/_components/shared/ustomRating";
import TransformSpecifications from "../ProductDetails/TransformSpecifications";
import { ProductDetailsTab } from "../ProductDetails/ProductDetailsTab";
import RecommendationList from "../Homepage/Recommend/RecommendationList";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import AddToWishlist from "../Dashboard/Buyer/WishtList/AddToWishlist";
import { useAuth } from "@/Context/AuthContext";
import getUserByEmail from "@/utils/getUserByEmail";
import QuantityUpdate from "../Dashboard/Buyer/Cart/QuantityUpdate";

export default function ProductDetails({ product, id }) {
  const [productImg, setProductImg] = useState(product?.thumbnail);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const { user } = useAuth();
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    if (product?._id) {
      fetchProductReviews();
    }
  }, [product?._id]);

  const fetchProductReviews = async () => {
    try {
      const res = await axiosInstance.get(`/api/reviews/${product._id}`);
      setProductReviews(res.data.reviews || []);
    } catch (error) {
      console.error("Error fetching product reviews:", error);
    }
  };

  const reviewCount = productReviews.length;

  const avgRating =
    reviewCount > 0
      ? (
          productReviews.reduce((acc, review) => acc + review.rating, 0) /
          reviewCount
        ).toFixed(1)
      : 0;

  const HandleAddToCart = async ({ productId }) => {
    if (!user?.email) {
      return toast.error("Please log in to add to cart.");
    }

    try {
      const userData = await getUserByEmail(user.email);
      if (!userData) {
        return toast.error("Failed to get user data.");
      }

      const res = await axiosInstance.post("/api/user-cart/cart/add", {
        email: user.email,
        username: userData.name,
        productId,
        quantity,
      });

      if (res.data) {
        toast.success("Added to cart!");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Failed to add to cart"
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
              <CustomRating rating={avgRating} />
              <span className="text-sm text-gray-500">
                {avgRating} <span>(Based on {reviewCount} reviews)</span>
              </span>
            </div>

            <TransformSpecifications
              specs={product?.specifications}
              price={product?.price}
              discount={product?.discount}
            />

            <p className="font-bold text-sm mt-5">
              Last {product?.stock} left -{" "}
              <span className="font-normal">make it yours</span>
            </p>

            {/* button */}
            {product?.stock > 0 ? (
              <div className=" flex gap-2 mt-5 ">
                <QuantityUpdate
                  productId={product._id}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <button
                  onClick={() => HandleAddToCart({ productId: product?._id })}
                  className="py-2 rounded bg-pale-red text-sm text-white duration-300  text-neutral-50 font-semibold  px-10 hover:bg-black"
                >
                  Add to cart
                </button>
              </div>
            ) : (
              <p className="bg-red-100 mt-2 text-red-400 w-fit  px-3 rounded font-bold text-sm mb-1 ">
                Stock out
              </p>
            )}
          </div>
        </div>

        {/* tab */}
        <ProductDetailsTab
          product={product}
          details={product?.description}
          productId={product?._id}
        />
      </div>
      {/* related work*/}
      <RecommendationList recommendations={relatedProducts} />
    </div>
  );
}
