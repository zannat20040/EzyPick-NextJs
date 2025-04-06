"use client";
import useFetchProduct from "@/hooks/useFetchProduct";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import CustomRating from "@/_components/shared/ustomRating";

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

  function transformSpecifications(specs) {
    let transformed = [];
    for (let key in specs) {
      if (Array.isArray(specs[key])) {
        transformed.push(
          <div key={key} className="flex flex-col gap-1 mt-2">
            <div>
              <span className="font-bold">
                {key.charAt(0).toUpperCase() + key.slice(1)} :
              </span>{" "}
              <span>{specs[key][0]}</span>
            </div>
            <div className="flex gap-1">
              {specs[key].map((spec, index) => (
                <button
                  className="btn  border border-soft-gray bg-white hover:bg-gray-100"
                  key={index}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        );
      } else {
        transformed.push(
          <div key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)} :</strong>{" "}
            {specs[key]}
          </div>
        );
      }
    }
    return transformed;
  }

  return (
    <div className="px-4 container mx-auto py-10">
      <div className="card rounded grid grid-cols-1 md:grid-cols-2 gap-5 justify-between items-center bg-base-100 ">
        <figure className="rounded">
          <Image
            width={100}
            height={100}
            src={product?.image}
            alt={product?.name}
            className="rounded w-full h-full"
          />
        </figure>
        <div className=" flex flex-col gap-0 rounded p-5 ">
          <span className="text-gray-500 text-sm">{product?.postBy}</span>
          <h2 className="card-title text-2xl">{product?.name}</h2>
          <div className="flex items-center gap-3">
            <CustomRating rating={product?.rating} />
            <span className="text-sm text-gray-500">
              {product?.rating}{" "}
              <span>(Based on {product?.reviews} reviews)</span>
            </span>
          </div>

          <p className="mt-2 text-3xl font-bold">${product?.price}</p>

          <div className="mt-3">{transformSpecifications(product?.specifications)}</div>

          <p className="text-gray">{product?.description}</p>

          <div className="mt-5 flex gap-2 rounded">
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
