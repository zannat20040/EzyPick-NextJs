"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/authentication");
      return;
    }

    axios
      .get("http://localhost:8055/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
        setRole(res.data.data.role.name); // e.g., "buyer" or "seller"
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        router.push("/authentication");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    router.push("/authentication");
  };

  if (!user) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-md p-6 space-y-4">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <nav className="space-y-2">
          <Link href="/">🏠 Home</Link>
          {role === "buyer" && (
            <>
              <Link href="/dashboard/buyer">🛒 My Orders</Link>
              {/* <Link href="/profile">👤 Profile</Link> */}
            </>
          )}
          {role === "seller" && (
            <>
              <Link href="/dashboard/seller">📦 My Products</Link>
              {/* <Link href="/upload-documents">📁 Upload Documents</Link> */}
            </>
          )}
        </nav>
        <button
          onClick={logout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">{children}</main>
    </div>
  );
}
