import ProductDetails from "@/_ClientSideComponents/Shared/ProductDetails";
import AllProductList from "@/_components/Homepage/AllProductList";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import axios from "axios";
import React from "react";

export default function page({ params }) {
  const { title, pid } = params;
  const id = pid.replace("pid-", "");


  return (
    <div>
      <BreadCrumbsComp />
      <ProductDetails id={id} />
    </div>
  );
}
