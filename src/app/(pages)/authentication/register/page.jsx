"use client";
import { Button, Radio, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SocialLogin from "@/_components/Authentication/SocialLogin";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showC_Pass, setShowC_Pass] = useState(false);
  const [password, setPassword] = useState(null);
  const [c_password, setC_Password] = useState(null);
  const [isPassSame, setIsPassSame] = useState(true);
  const [checkValue, setCheckValue] = useState("buyer");
  const {
    user,
    loading,
    signIn,
    signOutUser,
    googleSignIn,
    phoneSignIn,
    signUp,
    setLoading,
  } = useAuth();

  useEffect(() => {
    if (password && c_password) {
      setIsPassSame(password === c_password);
    } else {
      setIsPassSame(true); // This ensures that it won't show an error when both fields are empty.
    }
  }, [password, c_password]);

  const HandleUserSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userData = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      role: checkValue,
      password: form.password.value,
      email: form.email.value,
    };

    try {
      const userCredential = await signUp(userData.email, userData.password);
      const user = userCredential?.user;

      if (user) {
        try {
          await axiosInstance.post("/api/users/register", userData);
          toast.success("You have successfully registered!");
        } catch (error) {
          if (user) {
            try {
              await user.delete(); // This is how you delete a Firebase user
            } catch (deleteError) {
              console.log(deleteError);
              console.error("User deletion error:", deleteError.message);
            }
          }
          
          toast.error(
            error.response.data.error ||
              error.message ||
              "Unexpected error occurred. Please try again."
          );
        }
      } else {
        toast.error("Unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error.message);
      toast.error(
        error.message || "Unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10  container px-4  space-y-3 rounded  bg-white">
      {/* Input fields and the form started */}
      <form onSubmit={HandleUserSignUp} className="space-y-2 text-gray">
        <div className="flex gap-3 items-center">
          <p className="text-sm">Select account type </p>
          <Radio
            onClick={() => setCheckValue("buyer")}
            defaultChecked
            name="type"
            ripple={false}
            icon={<FaCircleCheck className="text-pale-red" />}
            className="border-soft-gray  p-0 transition-all hover:before:opacity-0"
            label={
              <Typography
                color="blue-gray"
                className="font-normal text-sm text-gray"
              >
                Buyer
              </Typography>
            }
          />
          <Radio
            onClick={() => setCheckValue("seller")}
            name="type"
            ripple={false}
            icon={<FaCircleCheck className="text-pale-red" />}
            className="border-soft-gray  p-0 transition-all hover:before:opacity-0"
            label={
              <Typography
                color="blue-gray"
                className="font-normal text-gray text-sm"
              >
                Seller
              </Typography>
            }
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-2">
          <div className="text-sm">
            <input
              required
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
              className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none  "
            />
          </div>{" "}
          <div className="text-sm">
            <input
              required
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last name"
              className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none  "
            />
          </div>
        </div>
        <div className="text-sm">
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none  "
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-2 ">
          <div className="text-sm relative">
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className={`${
                isPassSame ? "border-soft-gray" : "border-red-400"
              } w-full px-4 py-3 rounded border  focus:outline-none `}
            />
            {showPass ? (
              <GoEyeClosed
                className=" cursor-pointer absolute top-0 bottom-0 my-auto right-3"
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <GoEye
                className=" cursor-pointer absolute top-0 bottom-0 my-auto right-3"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
          <div className="text-sm relative">
            <input
              required
              onChange={(e) => setC_Password(e.target.value)}
              type={showC_Pass ? "text" : "password"}
              name="c_password"
              id="c_password"
              placeholder="Confirm password"
              className={`${
                isPassSame ? "border-soft-gray" : "border-red-400"
              } w-full px-4 py-3 rounded border  focus:outline-none `}
            />
            {showC_Pass ? (
              <GoEyeClosed
                className=" cursor-pointer absolute top-0 bottom-0 my-auto right-3"
                onClick={() => setShowC_Pass(!showC_Pass)}
              />
            ) : (
              <GoEye
                className=" cursor-pointer absolute top-0 bottom-0 my-auto right-3"
                onClick={() => setShowC_Pass(!showC_Pass)}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end text-xs">
          <Link
            href="#"
            className="hover:underline hover:text-pale-red transition-all duration-300"
          >
            Forgot Password?
          </Link>
        </div>
        {/* Sign up Button */}
        <Button
          disabled={!isPassSame || password?.length < 6 || loading}
          type="submit"
          className=" hover:bg-black bg-pale-red w-full text-white uppercase font-medium rounded"
        >
          {loading ? "Please wait a moment..." : ` Register as ${checkValue}`}
        </Button>
      </form>

      <SocialLogin />
      <p className="text-sm text-center gap-2 flex justify-center sm:px-6 text-gray">
        Don&apos;t have an account?
        <Link
          href={"/authentication"}
          className="underline hover:text-pale-red duration-300  transition-all"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
