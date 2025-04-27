import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import getUserByEmail from "@/utils/getUserByEmail";
import SellerOrderList from "@/_components/Dashboard/Seller/Order/SellerOrderList";

// ✅ Fetch all orders by seller's email
async function getSellerOrders(email) {
  try {
    const ordersRes = await axiosInstance.get(`/api/orders/seller/${email}`);
    const userData = await getUserByEmail(email);
    console.log("seller orders", ordersRes);

    return {
      orders: ordersRes?.data?.orders || [],
      name: userData?.name || "Seller",
    };
  } catch (err) {
    console.error("Error fetching seller orders:", err);
    return {
      orders: [],
      name: "Seller",
    };
  }
}

export default async function Page({ params }) {
  const email = decodeURIComponent(params.email);
  const { orders, name } = await getSellerOrders(email);

  if (!orders.length) {
    return (
      <div className="text-center py-10 text-gray-600">
        You have no orders yet for your products.
      </div>
    );
  }

  return (
    <>
      <BreadCrumbsComp category={name} subcategory="Your Sold Orders" />
      <SellerOrderList orders={orders} email={email} />
    </>
  );
}
