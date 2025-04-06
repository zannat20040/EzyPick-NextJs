"use client";
import useFetchProduct from "@/hooks/useFetchProduct";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import CustomRating from "@/_components/shared/ustomRating";
import TransformSpecifications from "../ProductDetails/TransformSpecifications";

export default function ProductDetails({ id }) {
  const { product, loading, error } = useFetchProduct(id);
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const HandleAdd = () => {
    setQuantity(quantity + 1);
  };
  const HandleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="px-4 container mx-auto py-10">
      <div className="card rounded grid grid-cols-1 md:grid-cols-2 gap-5 justify-between items-center bg-base-100 ">
        {/* left */}
        <div>
          <figure className="rounded">
            <Image
              width={100}
              height={100}
              src={product?.image}
              alt={product?.name}
              className="rounded w-full h-full"
            />
          </figure>
          <div className="flex gap-2 items-center mt-2">
          {product?.imageGallery.map((img, index) => (
            <div className="h-16 w-16 rounded border border-pale-red">
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
          <span className="text-gray-500 text-sm">{product?.postBy}</span>
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
    </div>
  );
}
