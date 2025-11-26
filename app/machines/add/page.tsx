"use client";

import Topbar from "../../../components/Topbar";
import MachineForm from "../../../components/MachineForm";
import { getUserFromToken } from "../../../lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddMachinePage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) router.push("/auth/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-linear-to-r from-[#FBF8FF] via-white to-[#F6F7FF] p-6">
      <Topbar />
      <main className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Add Machine</h2>
        <MachineForm mode="create" />
      </main>
    </div>
  );
}
