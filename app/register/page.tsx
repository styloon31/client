"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import api from "../lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", isHost: false });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      login(res.data.token, res.data.user);
      router.push("/");
    } catch (err) {
      console.error("Registration failed", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>
        <p className="text-center text-gray-500 mb-4">Join StayFinder to start booking or listing properties</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />

          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="isHost"
              onChange={handleChange}
              className="h-4 w-4 text-rose-500 border-gray-300 focus:ring-rose-500"
            />
            <span>Register as a Property Lister</span>
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-rose-500 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
