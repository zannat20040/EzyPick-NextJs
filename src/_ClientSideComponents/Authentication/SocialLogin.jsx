"use client";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import React from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../../utils/firebase.config.js";

export default function SocialLogin() {
  const { googleSignIn } = useAuth();
 
  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await googleSignIn();
      if (userCredential?.user) {
        const userData = {
          email: userCredential.user.email,
          firstname: userCredential.user.displayName.split(" ")[0],
          lastname: userCredential.user.displayName.split(" ")[1] || "",
          role: "seller",
          isGoogleUser: true,
        };

        await axiosInstance.post("/api/users/register", userData);
        toast.success("You have successfully logged in and registered!");
      } else {
        toast.error("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Google sign-in failed:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };



  return (
    <>
      <div className="flex items-center pt-4 space-x-2 text-gray">
        <div className="flex-1 h-px bg-soft-gray"></div>
        <p className="text-sm text-gray-600">Login with social accounts</p>
        <div className="flex-1 h-px bg-soft-gray"></div>
      </div>
      <div className="flex justify-center space-x-4">
     
        <button
          className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all"
        >
          <IoIosCall className="text-lg" />
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all"
        >
          <FaGoogle />
        </button>
      </div>
   
    </>
  );
}
