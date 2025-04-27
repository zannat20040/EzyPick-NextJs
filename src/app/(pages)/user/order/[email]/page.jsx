import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import getUserByEmail from "@/utils/getUserByEmail";
import OrderList from "@/_components/Dashboard/Buyer/order/OrderList";

// ✅ Fetch all orders by user's email
async function getUserOrders(email) {
  try {
    const ordersRes = await axiosInstance.get(`/api/orders/user/${email}`);
    const userData = await getUserByEmail(email);

    return {
      orders: ordersRes?.data?.orders || [],
      name: userData?.name || "User",
    };
  } catch (err) {
    console.error("Error fetching orders or user data:", err);
    return {
      orders: [],
      name: "User",
    };
  }
}

export default async function Page({ params }) {
  const email = decodeURIComponent(params.email);
  const { orders, name } = await getUserOrders(email);

  if (!orders.length) {
    return (
      <div className="text-center py-10 text-gray-600">
        You have no orders yet.
      </div>
    );
  }

  return (
    <>
      <BreadCrumbsComp category={name} subcategory="See your orders" />
      <OrderList orders={orders} email={email} />
    </>
  );
}
