"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

interface AuthFormProps {
  type: "login" | "register";
}

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = LoginPayload & {
  name: string;
  isHost: boolean;
};

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let payload: LoginPayload | RegisterPayload = {
        email,
        password,
      };

      if (type === "register") {
        payload = {
          ...payload,
          name,
          isHost: false,
        };
      }

      const res = await api.post(`/${type}`, payload);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { msg?: string } } };
      alert(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">
        {type === "login" ? "Login" : "Register"}
      </h2>

      {type === "register" && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
