"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Brand */}
      <h1 className="text-2xl font-bold text-rose-500">
        <Link href="/">StayFinder</Link>
      </h1>

      {/* Nav Items */}
      <div className="space-x-4 text-sm font-medium text-gray-800">
        {token ? (
          <button
            onClick={logout}
            className="text-rose-500 hover:text-rose-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="hover:text-rose-500 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="hover:text-rose-500 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
