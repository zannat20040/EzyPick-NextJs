"use client";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
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
  // const [verificationCode, setVerificationCode] = useState("");
  // const [isPhoneSignIn, setIsPhoneSignIn] = useState(false);
  // const [otpLoading, setOtpLoading] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const auth = getAuth(app);  // ✅ Pass firebaseApp to getAuth

  // useEffect(() => {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       auth, // ✅ First argument is auth instance
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: () => {
  //           console.log("reCAPTCHA verified");
  //         },
  //         "expired-callback": () => {
  //           console.error("reCAPTCHA expired");
  //           toast.error("reCAPTCHA expired. Please refresh and try again.");
  //         },
  //       }
  //     );
  //   }
  // }, [auth]); // ✅ Include auth in dependency array

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

  // const handlePhoneSignIn = async (e) => {
  //   e.preventDefault();
  //   if (!phoneNumber) {
  //     toast.error("Please enter a phone number.");
  //     return;
  //   }

  //   try {
  //     setOtpLoading(true);
  //     const appVerifier = window.recaptchaVerifier;
  //     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //     window.confirmationResult = confirmationResult;
  //     setIsPhoneSignIn(true);
  //     toast.success("OTP sent successfully!");
  //   } catch (error) {
  //     console.error("Phone sign-in failed:", error);
  //     toast.error("Failed to send OTP. Please try again.");
  //   } finally {
  //     setOtpLoading(false);
  //   }
  // };

  // const handleVerificationCodeSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!window.confirmationResult) {
  //       toast.error("No confirmation code was sent. Please try again.");
  //       return;
  //     }
  //     const result = await window.confirmationResult.confirm(verificationCode);
  //     console.log("Phone sign-in successful:", result.user);
  //     toast.success("Phone sign-in successful!");
  //     setIsPhoneSignIn(false);
  //   } catch (error) {
  //     console.error("Verification code submission failed:", error);
  //     toast.error("Verification code is invalid. Please try again.");
  //   }
  // };

  return (
    <>
      <div className="flex items-center pt-4 space-x-2 text-gray">
        <div className="flex-1 h-px bg-soft-gray"></div>
        <p className="text-sm text-gray-600">Login with social accounts</p>
        <div className="flex-1 h-px bg-soft-gray"></div>
      </div>
      <div className="flex justify-center space-x-4">
        {/* {!isPhoneSignIn && (
          <>
            <button
              onClick={() => setIsPhoneSignIn(!isPhoneSignIn)}
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
          </>
        )} */}
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
      {/* {isPhoneSignIn && (
        <form onSubmit={handlePhoneSignIn} className="flex flex-col gap-y-2">
          <input
            required
            type="text"
            name="number"
            placeholder="eg. +1XXXXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
          />
          <Button disabled={otpLoading} type="submit" className="bg-pale-red w-full text-white uppercase font-medium rounded">
            {otpLoading ? "Please wait..." : "Send OTP"}
          </Button>
        </form>
      )}
      {isPhoneSignIn && window.confirmationResult && (
        <form onSubmit={handleVerificationCodeSubmit} className="flex flex-col gap-y-2">
          <input
            type="text"
            name="verificationCode"
            placeholder="Enter OTP"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
            required
          />
          <Button type="submit" className="bg-pale-red w-full text-white uppercase font-medium rounded">
            Verify OTP
          </Button>
        </form>
      )}
      <div id="recaptcha-container"></div> */}
    </>
  );
}
