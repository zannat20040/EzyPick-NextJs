"use client";
import Headline from "@/_components/shared/Headline";
import CustomRating from "@/_components/shared/ustomRating";
import ViewLessAll from "@/_components/shared/ViewLessAll";
import { Rating } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import  {useState} from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoBagHandleSharp, IoShareSocial } from "react-icons/io5";

export default function RecommendationList({ recommendations }) {
  const [showRecommendation, setShowRecommendation] = useState(
    recommendations.slice(0, 7)
  );
  const [isViewAll, setIsViewAll] = useState(false);

  const HandleAllRecommendation = () => {
    if (isViewAll) {
      setShowRecommendation(recommendations.slice(0, 7));
    } else {
      setShowRecommendation(recommendations);
    }
    setIsViewAll(!isViewAll);
  };
  return (
    <div className=" ">
      <Headline
        label="Top Recommendation"
        higlightedLabel="For You"
        rightComponent={
          <ViewLessAll
            HandleAllFunction={HandleAllRecommendation}
            isViewAll={isViewAll}
          />
        }
      />
      <div className="container mx-auto px-5 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {showRecommendation.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className=" bg-base-100 shadow relative rounded group hover:bg-gray-200 duration-300 transition-all ease-in-out flex flex-col h-full w-full"
          >
            <figure className="h-52 w-full bg-gray-200 rounded">
              <Image
                width={100}
                height={100}
                alt={product.name}
                src={product?.image}
                className="h-full w-full rounded text-xs group-hover:scale-90 scale-100 duration-300 transition-all ease-in-out"
              />
            </figure>
            <div className="flex flex-col gap-2 absolute top-3 right-3 opacity-0 group-hover:opacity-100 duration-700 transition-all ease-in-out">
              <IoShareSocial className="bg-pale-red text-white  p-2 w-8 h-8 text-lg rounded hover:bg-gray-300 hover:text-black duration-500 transition-all ease-in-out" />
              <FaCartShopping className="bg-pale-red text-white  p-2 w-8 h-8 text-lg rounded hover:bg-gray-300 hover:text-black duration-500 transition-all ease-in-out" />
              <IoBagHandleSharp className="bg-pale-red text-white  p-2 w-8 h-8 text-lg rounded hover:bg-gray-300 hover:text-black duration-500 transition-all ease-in-out" />
            </div>
            <div className="card-body pb-4 items-start text-start flex flex-col flex-1">
              <h6 className="text-sm  ">
                {" "}
                {product.name.split(" ").slice(0, 5).join(" ") +
                  (product.name.split(" ").length > 5 ? "..." : "")}
              </h6>
              <p className="text-base text-pale-red">
                ৳ {product.price}{" "}
                <span className="text-xs text-gray-400">
                  -{product.discount}%
                </span>
              </p>
              <div className="flex flex-wrap gap-2 font-bold text-blue-gray-500">
                {/* rating */}
                <CustomRating rating={product?.rating} />

                <span className="text-xs items-center text-gray-400 font-normal">
                  ({product?.reviews})
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
