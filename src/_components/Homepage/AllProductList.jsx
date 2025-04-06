import Headline from "@/_components/shared/Headline";
import ProductCard from "../shared/ProductCard";

export default function AllProductList({ allProducts }) {
 

  return (
    <div className=" ">
      <Headline
        label="Pick for you"
        higlightedLabel="Exclusive Deals"
      />
      <div className="container mx-auto px-5 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {allProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center container mx-auto px-5 lg:px-8 mt-10">
        <button className="btn hover:bg-[#f59388] duration-300 transition-all ease-in-out border-0 bg-pale-red text-white px-10 py-2 ">
          Load more
        </button>
      </div>
    </div>
  );
}
