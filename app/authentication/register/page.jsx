"use client";
import { Button, Radio, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SocialLogin from "@/Components/SocialLogin";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { Bounce, Slide, toast } from "react-toastify";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showC_Pass, setShowC_Pass] = useState(false);
  const [password, setPassword] = useState(null);
  const [c_password, setC_Password] = useState(null);
  const [isPassSame, setIsPassSame] = useState(true);
  const [checkValue, setCheckValue] = useState("buyer");

  useEffect(() => {
    setIsPassSame(password === c_password);
  }, [password, c_password]);

  const HandleUserSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const role = checkValue;
    const password = form.password.value;
    const email = form.email.value;
    const userData = { firstname, lastname, role, password, email };
    console.log(userData);

    try {
      // Send the user data to the signup API
      const response = await axiosInstance.post("/api/users/register", userData);
      console.log(response.data)
      // Handle successful response
      if (response.status === 201) {
        toast.success(`Congratulation! Your are registered successfully as ${role} `, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // Optionally, redirect to login or dashboard
      }
    } catch (error) {
      console.log(error)
      const errorMessage =
        error.response?.data?.error || "Signup failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    // toast.success("Signup success", {
    //   position: "top-center",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   transition: Bounce,
    // });
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
        <div className="flex gap-x-2">
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
        <div className="flex gap-x-2 ">
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
        disabled={!isPassSame || password?.length<6}
          type="submit"
          className=" hover:bg-black bg-pale-red w-full text-white uppercase font-medium rounded"
        >
          Register as {checkValue}
        </Button>
      </form>

      <SocialLogin />
      <p className="text-sm text-center gap-2 flex justify-center sm:px-6 text-gray">
        Don't have an account?
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
