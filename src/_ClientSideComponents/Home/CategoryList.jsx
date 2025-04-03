const CategoryList = ({ categories }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories?.map((category) => (
          <div
            key={category.category}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={category.icon}
              alt={`${category.category} icon`}
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-center mb-2">
              {category.category}
            </h3>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
