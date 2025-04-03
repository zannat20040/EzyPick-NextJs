import React from "react";

export default function Headline({ label, higlightedLabel, rightComponent }) {
  return (
    <div className="container mx-auto   px-5 lg:px-8  my-12">
      <div className="flex justify-between gap-5 items-center  border-b border-soft-gray ">
        <div className="flex gap-3 items-center border-b-2 border-pale-red pb-2  ">
          <p className="text-xl font-semibold font-dm-sans ">
            {label} <span className='text-pale-red '>{higlightedLabel}</span>
          </p>
        </div>
        {rightComponent}
      </div>
    </div>
  );
}
