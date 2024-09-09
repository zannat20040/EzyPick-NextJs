"use client";
import { Button } from "@material-tailwind/react";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SocialLogin from "@/Components/SocialLogin";
import Link from "next/link";

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

     <SocialLogin />
      <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
        Don't have an account?
        <Link
          href={"/authentication/register"}
          className="underline hover:text-pale-red duration-300  transition-all"
        >
          Register
        </Link>
      </p>
      <button onClick={() => signOut()}>Sign OUT</button>
    </div>
  );
}
