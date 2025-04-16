import Link from "next/link";
import React from "react";
import { TiTick } from "react-icons/ti";

export default function page() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="flex w-full justify-center gap-2 flex-col items-center ">
        <TiTick className="text-3xl w-10 text-white  h-10 rounded-full bg-pale-red p-2" />
        <h1 className="text-3xl font-bold text-center">
          Your order is completed!{" "}
        </h1>
        <p>Your order has been recieved</p>
      </div>

      <div className="w-1/2 max-w-2xl mx-auto border-dashed mt-10 border-pale-red p-10 border ">
        <h1 className="uppercase  text-lg">order details</h1>
        <div className="my-5">
       
          <div className="flex flex-col justify-start sm:grid sm:grid-cols-8 gap-5 sm:justify-between ">
            <div className="flex gap-3 col-span-5">
              <span>01. </span>
              <h1 className="text-start ">title</h1>
            </div>
            <div className="text-pale-red flex justify-between gap-3 col-span-3">
              <span>X3</span>
              <span className="text-end">3 X 100</span>
            </div>
          </div>
          <div className="flex flex-col justify-start sm:grid sm:grid-cols-8 gap-5 sm:justify-between ">
            <div className="flex gap-3 col-span-5">
              <span>01. </span>
              <h1 className="text-start ">title</h1>
            </div>
            <div className="text-pale-red flex justify-between gap-3 col-span-3">
              <span>X3</span>
              <span className="text-end">3 X 100</span>
            </div>
          </div>
          <div className="flex flex-col justify-start sm:grid sm:grid-cols-8 gap-5 sm:justify-between ">
            <div className="flex gap-3 col-span-5">
              <span>01. </span>
              <h1 className="text-start ">title</h1>
            </div>
            <div className="text-pale-red flex justify-between gap-3 col-span-3">
              <span>X3</span>
              <span className="text-end">3 X 100</span>
            </div>
          </div>
          <div className="flex flex-col justify-start sm:grid sm:grid-cols-8 gap-5 sm:justify-between ">
            <div className="flex gap-3 col-span-5">
              <span>01. </span>
              <h1 className="text-start ">title</h1>
            </div>
            <div className="flex text-pale-red justify-between gap-3 col-span-3">
              <span>X3</span>
              <span className="text-end">3 X 100</span>
            </div>
          </div>
        </div>

        <span className="font-semibold text-pale-red ">Total: 1000$</span>
      </div>
    </div>
  );
}
