import React from "react";
import { FaFacebookF, FaGithubAlt, FaGoogle } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { signIn} from "next-auth/react";


export default function SocialLogin() {
  return (
    <>
      {/* login with others */}
      <div className="flex items-center pt-4 space-x-2 text-gray">
        <div className="flex-1 h-px bg-soft-gray"></div>
        <p className="text-sm text-gray-600">Login with social accounts</p>
        <div className="flex-1 h-px bg-soft-gray"></div>
      </div>
      {/* Social icons */}
      <div className="flex justify-center space-x-4">
        <button className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all">
          <IoIosCall className="text-lg" />
        </button>
        <button
          onClick={() => signIn("google")}
          className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all"
        >
          <FaGoogle />
        </button>
        <button className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all">
          <FaFacebookF />
        </button>
        <button
          onClick={() => signIn("github")}
          className="p-3 rounded-full hover:bg-soft-gray duration-300 transition-all"
        >
          <FaGithubAlt />
        </button>
      </div>
    </>
  );
}
