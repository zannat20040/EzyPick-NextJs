"use client";
import { Button, Radio, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SocialLogin from "@/Components/SocialLogin";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showC_Pass, setShowC_Pass] = useState(false);
  const [password, setPassword] = useState(null);
  const [c_password, setC_Password] = useState(null);
  const [isPassSame, setIsPassSame] = useState(true);
  const [checkValue, setCheckValue] = useState("");

  useEffect(() => {
    setIsPassSame(password === c_password);
  }, [password, c_password]);

  console.log(isPassSame);
  const HandleUserSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const role = checkValue;
    const password = form.password.value;
    const c_password = form.c_password.value;
  };

  return (
    <div className="mt-10  container px-4  space-y-3 rounded  bg-white">
      {/* Input fields and the form started */}
      <form onSubmit={HandleUserSignUp} className="space-y-2 text-gray">
        <div className="flex gap-3 items-center">
          <p>Register your account as </p>
          <Radio
            onClick={() => setCheckValue("buyer")}
            defaultChecked
            name="type"
            ripple={false}
            icon={<FaCircleCheck className="text-pale-red" />}
            className="border-soft-gray  p-0 transition-all hover:before:opacity-0"
            label={
              <Typography color="blue-gray" className="font-normal text-gray">
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
              <Typography color="blue-gray" className="font-normal text-gray">
                Seller
              </Typography>
            }
          />
        </div>
        <div className="flex gap-x-2">
          <div className="text-sm">
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
              className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none  "
            />
          </div>{" "}
          <div className="text-sm">
            <input
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
          type="submit"
          className=" bg-pale-red w-full text-white uppercase font-medium rounded"
        >
          Register
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
