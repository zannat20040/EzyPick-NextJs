import Image from "next/image";
import Link from "next/link";
import React from "react";
import RemoveWishlistProduct from "./RemoveWishlistProduct";

export default function WishlistList({ wishlist, email }) {
  return (
    <ul className="list bg-base-100  container px-5 lg:px-8 mx-auto mt-6">
      {wishlist?.map((product) => (
        <li className="list-row px-0">
          <div>
            <Image
              width={100}
              height={100}
              className="size-14 rounded-box bg-gray-100"
              src={product?.productId.thumbnail}
              name={product?.productId.name}
            />
          </div>
          <div>
            <div>{product?.productId.name}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              ৳
              {product.productId.price
                ? (
                    product.productId.price -
                    (product.productId.price * product.productId.discount) / 100
                  ).toFixed(2)
                : 0}
            </div>
          </div>
          <Link
            href={`/product/${product.productId.name}/pid-${product.productId._id}`}
          >
            <button className="btn btn-square btn-ghost">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </button>
          </Link>
          <RemoveWishlistProduct productId={product?.productId._id} email={email} />
        </li>
      ))}
    </ul>
  );
}
