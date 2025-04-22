"use client";
import useFetchProduct from "@/hooks/useFetchProduct";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import CustomRating from "@/_components/shared/ustomRating";
import TransformSpecifications from "../ProductDetails/TransformSpecifications";
import { ProductDetailsTab } from "../ProductDetails/ProductDetailsTab";
import RecommendationList from "../Homepage/Recommend/RecommendationList";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

export default function ProductDetails({ id }) {
  const { product, setLoading, setError } = useFetchProduct(id);
  const [productImg, setProductImg] = useState(product?.image);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [postedByUser, setPostedByUser] = useState(null);

  useEffect(() => {
    const fetchRelatedProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/json/Recommendation.json`
        );
        const data = response.data;
        const foundProduct = data.filter(
          (item) => product.category == item.category
        );
        setRelatedProducts(foundProduct);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    if (product) {
      fetchRelatedProduct();
    }
  }, [product]);

  useEffect(() => {
    const fetchPostedByUser = async () => {
      if (!product?.user_created) return;
      try {
        const res = await axiosInstance.get(`/users/${product.user_created}`);
        setPostedByUser(res.data.data); // full user object
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchPostedByUser();
  }, [product?.user_created]);

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
    const cartData = {
      user_created: product.user_created,
      product_id: postedByUser.id,
      product_name: product.name,
      image_url: `${process.env.NEXT_PUBLIC_BASE_URL}/asset/${product.image}`,
      price_per_unit: product.price,
      total_price: product.price * quantity,
      category: product.category,
      quantity: quantity,
    };

    try {
      const res = await axiosInstance.post("/items/cart", cartData);
      toast.success("Item added to cart successfully!");
    } catch (err) {
      toast.success(
        err.res.data.data.errors[0] ||
          err.message ||
          "Failed to add item to cart"
      );
    }
  };

  return (
    <div>
      <div className="px-5 lg:px-8 container mx-auto py-10">
        <div className="card rounded grid grid-cols-1 md:grid-cols-2 gap-5 justify-between items-center bg-base-100 ">
          {/* left */}
          <div>
            <figure className="rounded bg-white p-5 border border-gray-200 ">
              <Image
                width={100}
                height={100}
                src={` ${process.env.NEXT_PUBLIC_API_URL}/assets/${product?.image}`}
                // src={productImg || product?.image}
                alt={product?.name}
                className="rounded w-full h-full "
              />
            </figure>
            <div className="flex gap-2 items-center mt-2">
              {product?.image_gallery?.map((img, index) => (
                <div
                  className="h-16 w-16 rounded   p-2 bg-white border border-gray-200 cursor-pointer"
                  onClick={() => setProductImg(img)}
                >
                  <Image
                    width={100}
                    height={100}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${img}`}
                    alt={`imgGallery${index + 1}`}
                    className="rounded w-full h-full text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* right  */}
          <div className=" flex flex-col gap-0 rounded p-5 ">
            <span className="text-gray-500 text-sm">
              {postedByUser
                ? `${postedByUser?.first_name} ${postedByUser?.last_name}`
                : "Unknown User"}
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
              specs={product?.specification}
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
          productId={product?.id}
        />
      </div>
      {/* related work*/}
      <RecommendationList recommendations={relatedProducts} />
    </div>
  );
}
