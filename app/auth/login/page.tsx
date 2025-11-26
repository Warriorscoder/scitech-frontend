"use client";

import api from "@/lib/api";
import { User } from "@/types";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      if (!response) {
        console.log("there is an error in create function");
      }
      const token = response.data.token
      localStorage.setItem("token", token);
      setEmail("");
      setPassword("");

       const decoded:User = jwtDecode(token);

      if (decoded.role === "Admin") {
        router.push("/dashboard");
      } else {
        router.push("/"); 
      }

    } catch (error) {
      console.log("Unexpected error occured ", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-gray-800 font-bold mb-4">
        Holla, Welcome Back
      </h1>
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
          <Link href="/auth/sign-up" className="text-purple-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
