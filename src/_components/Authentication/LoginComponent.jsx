"use client";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { GoEye, GoEyeClosed } from "react-icons/go"; // 👁️ Import icons
import SocialLogin from "./SocialLogin";
import getUserByEmail from "@/utils/getUserByEmail";

export default function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    try {
      // Firebase login
      const userCredential = await signIn(email, password);
      const firebaseUser = userCredential?.user;
      console.log('--------',userCredential)

      if (!firebaseUser) {
        toast.error("Login failed.");
        return;
      }
      // Fetch user data from backend
      const userData = await getUserByEmail(email);

      if (!userData) {
        toast.error("User not found in Database.");
        return;
      }

      toast.success("Login successful!");

      // Redirect based on role
      if (userData.role === "buyer") {
        router.push("/order");
      } else if (userData.role === "seller") {
        router.push("/");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleUserLogin} className="space-y-2" method="POST">
        <div className="space-y-2 text-sm">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2 text-sm relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none"
            required
          />

          {/* Show/Hide Password Toggle */}

          {showPassword ? (
            <GoEyeClosed
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer absolute top-4 bottom-0 right-3 !mt-0  "
            />
          ) : (
            <GoEye
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer absolute top-4 bottom-0 right-3 !mt-0  "
            />
          )}
        </div>

        <div className="flex justify-end text-xs mt-1">
          <Link
            href="#"
            className="hover:underline hover:text-pale-red transition-all duration-300"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-pale-red w-full text-white uppercase font-medium rounded"
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <SocialLogin />
    </div>
  );
}
