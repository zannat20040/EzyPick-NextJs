import React from "react";
import { IoShareSocial } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import AddToWishlist from "../Dashboard/Buyer/WishtList/AddToWishlist";
import AddToCartlist from "../Dashboard/Buyer/Cart/AddToCartlist";
import ProductReviewDetails from "./ProductReviewDetails";
import CustomRating from "./ustomRating";

export default function ProductCard({ product }) {
  console.log(product);
  return (
    <Link
      key={product.id}
      href={`/product/${product.name}/pid-${product._id}`}
      className=" bg-base-100 shadow relative rounded group hover:bg-gray-200 duration-300 transition-all ease-in-out flex flex-col h-full w-full"
    >
      <figure className="h-52 w-full bg-gray-200 rounded">
        <Image
          width={100}
          height={100}
          alt={product.name}
          src={product.thumbnail}
          className="h-full w-full rounded text-xs group-hover:scale-90 scale-100 duration-300 transition-all ease-in-out"
        />
      </figure>
      <div className="flex flex-col gap-2 absolute top-3 right-3 opacity-0 group-hover:opacity-100 duration-700 transition-all ease-in-out">
        <IoShareSocial className="bg-gray-300   p-2 w-8 h-8 text-lg rounded hover:bg-pale-red hover:text-white duration-500 transition-all ease-in-out" />
        <AddToCartlist productId={product?._id} />
        <AddToWishlist productId={product?._id} />
      </div>
      <div className="card-body pb-4 items-start text-start flex flex-col flex-1">
        <h6 className="text-sm  ">
          {" "}
          {product.name.split(" ").slice(0, 5).join(" ") +
            (product.name.split(" ").length > 5 ? "..." : "")}
        </h6>
        <p className="text-base text-pale-red">
          ৳
          {product?.discount
            ? (
                product?.price -
                (product?.price * product?.discount) / 100
              ).toFixed(2)
            : product?.price}
          <span className="text-xs text-gray-400">-{product?.discount}%</span>
        </p>
        <div className="flex flex-wrap gap-2 font-bold text-blue-gray-500">
          {/* rating */}
          <CustomRating rating={product?.rating} />

          <span className="text-xs items-center text-gray-400 font-normal">
            ({product?.reviews})
          </span>
          {/* <ProductReviewDetails product={product}/> */}
        </div>
      </div>
    </Link>
  );
}
