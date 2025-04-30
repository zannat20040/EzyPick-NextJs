import Link from "next/link";
import React from "react";
import {
  MdOutlineModeEditOutline,
} from "react-icons/md";
import HandleDeleteProduct from "./HandleDeleteProduct";

export default function SellerProductList({ allProducts }) {
  return (
    <div className="container mx-auto my-10 px-5 lg:px-8">
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>SL/No</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Product Discount</th>
              <th>Product Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allProducts?.length > 0 &&
              allProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <th>{index + 1}</th>
                  <td>{product.name}</td>
                  <td className="text-center">
                    ৳
                    {product.price
                      ? (
                          product.price -
                          (product.price * product.discount) / 100
                        ).toFixed(2)
                      : 0}
                  </td>
                  <td className="text-center">{product.category.title}</td>
                  <td className="text-center">{product.discount}%</td>
                  <td className="text-center">{product.stock}</td>
                  <td className="flex gap-3">
                    <Link href={`/seller/updatedProduct/${product._id}`}>
                      <button className="">
                        <MdOutlineModeEditOutline className="text-pale-red hover:text-red-200 text-lg" />
                      </button>
                    </Link>
                    <HandleDeleteProduct product={product} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
