import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import { BreadCrumbsComp } from "@/_components/shared/BreadCrumbsComp";
import getUserByEmail from "@/utils/getUserByEmail";
import Cartlist from "@/_components/Dashboard/Buyer/Cart/Cartlist";

async function getCartlist(email) {
    try {
      const cartResponse = await axiosInstance.get(`/api/user-cart/user/${email}`);
      const userData = await getUserByEmail(email);
  
      return {
        wishlist: cartResponse.data.wishlist || [],
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
    const { wishlist, name } = await getCartlist(email);
  
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
        <Cartlist cartRes={wishlist} email={email} />
      </>
    );
  }
  
