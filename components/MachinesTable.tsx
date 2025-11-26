"use client";

import Link from "next/link";
import { Machine } from "../types";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function MachinesTable({ machines }: { machines: Machine[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this machine?");
    if (!confirmed) return;

    try {
      await api.delete(`/machine/${id}`);
      router.push('/dashboard'); 
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete machine.");
    }
  };

  if (!machines.length) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-gray-600">
        No machines found.
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Machine List</h2>

      {/* Scroll for mobile */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="py-3">Sr no.</th>
              <th className="py-3">Name</th>
              <th className="py-3">Status</th>
              <th className="py-3">Temperature (°C)</th>
              <th className="py-3">Energy (kWh)</th>
              <th className="py-3">Created</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {machines.map((m, i) => {
              const statusColor =
                m.status === "Running"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700";

              return (
                <tr
                  key={m._id}
                  className="text-sm text-gray-700 hover:bg-gray-50 transition rounded-lg"
                >
                  <td className="py-3">{String(i + 1).padStart(2, "0")}</td>

                  <td className="py-3 font-medium text-gray-800">{m.name}</td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                    >
                      {m.status}
                    </span>
                  </td>

                  <td className="py-3">{m.temperature}°C</td>

                  <td className="py-3">{m.energyConsumption} kWh</td>

                  <td className="py-3">
                    {m.createdAt
                      ? new Date(m.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Action Column */}
                  <td className="py-3 text-center flex justify-center gap-2">
                    {/* Edit Button */}
                    <Link
                      href={`/machines/${m._id}/edit`}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-[#8B5CF6] text-white rounded-md transition"
                    >
                      <Pencil size={14} />
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => m._id && handleDelete(m._id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
