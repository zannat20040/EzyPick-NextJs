import ProductDetails from "@/_components/shared/ProductDetails";
import AllProductList from "@/_components/AllProduct/AllProductList";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import axios from "axios";
import React from "react";

export default function page({ params }) {
  const { pid } = params;
  const id = pid.replace("pid-", "");


  return (
    <div>
      <BreadCrumbsComp />
      <ProductDetails id={id} />
    </div>
  );
}
