"use client";

import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

export default function SellerOrderList({ orders, email }) {
  const [allOrders, setAllOrders] = useState(orders);

  // ✅ Handle Accept or Reject for specific Item
  const handleItemStatusChange = async (orderId, itemId, status) => {
    try {
      const res = await axiosInstance.patch("/api/orders/item/status", {
        orderId,
        itemId,
        status,
      });

      // Update the UI
      setAllOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item._id === itemId ? { ...item, status } : item
                ),
              }
            : order
        )
      );

      toast.success(`Product ${status} successfully!`);
    } catch (err) {
      console.error("Error updating item status:", err);
      toast.error("Failed to update product status");
    }
  };

  return (
    <div className="container mx-auto my-10 px-5 lg:px-8">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Buyer Info</th> {/* ✅ Added Buyer Info column */}
              <th>Delivery Option</th>
              <th>Requirement</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.length > 0 ? (
              allOrders.map((order) =>
                order.items
                  .filter(
                    (item) =>
                      item.productId?.postedBy?.toLowerCase() ===
                      email?.toLowerCase()
                  )
                  .map((item, idx) => {
                    const quantity = item.quantity || 1;
                    const price = item.productId?.price || 0;
                    const subtotal = quantity * price;

                    return (
                      <tr
                        key={`${order._id}-${item._id}`}
                        className="hover:bg-gray-100"
                      >
                        <td className="text-xs">
                          {order._id.slice(-6).toUpperCase()}
                        </td>
                        <td>
                          <p>
                            {`${item.productId?.name} (X${quantity})` ||
                              "Unknown"}
                          </p>
                          <p className="text-xs uppercase font-semibold opacity-60">
                            ৳{subtotal.toFixed(2)}
                          </p>
                        </td>

                        {/* ✅ Buyer Info Column */}
                        <td className="text-xs">
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {item.buyerName || order.buyerName}
                          </p>
                          <p>
                            <span className="font-semibold">Phone:</span>{" "}
                            {item.buyerPhone || order.buyerPhone}
                          </p>
                          <p>
                            <span className="font-semibold">Address:</span>{" "}
                            {item.buyerAddress || order.buyerAddress}
                          </p>
                        </td>

                        <td>{item.deliveryOption || "N/A"}</td>
                        <td>{item.requirement || "None"}</td>
                        <td className="capitalize">{item.status}</td>
                        <td className="flex gap-2">
                          {item.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleItemStatusChange(
                                    order._id,
                                    item._id,
                                    "accepted"
                                  )
                                }
                                className="btn btn-xs bg-green-500 text-white"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleItemStatusChange(
                                    order._id,
                                    item._id,
                                    "rejected"
                                  )
                                }
                                className="btn btn-xs bg-red-500 text-white"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
              )
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  No orders found for your products.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
