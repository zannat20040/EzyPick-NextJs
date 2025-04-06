"use client";
import useFetchProduct from "@/hooks/useFetchProduct";
import Image from "next/image";
import CustomRating from "../../_components/shared/ustomRating";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";

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
    <div className=" px-4 container mx-auto py-10">
      <div className="card rounded grid grid-cols-1 md:grid-cols-2 gap-5  justify-between items-center bg-base-100 ">
        <figure className="rounded">
          <Image
            width={100}
            height={100}
            src={product?.image}
            alt={product?.name}
            className="rounded w-full h-full"
          />
        </figure>
        <div className="p-0 md:card-body rounded">
          <span>{product?.name}</span>
          <h2 className="card-title text-2xl">{product?.name}</h2>
          <CustomRating rating={product?.rating} />

          <p className="my-5 text-3xl font-bold">${product?.price}</p>
          <p className="text-gray">{product?.description}</p>

          <div className="mt-5 flex  gap-2 rounded">
            <div className="flex rounded items-center bg-neutral-100 ">
              <button
                onClick={HandleAdd}
                className="btn outline-0 border-0 rounded-none hover:text-white p-3 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all "
              >
                <FaPlus />
              </button>
              <button className="btn outline-0 border-0 rounded-none hover:text-white p-3 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all ">
                {quantity}
              </button>
              <button
                onClick={HandleRemove}
                className="btn outline-0 border-0 rounded-none hover:text-white p-3 hover:bg-pale-red hover:text-neutral-50 duration-300 transition-all "
              >
                <FaMinus />
              </button>
            </div>
            <button
              onClick={() => HandleCart()}
              className="px-4 py-2 rounded bg-pale-red text-sm md:text-base duration-300  text-neutral-50 font-semibold w-full hover:bg-neutral-950"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
