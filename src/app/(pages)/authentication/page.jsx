"use client";
import { Button } from "@material-tailwind/react";
import React from "react"; // Import useState
import SocialLogin from "@/_components/Authentication/SocialLogin";
import Link from "next/link";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function LoginPage() {
  const handleUserLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Make an API call using axios
      const response = await axiosInstance.post("/api/users/login", {
        email,
        password,
      });

      // If login is successful
      if (response.status === 200) {
        toast.success("You have successfully logged in!");
      }
    } catch (error) {
      const errormsg =
        error.response?.data?.error ||
        
        "Login failed. Please try again.";

      toast.error(errormsg);

      console.error("Login failed:", errormsg);
    }
  };

  return (
    <div className="mt-10 container px-4 space-y-3 rounded bg-white">
      {/* Input fields and the form started */}
      <form onSubmit={handleUserLogin} className="space-y-2" method="POST">
        <div className="space-y-2 text-sm">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
          />
        </div>
        <div className="space-y-2 text-sm">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
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
        <Button
          type="submit"
          className="bg-pale-red w-full text-white uppercase font-medium rounded"
        >
          Log in
        </Button>
      </form>

      <SocialLogin />
      <p className="text-sm text-center gap-2 flex justify-center sm:px-6">
        Don&apos;t have an account?
        <Link
          href={"/authentication/register"}
          className="underline hover:text-pale-red duration-300 transition-all"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
