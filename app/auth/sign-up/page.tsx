"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async ()=> {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`, {
        name,
        email,
        password,
      });

      if (!response) {
        console.log("there is an error in create function");
      }

      localStorage.setItem("token", response.data.token);
      setName("");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error) {
      console.log("Unexpected error occured ", error);
    }
  };


  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Create Account</h1>
      <p className="text-gray-500 mb-8">
        Join us and start your journey today!
      </p>

      <div className="space-y-4 text-gray-500">
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded-lg p-3 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Sign Up
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-purple-600 font-semibold cursor-pointer">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
