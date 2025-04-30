"use client";
import SearchBar from "@/_components/Homepage/Additional/SearchBar";
import { useAuth } from "@/Context/AuthContext";
import getUserByEmail from "@/utils/getUserByEmail";
import { Collapse, IconButton, Navbar } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCartShopping, FaRegUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { TiHeartFullOutline } from "react-icons/ti";
import { BsBox2Heart } from "react-icons/bs";
import toast from "react-hot-toast";

export default function BottomNav() {
  const pathname = usePathname();
  const [openNav, setOpenNav] = React.useState(false);
  const { user, signOutUser } = useAuth();
  const [userData, setUserData] = useState(null); // ✅ user data state

  const handleLogout = async () => {
    try {
      await signOutUser(); // wait until Firebase / Supabase finishes
      toast.success("Logged out successfully"); // green success toast
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Something went wrong. Please try again."); // red error toast
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        const data = await getUserByEmail(user.email);
        setUserData(data); // ✅ store resolved user data
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Define your navigation items with their paths
  const navItems = [{ label: "Home", path: "/" }];
  const protectedBuyerNavItems = [
    { label: "My Order", path: `/user/order/${user?.email}` },
  ];
  const protectedAdminNavItems = [
    { label: "My Sellers", path: `/admin/allsellers` },
    { label: "Categories", path: `/admin/updateCategory` },
  ];

  const protectedSellerNavItems = [
    { label: "Add Product", path: "/seller/addproduct" },
    { label: "My Products", path: `/seller/myproducts/${user?.email}` },
  ];

  return (
    <Navbar className="mx-auto bg-white h-max w-full rounded-none px-0 shadow-none py-2 lg:py-4">
      <div className="container mx-auto lg:px-8 px-5 flex items-center justify-between text-blue-gray-900">
        <Link
          href={"/"}
          className="mr-4 cursor-pointer py-1.5 text-lg font-bold text-pale-red"
        >
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <div className="mr-4 hidden lg:block">
          <ul className="flex justify-center items-center gap-4 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`hover:text-pale-red transition-colors ${
                    pathname === item.path ? "text-pale-red" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user && userData?.role === "buyer" && (
              <>
                {protectedBuyerNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`hover:text-pale-red transition-colors ${
                        pathname === item.path ? "text-pale-red" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </>
            )}
            {user && userData?.role === "admin" && (
              <>
                {protectedAdminNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`hover:text-pale-red transition-colors ${
                        pathname === item.path ? "text-pale-red" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </>
            )}
            {user && userData?.role === "seller" && (
              <>
                {protectedSellerNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`hover:text-pale-red transition-colors ${
                        pathname === item.path ? "text-pale-red" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

        <div className="flex items-center lg:gap-3">
          <div className="sm:block hidden">
            <SearchBar />
          </div>
          {user && userData?.role === "buyer" && (
            <>
              <Link href={`/user/carts/${user?.email}`}>
                <FaCartShopping
                  className={`hover:text-pale-red hidden lg:inline-block ${
                    pathname === "/authentication" ||
                    pathname === "/authentication/register"
                      ? "text-pale-red"
                      : ""
                  }`}
                />
              </Link>
              <Link href={`/user/wishlists/${user?.email}`}>
                <TiHeartFullOutline
                  className={`hover:text-pale-red hidden lg:inline-block ${
                    pathname === "/user/wishlists" ? "text-pale-red" : ""
                  }`}
                />
              </Link>
            </>
          )}
          {user && userData?.role === "seller" && (
            <Link href={`/seller/orders/${user?.email}`}>
              <BsBox2Heart
                className={`hover:text-pale-red hidden lg:inline-block ${
                  pathname === `/seller/orders/${user?.email}`
                    ? "text-pale-red"
                    : ""
                }`}
              />
            </Link>
          )}
          {!user && (
            <Link href="/authentication">
              <FaRegUser
                className={`hover:text-pale-red hidden lg:inline-block ${
                  pathname === "/authentication" ||
                  pathname === "/authentication/register"
                    ? "text-pale-red"
                    : ""
                }`}
              />
            </Link>
          )}

          {user && (
            <MdOutlineLogout
              onClick={handleLogout}
              className={`text-lg cursor-pointer hover:text-pale-red hidden lg:inline-block `}
            />
          )}
        </div>

        {/* Mobile menu button */}
        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-pale-red"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>

      {/* Mobile Navigation */}
      <Collapse open={openNav}>
        <ul className="container mx-auto flex py-3 px-5 gap-4 flex-col text-black">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`hover:text-pale-red transition-colors ${
                  pathname === item.path ? "text-pale-red" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {user && userData?.role === "buyer" && (
            <>
              {protectedBuyerNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`hover:text-pale-red transition-colors ${
                      pathname === item.path ? "text-pale-red" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </>
          )}
          {user && userData?.role === "seller" && (
            <>
              {protectedSellerNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`hover:text-pale-red transition-colors ${
                      pathname === item.path ? "text-pale-red" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </>
          )}
          <li>
            <Link
              href="/authentication"
              className={`hover:text-pale-red transition-colors ${
                pathname === "/authentication" ||
                pathname === "/authentication/register"
                  ? "text-pale-red"
                  : ""
              }`}
            >
              Login / Signup
            </Link>
          </li>
          {user && userData?.role === "buyer" && (
            <>
              <li>
                <Link href={`/user/carts/${user?.email}`}>
                  <FaCartShopping
                    className={`hover:text-pale-red hidden lg:inline-block ${
                      pathname === "/authentication" ||
                      pathname === "/authentication/register"
                        ? "text-pale-red"
                        : ""
                    }`}
                  />
                </Link>
              </li>
              <li>
                <Link href={`/user/wishlists/${user?.email}`}>
                  <TiHeartFullOutline
                    className={`hover:text-pale-red hidden lg:inline-block ${
                      pathname === "/user/wishlists" ? "text-pale-red" : ""
                    }`}
                  />
                </Link>
              </li>
            </>
          )}
          {user && userData?.role === "seller" && (
            <li>
              <Link href={`/seller/orders/${user?.email}`}>
                <BsBox2Heart
                  className={`hover:text-pale-red hidden lg:inline-block ${
                    pathname === `/seller/orders/${user?.email}`
                      ? "text-pale-red"
                      : ""
                  }`}
                />
              </Link>
            </li>
          )}
          {user && (
            <li>
              <MdOutlineLogout
                onClick={handleLogout}
                className={`text-lg cursor-pointer hover:text-pale-red hidden lg:inline-block `}
              />
            </li>
          )}
        </ul>
      </Collapse>
    </Navbar>
  );
}
