"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

export default function AllSellers({ sellers: initialSellers }) {
  const [sellers, setSellers] = useState(initialSellers); // 🔥 local state for instant UI update
  const [updatingSellerId, setUpdatingSellerId] = useState(null); // 🔥 to track which seller is updating

  const handleStatusChange = async (sellerId, newStatus) => {
    setUpdatingSellerId(sellerId); // ✅ disable select during request
    try {
      const res = await axiosInstance.patch(`/api/users/update-status/${sellerId}`, {
        verification_status: newStatus,
      });

      toast.success(`Seller status updated to ${newStatus}`);

      // ✅ Instantly update local sellers state
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller._id === sellerId
            ? { ...seller, verification_status: newStatus }
            : seller
        )
      );
    } catch (error) {
      console.error("Error updating seller status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingSellerId(null); // ✅ enable select again
    }
  };

  return (
    <div className="container mx-auto my-10 px-5 lg:px-8">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Seller ID</th>
              <th>Seller Photo</th>
              <th>Seller Info</th>
              <th>Company Logo</th>
              <th>Company Info</th>
              <th>Company Documents</th>
              <th>Verified</th>
            </tr>
          </thead>

          <tbody>
            {sellers?.length > 0 ? (
              sellers.map((seller) => (
                <tr key={seller._id} className="hover:bg-gray-100">
                  <td className="text-xs text-gray-500">{seller._id.slice(-6).toUpperCase()}</td>

                  {/* Seller Photo */}
                  <td>
                    <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={seller.profile_img || "/placeholder.png"}
                        alt="Seller Photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* Seller Info */}
                  <td className="text-xs">
                    <p><span className="font-semibold">Name:</span> {seller.name}</p>
                    <p><span className="font-semibold">Email:</span> {seller.email}</p>
                    <p><span className="font-semibold">Phone:</span> {seller.phone}</p>
                    <p><span className="font-semibold">Address:</span> {seller.address}</p>
                  </td>

                  {/* Company Logo */}
                  <td>
                    {seller.company_logo ? (
                      <div className="w-12 h-12 relative bg-white rounded-lg overflow-hidden">
                        <Image
                          src={seller.company_logo}
                          alt="Company Logo"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No Logo</span>
                    )}
                  </td>

                  {/* Company Info */}
                  <td className="text-xs">
                    <p><span className="font-semibold">Name:</span> {seller.company_name}</p>
                    <p><span className="font-semibold">Email:</span> {seller.company_email}</p>
                    <p><span className="font-semibold">Phone:</span> {seller.company_phone}</p>
                    <p><span className="font-semibold">Address:</span> {seller.company_address}</p>
                  </td>

                  {/* Company Documents */}
                  <td>
                    {seller.documents?.length > 0 ? (
                      <div className="flex gap-2 flex-wrap">
                        {seller.documents.map((doc, idx) => (
                          <Link
                            key={idx}
                            href={doc}
                            target="_blank"
                            className="text-pale-red underline text-xs"
                          >
                            Doc {idx + 1}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No Documents</span>
                    )}
                  </td>

                  {/* Verification Status */}
                  <td className="text-xs">
                    {seller.verification_status === "pending" ? (
                      <select
                        onChange={(e) => handleStatusChange(seller._id, e.target.value)}
                        defaultValue=""
                        className="border border-gray-300 rounded p-1 text-xs outline-none"
                        disabled={updatingSellerId === seller._id} // ✅ disable only while updating
                      >
                        <option value="" disabled>Update Status</option>
                        <option value="approved">Verified</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    ) : (
                      <span
                        className={
                          seller.verification_status === "approved"
                            ? "text-green-500 font-bold"
                            : "text-red-500 font-bold"
                        }
                      >
                        {seller.verification_status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5">No sellers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
