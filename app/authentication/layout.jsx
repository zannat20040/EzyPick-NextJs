"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Authenticationlayout({ children }) {
    const pathname = usePathname()

  return (
    <div className="py-10 px-4 bg-soft-gray">
      <div className=" max-w-md  bg-white mx-auto shadow-lg rounded">
        <div className="flex container justify-evenly items-center rounded  rounded-b-none w-full ">
          <Link
            href={"/authentication"}
            className={`font-medium text-sm duration-300 rounded-tl p-3 w-full text-center px-10 ${pathname==='/authentication' ? 'bg-pale-red text-white':''} `}
          >
            Log in
          </Link>
          <Link
            href={"/authentication/register"}
            className={` font-medium text-sm duration-300  p-3  w-full text-center rounded-tr px-10 ${pathname==='/authentication/register' ? 'bg-pale-red text-white':''} `}
          >
            {" "}
            Register
          </Link>
        </div>
        <div className="p-3 pb-6">{children}</div>
      </div>
    </div>
  );
}
