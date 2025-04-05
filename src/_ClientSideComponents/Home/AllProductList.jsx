"use client";
import Headline from "@/_components/shared/Headline";
import ProductCard from "@/_components/shared/ProductCard";
import ViewLessAll from "@/_components/shared/ViewLessAll";
import  {useState} from "react";

export default function AllProductList({ allProducts }) {
  const [showProducts, setShowProducts] = useState(
    allProducts.slice(0, 12)
  );
  const [isViewAll, setIsViewAll] = useState(false);

  const HandleAllProducts = () => {
    if (isViewAll) {
        setShowProducts(allProducts.slice(0, 12));
    } else {
        setShowProducts(allProducts);
    }
    setIsViewAll(!isViewAll);
  };
  return (
    <div className=" ">
      <Headline
        label="Pick for you"
        higlightedLabel="Exclusive Deals"
        rightComponent={
          <ViewLessAll
            HandleAllFunction={HandleAllProducts}
            isViewAll={isViewAll}
          />
        }
      />
      <div className="container mx-auto px-5 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {showProducts.map((product) => (
        <ProductCard product={product}/>
        ))}
      </div>
    </div>
  );
}
