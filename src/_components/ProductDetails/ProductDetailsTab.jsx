import ProductReview from "@/_components/ProductDetails/ProductReview";
import React from "react";

export function ProductDetailsTab({ details, productId, product }) {
  return (
    <div className="tabs tabs-lift mt-10">
      <input
        type="radio"
        name="my_tabs_3"
        className="tab checked:text-pale-red "
        aria-label="Product Details"
        defaultChecked
      />
      <div className="tab-content bg-base-100 border-base-300 p-6  border-t border-0">
        {details}
        <div className="text-sm">
          <h1 className="font-semibold mt-4 mb-1">Delivery</h1>
          {product?.delivery_options?.map((delivery, index) => (
            <span
              key={`${delivery}${index}`}
              className="text-gray-600 px-2  border-l last:border-r-0 first:border-l-0"
            >
              {delivery}
            </span>
          ))}
        </div>
      </div>

      <input
        type="radio"
        name="my_tabs_3"
        className="tab checked:text-pale-red "
        aria-label="Product Review"
      />
      <div className="tab-content bg-base-100 border-base-300  border-t border-0 pt-2">
        <ProductReview productId={productId} product={product} />
      </div>
    </div>
  );
}
