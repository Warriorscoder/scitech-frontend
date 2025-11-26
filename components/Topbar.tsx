"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-sm rounded-b-2xl shadow-sm">
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex gap-4 text-sm text-gray-600">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/machines/add">Add Machine</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={logout} className="px-4 py-2 bg-yellow-400 text-black rounded-md">
          Logout
        </button>
      </div>
    </header>
  );
}
