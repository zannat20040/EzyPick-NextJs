"use client";
import { Button } from "@material-tailwind/react";
import React from "react";
import { SiGmail } from "react-icons/si";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";

export default function LoginPage() {
  return (
    <div className="mt-10  container px-4  space-y-3 rounded  bg-white">
      {/* Input fields and the form started */}
      <form action="" className="space-y-2">
        <div className="space-y-2 text-sm">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none  "
          />
        </div>
        <div className="space-y-2 text-sm">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none "
          />
          <div className="flex justify-end text-xs">
            <Link
              href="#"
              className="hover:underline hover:text-pale-red transition-all duration-300"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        {/* Sign in Button */}
        <Button className=" bg-pale-red w-full text-white uppercase font-medium rounded">
          Log in
        </Button>
      </form>

      {/* login with others */}
      <div className="flex items-center pt-4 space-x-2">
        <div className="flex-1 h-px bg-soft-gray"></div>
        <p className="text-sm text-gray-600">Login with social accounts</p>
        <div className="flex-1 h-px bg-soft-gray"></div>
      </div>
      {/* Social icons */}
      <div className="flex justify-center space-x-4">
        <button className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all">
          <IoIosCall className="text-lg" />
        </button>
        <button className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all">
          <FaGoogle />
        </button>
        <button className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all">
          <FaFacebookF />
        </button>
        <button className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all">
          <SiGmail />
        </button>
      </div>
      <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
        Don't have an account?
        <Link
          href={"/authentication/register"}
          className="underline hover:text-pale-red duration-300  transition-all"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
