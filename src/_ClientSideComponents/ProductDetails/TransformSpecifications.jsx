import React from "react";

export default function TransformSpecifications({ specs, price, discount }) {
  const textSpecs = [];
  const arraySpecs = [];

  for (let key in specs) {
    if (Array.isArray(specs[key])) {
      arraySpecs.push(
        <div key={key} className="flex flex-col gap-1 mt-2">
          <span className="capitalize font-bold">{key}:</span>
          <div className="flex flex-wrap gap-1">
            {specs[key].map((item, index) => (
              <button
                key={index}
                className="btn border border-soft-gray bg-white hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      textSpecs.push(
        <div key={key} className="text-sm text-gray-500">
          <span className="capitalize ">{key}:</span>{" "}
          <span className="text-pale-red">{specs[key]} </span>|
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-1  flex-wrap border-dashed border-soft-gray border-b pb-3 ">
        {textSpecs}
      </div>
      {/* price section start*/}
      <div className="border-dashed border-soft-gray border-b pb-3 ">
        <p className=" text-2xl  text-pale-red">
          ${(price - (price * discount) / 100).toFixed(2)}
        </p>
        <div>
          <span className="line-through">${price}</span>{" "}
          <span>-{discount}%off</span>
        </div>
      </div>
      {/* price section end */}
      <div className="flex flex-col gap-2">{arraySpecs}</div>
    </div>
  );
}
