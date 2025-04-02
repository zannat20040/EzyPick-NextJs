'use client'
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react'

export default function LoginComponent() {
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
  )
}
