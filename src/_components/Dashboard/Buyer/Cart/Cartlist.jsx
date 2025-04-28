"use client";
import React, { useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import ConfirmOrder from "./ConfirmOrder";

export default function Cartlist({ cartRes, email }) {
  const [step, setStep] = useState(1);
  const HandleStep = (id) => {
    setStep(2);
  };

  return (
    <div className="mt-5 container mx-auto px-5 lg:px-8 ">
      <div className="grid sm:grid-cols-2 justify-between  lg:w-2/3 w-full">
        <div
          className={`flex gap-5 border-b py-4 pr-10 border-b-neutral-200 ${
            step >= 1 ? "text-pale-red border-b-pale-red" : ""
          }`}
        >
          <span className="font-bold text-xl ">01</span>
          <div>
            <p className="font-bold text-xl ">Shopping Bag</p>
            <p className={`${step >= 1 ? "text-pale-red " : ""} text-gray`}>
              Manage Your Item{" "}
            </p>
          </div>
        </div>
        <div
          className={`flex gap-5 border-b py-4 pr-10 border-b-neutral-200 ${
            step >= 2 ? "text-pale-red border-b-pale-red" : ""
          }`}
        >
          <span className="font-bold text-xl ">02</span>
          <div>
            <p className="font-bold text-xl ">Checkout & Confirm Bag</p>
            <p className={`${step >= 2 ? "text-pale-red " : ""} text-gray`}>
              Review & Submit Your order
            </p>
          </div>
        </div>
      </div>
      {step == 1 && (
        <div className="bg-gray-250   my-10 space-y-6">
          {/* top part  */}
          <div
            className={`flex border-b border-b-neutral-100  justify-between items-center`}
          >
            <h4 className="text-xl font-medium text-slate-800 uppercase ">
              Product
            </h4>
            <p className="text-sm font-medium text-gray-400 uppercase">
              edit cart
            </p>
          </div>

          {/*  Cart  map */}
          {cartRes?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="space-y-10">
            <button
              onClick={HandleStep}
              className=" btn  text-white rounded bg-pale-red text-sm font-semibold w-full uppercase"
            >
              proceed to checkout
            </button>
          </div>
        </div>
      )}
      {step == 2 && (
        <div className="bg-gray-250 my-20 space-y-6">
          <Checkout cartItems={cartRes} setStep={setStep} />
        </div>
      )}
      
    </div>
  );
}
