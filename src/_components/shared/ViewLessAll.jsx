import { Button } from "@material-tailwind/react";
import React from "react";
import { MdOutlineChevronRight } from "react-icons/md";

export default function ViewLessAll({ HandleAllFunction, isViewAll }) {
  return (
    <Button
      className="flex justify-between py-0 items-center border-0  bg-transparent shadow-none  hover:shadow-none  hover:text-pale-red"
      onClick={HandleAllFunction}
    >
      <p className="capitalize text-gray-700 text-sm font-light">
        {isViewAll ? "View Less" : "View All"}
      </p>
      <MdOutlineChevronRight className="text-pale-red text-xl" />
    </Button>
  );
}
