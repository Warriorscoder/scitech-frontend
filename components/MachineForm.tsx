"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import { Machine, MachineStatus } from "../types";
import toast from "react-hot-toast";

export default function MachineForm({ initial, mode = "create" }: { initial?: Partial<Machine>; mode?: "create" | "edit" }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [status, setStatus] = useState<MachineStatus>(initial?.status ?? "Idle");
  const [temperature, setTemperature] = useState(initial?.temperature ?? 25);
  const [energy, setEnergy] = useState(initial?.energyConsumption ?? 0);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "create") {
        await api.post("/machine", { name, status, temperature, energyConsumption: energy });
        toast.success("Machine added successfully!", {
          style: { background: "#ECFDF5", color: "#065F46", border: "1px solid #A7F3D0" },
          icon: "✅",
        });
      } else if (mode === "edit" && initial?._id) {
        await api.patch(`/machine/${initial._id}`, { name, status, temperature, energyConsumption: energy });
        toast.success("Machine updated successfully!", {
          style: { background: "#EEF2FF", color: "#4338CA", border: "1px solid #C7D2FE" },
          icon: "🛠️",
        }); 
      }
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-2xl shadow">
      <div>
        <label className="text-sm text-gray-600">Name</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-md border mt-1" />
      </div>

      <div>
        <label className="text-sm text-gray-600">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as MachineStatus)} className="w-full p-3 rounded-md border mt-1">
          <option value="Running">Running</option>
          <option value="Stopped">Stopped</option>
          <option value="Idle">Idle</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Temperature (°C)</label>
          <input type="number" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="w-full p-3 rounded-md border mt-1" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Energy (kWh)</label>
          <input type="number" value={energy} onChange={(e) => setEnergy(Number(e.target.value))} className="w-full p-3 rounded-md border mt-1" />
        </div>
      </div>

      <div className="flex justify-end">
        <button disabled={loading} type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
          {mode === "create" ? (loading ? "Creating..." : "Create") : (loading ? "Saving..." : "Save")}
        </button>
      </div>
    </form>
  );
}
