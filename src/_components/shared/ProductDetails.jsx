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
import getUserByEmail from "@/utils/getUserByEmail";
import QuantityUpdate from "../Dashboard/Buyer/Cart/QuantityUpdate";

export default function ProductDetails({ product, id }) {
  const [productImg, setProductImg] = useState(product?.thumbnail);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const { user } = useAuth();

  // const HandleAdd = async () => {
  //   if (!user?.email || !product?._id) {
  //     return toast.error("Please log in and select a product");
  //   }

  //   try {
  //     const res = await axiosInstance.post("/api/user-cart/cart/increase", {
  //       email: user.email,
  //       productId: product._id,
  //       action: "increase", // ✅ Required field
  //     });

  //     if (res.status === 200) {
  //       setQuantity((prev) => prev + 1);
  //       toast.success("Quantity increased");
  //     } else {
  //       toast.error(res.data?.message || "Failed to increase quantity");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err.response?.data?.message || "Server error");
  //   }
  // };

  // const HandleRemove = async () => {
  //   if (quantity <= 1) {
  //     toast.error("Minimum quantity is 1");
  //     return;
  //   }

  //   try {
  //     // 👇 Update in UI
  //     setQuantity((prev) => prev - 1);

  //     // 👇 Update in backend
  //     await axiosInstance.post("/api/user-cart/cart/increase", {
  //       email: user.email,
  //       productId: product._id,
  //       action: "decrease",
  //     });

  //     toast.success("Quantity decreased");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to update quantity");
  //   }
  // };

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
              {/* <div className="flex  items-center bg-neutral-100 rounded-md ">
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
              </div> */}
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
