"use client";

import { useRouter } from "next/navigation";
import { getUserFromToken } from "../lib/auth";
import Topbar from "../components/Topbar";
import { PlusCircle, Settings, BarChart3 } from "lucide-react";
import toast from "react-hot-toast";

export default function LandingPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    const u = getUserFromToken();

    if (!u) {
      router.push("/auth/login");
      return;
    }

    // Show toast if non-admin tries dashboard
    if (path === "/dashboard" && u.role !== "Admin") {
      toast.error("Only admins can access the dashboard.", {
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
        },
        icon: "⛔",
      });
      return;
    }

    router.push(path);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F3EDFF] via-white to-[#F6F4FF]" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#8B5CF6]/30 blur-3xl rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B5CF6]/20 blur-3xl rounded-full opacity-40 animate-pulse"></div>

      <Topbar />

      <main className="max-w-6xl mx-auto mt-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Smart Machine Control Portal
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Manage machines, monitor performance, and explore AI-driven insights.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Add Machine */}
          <div
            onClick={() => handleNavigation("/machines/add")}
            className="cursor-pointer p-6 rounded-2xl bg-white/60 backdrop-blur-lg shadow-md 
                       border border-white/40 hover:shadow-xl hover:scale-[1.03] 
                       hover:border-[#8B5CF6] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <PlusCircle size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Add a Machine</h3>
            </div>
            <p className="text-gray-500 mt-3">
              Register a new machine and start tracking key parameters instantly.
            </p>

            <button className="mt-5 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg shadow hover:bg-[#7A4CE0] transition">
              Add Machine
            </button>
          </div>

          {/* Update Machine */}
          <div
            onClick={() => handleNavigation("/machines")}
            className="cursor-pointer p-6 rounded-2xl bg-white/60 backdrop-blur-lg shadow-md 
                       border border-white/40 hover:shadow-xl hover:scale-[1.03] 
                       hover:border-[#8B5CF6] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <Settings size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Update a Machine</h3>
            </div>
            <p className="text-gray-500 mt-3">
              Modify machine data such as temperature, energy, or status.
            </p>

            <button className="mt-5 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg shadow hover:bg-[#7A4CE0] transition">
              Update Machine
            </button>
          </div>

          {/* Dashboard */}
          <div
            onClick={() => handleNavigation("/dashboard")}
            className="cursor-pointer p-6 rounded-2xl bg-white/60 backdrop-blur-lg shadow-md 
                       border border-white/40 hover:shadow-xl hover:scale-[1.03] 
                       hover:border-[#8B5CF6] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Go to Dashboard</h3>
            </div>
            <p className="text-gray-500 mt-3">
              Explore machine analytics, charts, and AI-driven predictions.
            </p>

            <button className="mt-5 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg shadow hover:bg-[#7A4CE0] transition">
              Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}