import React from "react";

export default function Headline({ label, higlightedLabel, rightComponent }) {
  return (
    <div className="container mx-auto   px-5 lg:px-8  my-12">
      <div className="sm:hidden flex mb-3" >
        {rightComponent}
      </div>
      <div className="flex justify-between gap-5 items-center  border-b border-soft-gray ">
        <div className="flex gap-3 items-center border-b-2 border-pale-red pb-2  ">
          <p className="text-lg font-semibold font-dm-sans ">
            {label} <span className="text-pale-red ">{higlightedLabel}</span>
          </p>
        </div>
        <div className="hidden sm:flex">{rightComponent}</div>
      </div>
    </div>
  );
}
