"use client";

import { Button } from "@material-tailwind/react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const buttonCSS = "text-white hover:shadow-none text-2xl w-5 h-5";
  const buttonBgCSS =
    "hover:shadow-none  shadow-none px-3 rounded  bg-pale-red py-2 ";
  return (
    <div className="flex justify-center ">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBgCSS}  rounded-r-none`}
        aria-label="Previous Page"
      >
        <MdOutlineChevronLeft className={`${buttonCSS}`} />
      </Button>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBgCSS} rounded-l-none`}
        aria-label="Next Page"
      >
        <MdOutlineChevronRight className={` ${buttonCSS}`} />
      </Button>
    </div>
  );
}
