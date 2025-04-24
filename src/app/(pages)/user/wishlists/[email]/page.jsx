import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import getUserByEmail from "@/utils/getUserByEmail";
import WishlistList from "@/_components/Dashboard/Buyer/WishtList/WishlistList";

async function getWishlist(email) {
  try {
    const [wishlistRes, userData] = await Promise.all([
      axiosInstance.get(`/api/user-cart/user/${email}`),
      getUserByEmail(email),
    ]);

    return {
      wishlist: wishlistRes.data.wishlist || [],
      name: userData?.name || "User",
    };
  } catch (err) {
    console.error("Error fetching wishlist or user data:", err);
    return {
      wishlist: [],
      name: "User",
    };
  }
}

export default async function Page({ params }) {
  const email = decodeURIComponent(params.email);
  const { wishlist, name } = await getWishlist(email);

  if (!wishlist.length) {
    return (
      <div className="text-center py-10 text-gray-600">
        You have no items in your wishlist.
      </div>
    );
  }

  return (
    <>
      <BreadCrumbsComp category={name} subcategory="See Wishlist" />
      <WishlistList wishlist={wishlist} email={email} />
    </>
  );
}
