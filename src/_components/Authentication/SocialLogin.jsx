"use client";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import React from "react";
import toast from "react-hot-toast";
import {FaGoogle } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";

export default function SocialLogin() {
  const { googleSignIn } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      // Step 1: Sign in with Google
      const userCredential = await googleSignIn();

      // Step 2: Check if user is signed in successfully
      if (userCredential?.user) {
        console.log("Google sign-in successful:", userCredential.user);

        const userData = {
          email: userCredential.user.email,
          firstname: userCredential.user.displayName.split(" ")[0],
          lastname: userCredential.user.displayName.split(" ")[1] || "",
          role: "seller",
          isGoogleUser: true,
        };

        try {
          await axiosInstance.post("/api/users/register", userData);
          toast.success("You have successfully logged in and registered!");
        } catch (error) {
          if (userCredential.user) {
            try {
              await userCredential.user.delete(); // Delete Firebase user
              console.log("Firebase user deleted due to DB error");
            } catch (deleteError) {
              console.log(deleteError);
              toast.error("Error deleting Firebase user.");
            }
          }

          // Show error message from API response or general error
          toast.error(
            error.response?.data?.error ||
              error.message ||
              "Unexpected error occurred. Please try again."
          );
        }
      } else {
        toast.error("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      // General error handling for sign-in failure
      console.error("Google sign-in failed:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <>
      {/* login with others */}
      <div className="flex items-center pt-4 space-x-2 text-gray">
        <div className="flex-1 h-px bg-soft-gray"></div>
        <p className="text-sm text-gray-600">Login with social accounts</p>
        <div className="flex-1 h-px bg-soft-gray"></div>
      </div>
      {/* Social icons */}
      <div className="flex justify-center space-x-4">
        <button className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all">
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
