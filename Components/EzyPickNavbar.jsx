"use client";
import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import {
  FaRegUser,
  FaCartShopping,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import { TfiEmail, TfiLocationPin } from "react-icons/tfi";
import { MdOutlineFacebook } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import Link from "next/link";

export default function EzyPickNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="bg-white">
      {/* top header nav */}
      <div className=" px-4  lg:px-8  flex flex-wrap sm:flex-nowrap  justify-center sm:justify-between   items-center sm:gap-5 gap-3 py-3 ">
        <div className="flex flex-wrap sm:flex-nowrap sm:gap-3 items-center justify-center sm:justify-start text-sm ">
          <p className="flex gap-1 items-center">
            <TfiEmail className="text-pale-red " />{" "}
            <span>ezypick@example.com</span>
          </p>
          <p className="flex gap-1 items-center">
            <TfiLocationPin className="text-pale-red " />
            <span>Dhanmondi,Dhaka,Bangladesh</span>
          </p>
        </div>
        <div className="flex gap-3">
          <IoIosCall className="text-pale-red text-xl" />
          <MdOutlineFacebook className="text-pale-red text-xl" />
          <FaTwitter className="text-pale-red text-xl" />
          <FaYoutube className="text-pale-red text-xl" />
          <FaInstagram className="text-pale-red text-xl" />
        </div>
      </div>
      <hr className="text-blue-gray-50" />
      {/* bottom navbar */}
      <Navbar className=" sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className=" flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 text-lg font-bold text-pale-red"
          >
            EzyPick
          </Typography>

          <div className="mr-4 hidden lg:block">
            <ul className="flex justify-center items-center gap-4 text-sm">
              <li>Home</li>
              <li>Add Product</li>
              <li>Shop</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <FaCartShopping className="hidden lg:inline-block" />
            <Link href="/authentication">
              <FaRegUser className="hidden lg:inline-block" />
            </Link>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-pale-red"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <ul className="flex py-3 gap-4 flex-col text-black">
            <li>Home</li>
            <li>Add Product</li>
            <li>Shop</li>
            <li>Blog</li>
            <li>Login / Signup</li>
          </ul>
        </MobileNav>
      </Navbar>
    </div>
  );
}
