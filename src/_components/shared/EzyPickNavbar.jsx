import React from "react";
import {
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import { TfiEmail, TfiLocationPin } from "react-icons/tfi";
import { MdOutlineFacebook } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import BottomNav from "@/_ClientSideComponents/BottomNav";

export default function EzyPickNavbar() {
 
 
  return (
    <div className="sticky top-0 left-0 z-40 bg-white">
      {/* top header nav */}
      <div className=" px-5 lg:px-8 container mx-auto flex flex-wrap sm:flex-nowrap  justify-center sm:justify-between   items-center sm:gap-5 gap-3 py-3 ">
        <div className="flex flex-wrap sm:flex-nowrap sm:gap-3 items-center justify-center sm:justify-start text-sm ">
          <p className="flex gap-1 items-center font-dm text-base">
            <TfiEmail className="text-[#f8796c] " />{" "}
            <span>ezypick@example.com</span>
          </p>
          <p className="flex gap-1 items-center text-base">
            <TfiLocationPin className="text-[#f8796c] " />
            <span>Dhanmondi,Dhaka,Bangladesh</span>
          </p>
        </div>
        <div className="flex gap-3">
          <IoIosCall className="text-[#f8796c] text-xl" />
          <MdOutlineFacebook className="text-[#f8796c] text-xl" />
          <FaTwitter className="text-[#f8796c] text-xl" />
          <FaYoutube className="text-pale-red text-xl" />
          <FaInstagram className="text-pale-red text-xl" />
        </div>
      </div>
      <hr className="text-soft-gray" />
      {/* bottom navbar */}
      <BottomNav />
    </div>
  );
}


