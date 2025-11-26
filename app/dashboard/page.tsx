"use client";

import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import StatsPanel from "../../components/StatsPanel";
import AISection from "../../components/AISection";
import api from "../../lib/api";
import { Machine } from "../../types";
import { useAdminGuard } from "@/lib/hooks/useAuth";
import MachinesTable from "@/components/MachinesTable";

export default function DashboardPage() {
  useAdminGuard();

  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-r from-[#FBF8FF] via-white to-[#F6F7FF] p-6">
      <Topbar />
      <main className="max-w-7xl mx-auto mt-8 space-y-6">
        <StatsPanel machines={machines} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-2xl shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">All Machines</h3>
                <div className="flex gap-2">
                  <button
                    onClick={fetchMachines}
                    className="px-3 py-1 bg-gray-100 rounded-md"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {loading ? (
                <div>Loading...</div>
              ) : (
                <MachinesTable machines={machines} />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <AISection machines={machines} />
            <div className="p-4 bg-white rounded-2xl shadow">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="/machines/add"
                  className="px-3 py-2 bg-[#8B5CF6] text-white rounded-md text-center"
                >
                  Add Machine
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
