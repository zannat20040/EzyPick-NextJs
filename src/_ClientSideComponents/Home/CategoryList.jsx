"use client";
import Headline from "@/_components/shared/Headline";
import ViewLessAll from "@/_components/shared/ViewLessAll";
import Image from "next/image";
import { useState } from "react";


const CategoryList = ({ categories }) => {
  const [showCategories, setShowCategories] = useState(categories.slice(0, 7));
  const [isViewAll, setIsViewAll] = useState(false); 

  const HandleAllCatagory = () => {
    if (isViewAll) {
      setShowCategories(categories.slice(0, 7)); 
    } else {
      setShowCategories(categories); 
    }
    setIsViewAll(!isViewAll); 
  };

  return (
    <div>
      <Headline
        label="Shop from"
        higlightedLabel={"Top Categories"}
        rightComponent={
          <ViewLessAll
            HandleAllFunction={HandleAllCatagory}
            isViewAll={isViewAll}
          />
        }
      />
      <div className="container mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-2">
        {showCategories?.map((category) => (
          <div className="flex flex-col justify-center items-center gap-2 duration-500 ease-in-out  transition-all hover:bg-soft-gray bg-gray-100   cursor-pointer p-2">
            <div key={category.category} className=" rounded h-20  w-20">
              <Image
                width={70}
                height={70}
                src={category.icon}
                alt={`${category.category} icon`}
                className="w-full h-full mx-auto"
              />
            </div>
            <h3 className="text-sm px-4 font-light text-gray-700 text-center">
              {category.category}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
