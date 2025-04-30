import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OrderList({ orders, email }) {
  return (
    <ul className="list bg-base-100 container px-5 lg:px-8 mx-auto">
      {orders.map((order) => (
        <li
          key={order._id}
          className="list-row px-0 border-b last:border-b-0 py-4 flex flex-col"
        >
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 font-medium">
              Order ID:{" "}
              <span className="text-black">
                {order._id.slice(-6).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mt-3 ">
            {order.items.map((item, idx) => (
              <Link
                href={`/product/${item.productId?.name}/pid-${item.productId._id}`}
                key={idx}
                className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg w-full sm:w-auto"
              >
                <Image
                  width={60}
                  height={60}
                  className="size-14 rounded-box bg-gray-100"
                  src={item.productId?.thumbnail || "/placeholder.png"}
                  alt={item.productId?.name || "Product"}
                />
                <div className="flex flex-col">
                  <div className="font-semibold">
                    {item.productId?.name || "Product"}
                  </div>
                  <div className="text-xs opacity-70 font-semibold">
                    {item.quantity} × ৳
                    {item.productId?.price
                      ? (
                          item.productId.price -
                          (item.productId.price *
                            (item.productId.discount || 0)) /
                            100
                        ).toFixed(2)
                      : "0.00"}
                  </div>
                  <div className="text-xs uppercase  text-red-700  py-1  font-semibold">
                    {item.status}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
