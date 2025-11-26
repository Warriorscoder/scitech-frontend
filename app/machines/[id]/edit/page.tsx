"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useRouter } from "next/navigation";
import { Machine } from "@/types";
import { getUserFromToken } from "@/lib/auth";
import api from "@/lib/api";
import Topbar from "@/components/Topbar";
import MachineForm from "@/components/MachineForm";

export default function EditMachinePage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [machine, setMachine] = useState<Machine | null>(null);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!id) return;
    api.get(`/machine/${id}`).then((r) => setMachine(r.data)).catch(console.error);
  }, [id, router]);

  if (!machine) {
    return (
      <div className="min-h-screen bg-linear-to-r from-[#FBF8FF] via-white to-[#F6F7FF] p-6">
        <Topbar />
        <main className="max-w-3xl mx-auto mt-8">Loading...</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-[#FBF8FF] via-white to-[#F6F7FF] p-6">
      <Topbar />
      <main className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Edit Machine</h2>
        <MachineForm initial={machine} mode="edit" />
      </main>
    </div>
  );
}
