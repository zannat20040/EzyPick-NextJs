import ProductReview from "@/_components/ProductDetails/ProductReview";
import React from "react";

export function ProductDetailsTab({ details, productId }) {
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
      </div>

      <input
        type="radio"
        name="my_tabs_3"
        className="tab checked:text-pale-red "
        aria-label="Product Review"
      />
      <div className="tab-content bg-base-100 border-base-300 p-6 border-t border-0">
        <ProductReview productId={productId} />
      </div>
    </div>
  );
}
