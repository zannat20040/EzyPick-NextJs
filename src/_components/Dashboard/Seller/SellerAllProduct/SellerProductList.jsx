import React from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";

export default function SellerProductList({ allProducts }) {
  return (
    <div className="container mx-auto my-10 px-5 lg:px-8">
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
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
                  <td>{product.price}</td>
                  <td>{product.category.title}</td>
                  <td>{product.discount}</td>
                  <td>{product.stock}</td>
                  <td className="flex gap-3">
                    <button className=""><MdOutlineModeEditOutline className='text-pale-red hover:text-red-200 text-lg'/></button>
                    <button className=""><MdOutlineDeleteOutline className='text-pale-red hover:text-red-200 text-lg'/></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
