import React from "react"; // Import useState
import Link from "next/link";
import LoginComponent from "@/_ClientSideComponents/Authentication/LoginComponent";

export default function LoginPage() {
  return (
    <div className="mt-10 container px-4 space-y-3 rounded bg-white">
      <LoginComponent />
      <p className="text-sm text-center gap-2 flex justify-center sm:px-6">
        Don&apos;t have an account?
        <Link
          href={"/authentication/register"}
          className="underline hover:text-pale-red duration-300 transition-all"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
