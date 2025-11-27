"use client";

import api from "@/lib/api";
import { User } from "@/types";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      setEmail("");
      setPassword("");

      toast.success("Login successful!");

      const decoded: User = jwtDecode(token);

      if (decoded.role === "Admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      console.log("Unexpected error occurred:", error);

      let message = "Login failed. Please try again.";

      if (error instanceof AxiosError) {
        message =
          error.response?.data?.message ||
          error.response?.data ||
          "Invalid email or password.";
      }

      toast.error(message);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-gray-800 font-bold mb-4">Welcome Back</h1>
      <p className="text-gray-500 mb-8">
        Hey, welcome back to your special place
      </p>

      <div className="space-y-4 text-gray-500">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium"
          onClick={handleSubmit}
        >
          Sign In
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-purple-600 font-semibold cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
