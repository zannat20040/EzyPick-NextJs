"use client";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { deleteUser } from "firebase/auth"; // ✅ import this first
import getUserByEmail from "@/utils/getUserByEmail";

export default function SocialLogin() {
  const { googleSignIn, setLoading } = useAuth();
  const router = useRouter();


  const handleGoogleSignIn = async () => {
    setLoading(true);
  
    let userCredential = null;
  
    try {
      userCredential = await googleSignIn();
  
      if (!userCredential?.user) {
        toast.error("Google sign-in failed. Please try again.");
        return;
      }
  
      const { displayName, email, photoURL } = userCredential.user;
  
      if (!email) {
        toast.error("Failed to retrieve user email.");
        return;
      }
  
      let userdata = null;
  
      // 🔥 Try fetching user by email
      try {
        userdata = await getUserByEmail(email);
      } catch (fetchError) {
        console.error("Error fetching user:", fetchError);
        // 404 or Not Found is okay → continue to register
      }
  
      if (userdata) {
        // 🎯 User already exists
        toast.success("Login successful!");
        router.push("/");
      } else {
        // 🎯 New user → Register
        const newUserData = {
          name: displayName || "Unnamed User",
          email: email,
          role: "buyer",
          profile_img: photoURL || "",
        };
  
        await axiosInstance.post("/api/users/register", newUserData);
  
        toast.success("Account created and logged in successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
  
      // 🔥 If Firebase user was created but error happens, delete it
      if (userCredential?.user) {
        try {
          await deleteUser(userCredential.user);
        } catch (deleteError) {
          console.error("Failed to delete Firebase user:", deleteError);
        }
      }
  
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Google sign-in failed. Try again."
      );
    } finally {
      setLoading(false);
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
