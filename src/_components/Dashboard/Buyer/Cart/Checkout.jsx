"use client";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Checkout({ cartItems = [] }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    items: cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity || 1, 
      requirement: "",
      deliveryOption: "",
    })),
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] = value;
    setForm((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill up your name, phone, and address!");
      return;
    }
  
    const incompleteItem = form.items.find(
      (item) => !item.requirement.trim() || !item.deliveryOption.trim()
    );
    if (incompleteItem) {
      toast.error("Please complete special requirement and delivery option for all products!");
      return;
    }
  
    const finalOrder = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      email: user.email,
      items: form.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        requirement: item.requirement,
        deliveryOption: item.deliveryOption,
        buyerName: form.name,
        buyerPhone: form.phone,
        buyerAddress: form.address,
      })),
    };
  
    console.log("✅ Final Order Submitted:", finalOrder);
  
    try {
      const res = await axiosInstance.post("/api/orders", finalOrder);
  
      toast.success("Order placed successfully!");
      console.log("🚀 Order Response:", res.data);
  
      // ✅ Bulk remove cart items
      const productIds = finalOrder.items.map((item) => item.productId);
  
      await axiosInstance.post("/api/user-cart/cart/bulk-remove", {
        productIds: productIds,
        email: user.email,
      });
  
      console.log("Deleting productIds from cart:", productIds, "Email:", user.email);

      const orderId = res.data.order._id; // ✅ get saved order's ID

      router.push(`/user/confirmorder?orderId=${orderId}`);
          } catch (error) {
      console.error("Error submitting order:", error);
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };
  

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        {/* Buyer Info */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Shipping Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn text-white rounded bg-pale-red text-sm font-semibold w-full uppercase"
          >
            Confirm Order
          </button>
        </div>

        <div className="join join-vertical bg-base-100">
          {/* Cart Items with Delivery Option + Requirement */}
          {cartItems.map((item, index) => {
            const specPlaceholder = Object.entries(
              item.productId.specifications || {}
            )
              .map(([key, val]) => `${key}: ${val}`)
              .join(", ");

            return (
              <div
                key={item.productId._id}
                className="collapse collapse-arrow join-item border-base-300 border"
              >
                <input type="radio" name={`my-accordion`} />
                <div className="collapse-title font-semibold">
                  {item.productId.name}
                </div>
                <div className="collapse-content text-sm">
                  {/* Product Requirement */}
                  <label className="block text-sm font-medium mb-2">
                    Special Requirements
                  </label>
                  <input
                    type="text"
                    placeholder={`e.g. ${
                      specPlaceholder || "Specify size, color, etc."
                    }`}
                    value={form.items[index].requirement}
                    onChange={(e) =>
                      handleItemChange(index, "requirement", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
                  />

                  {/* Delivery Option */}
                  <label className="block text-sm font-medium my-2">
                    Delivery Option
                  </label>
                  <select
                    value={form.items[index].deliveryOption}
                    onChange={(e) =>
                      handleItemChange(index, "deliveryOption", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded border border-soft-gray outline-none"
                  >
                    <option value="">Choose one</option>
                    {item.productId.delivery_options?.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
