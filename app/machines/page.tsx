"use client";

import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import api from "../../lib/api";
import { Machine } from "../../types";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../lib/auth";
import MachinesTable from "@/components/MachinesTable";

export default function MachinesPage() {
  const router = useRouter();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) router.push("/auth/login");
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    setLoading(true);
    try {
      const res = await api.get("/machine");
      setMachines(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-[#FBF8FF] via-white to-[#F6F7FF] p-6">
      <Topbar />
      <main className="max-w-7xl mx-auto mt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Machines</h2>
          <a href="/machines/add" className="px-4 py-2 bg-purple-600 text-white rounded-md">Add Machine</a>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow">
          {loading ? <div>Loading...</div> : <MachinesTable machines={machines} />}
        </div>
      </main>
    </div>
  );
}
