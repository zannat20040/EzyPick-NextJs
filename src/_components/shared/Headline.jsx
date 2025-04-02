import React from "react";

export default function Headline({ label }) {
  return (
    <div className="flex gap-3 items-center container mx-auto  my-12 px-5 lg:px-8 ">
      <div className="bg-pale-red h-8 w-[8px] "></div>
      <p className="text-xl font-bold ">{label}</p>
    </div>
  );
}
