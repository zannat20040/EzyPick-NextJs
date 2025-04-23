import React from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";

export default function ProductActions({product}) {
  return (
    <>
      <td className="flex gap-3">
        <button className="">
          <MdOutlineModeEditOutline className="text-pale-red hover:text-red-200 text-lg" />
        </button>
        <button className="">
          <MdOutlineDeleteOutline className="text-pale-red hover:text-red-200 text-lg" />
        </button>
      </td>
    </>
  );
}
