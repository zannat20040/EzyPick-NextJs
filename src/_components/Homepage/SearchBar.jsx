import React from 'react'
import { IoMic, IoSearch } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div class="  mx-auto shadow-none border border-gray-200 ">
      <div class="relative flex items-center rounded-md shadow-none">
        <div class="absolute flex items-center pl-2.5">
          <IoMic className="text-pale-red cursor-pointer " />

          <div class="h-6 border-l border-slate-500 ml-2.5"></div>
        </div>

        <input
          class=" w-full bg-transparent p-3 placeholder:text-slate-400 text-slate-700 text-sm  pr-3 pl-14 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  "
          placeholder="Search your need"
        />

        <button
          class=" bg-slate-800 p-3  rounded-none text-center text-sm text-white transition-all  hover:bg-pale-red border-l border-gray-200 group disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <IoSearch className="text-pale-red group-hover:text-white" />
        </button>
      </div>
    </div>
  );
}
