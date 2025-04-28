import React from "react";
import { TiTick } from "react-icons/ti";
import axiosInstance from "@/utils/axiosInstance";

// Server-side data fetching within the component
export default async function ConfirmOrder({ params }) {
  const { orderId } = params; // Get orderId from dynamic route

  // Fetch the order data server-side
  let order = null;
  try {
    const res = await axiosInstance.get(`/api/orders/${orderId}`);
    order = res.data;
  } catch (error) {
    console.error("Failed to fetch order", error);
  }

  if (!order) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Order not found.</p>
      </div>
    );
  }

  // 🔥 Correct Total Price Calculation based on quantity
  const totalPrice = order.items.reduce((acc, item) => {
    const quantity = item.quantity || 1; // ✅ Get quantity from order item (default 1)
    const price = item.productId?.price || 0; // ✅ Get price from populated product
    return acc + (price * quantity);
  }, 0);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex w-full justify-center gap-2 flex-col items-center">
        <TiTick className="text-3xl w-10 text-white h-10 rounded-full bg-pale-red p-2" />
        <h1 className="text-3xl font-bold text-center">Your order is completed!</h1>
        <p>Your order has been received.</p>
      </div>

      <div className="w-1/2 max-w-2xl mx-auto border-dashed mt-10 border-pale-red p-10 border">
        <h1 className="uppercase text-lg">Order Details</h1>

        <div className="my-5 space-y-4">
          {order.items.length > 0 ? (
            order.items.map((item, index) => {
              const quantity = item.quantity || 1; // Get quantity
              const price = item.productId?.price || 0; // Get price
              const subtotal = quantity * price; // Calculate subtotal
              return (
                <div
                  key={index}
                  className="flex flex-col justify-start sm:grid sm:grid-cols-8 gap-5 sm:justify-between"
                >
                  <div className="flex gap-3 col-span-5">
                    <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}.</span>
                    <h1 className="text-start">{item.productId?.name || "Product"}</h1>
                  </div>
                  <div className="text-pale-red flex justify-between gap-3 col-span-3">
                    <span>X{quantity}</span>
                    <span className="text-end">৳{subtotal}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products in order.</p>
          )}
        </div>

        {/* 🔥 Show Total */}
        <div className=" font-semibold text-pale-red text-lg mt-5">
          Total: ৳{totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
