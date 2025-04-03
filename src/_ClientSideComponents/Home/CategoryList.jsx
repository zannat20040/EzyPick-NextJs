import Image from "next/image";

const CategoryList = ({ categories }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-2">
        {categories?.map((category) => (
          <div className="flex flex-col justify-center items-center gap-2 duration-500 ease-in-out  transition-all hover:bg-soft-gray bg-gray-100   rounded-md cursor-pointer p-2">
            <div
              key={category.category}
              className=" rounded h-20  w-20"
            >
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
