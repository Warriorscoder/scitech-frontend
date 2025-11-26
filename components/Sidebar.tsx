"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-4 w-64 p-4 bg-white/30 rounded-2xl">
      <div className="text-lg font-bold">Menu</div>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="px-3 py-2 rounded-lg hover:bg-gray-100">Overview</Link>
        <Link href="/machines/add" className="px-3 py-2 rounded-lg hover:bg-gray-100">Add Machine</Link>
        <Link href="/machines" className="px-3 py-2 rounded-lg hover:bg-gray-100">All Machines</Link>
      </nav>
    </aside>
  );
}
