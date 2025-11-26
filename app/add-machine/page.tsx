"use client";
import MachineForm from "@/components/MachineForm";

export default function AddMachinePage() {
  return (
    <div>
        <main className="lg:col-span-5 m-10 ">
          <h2 className="text-2xl font-semibold mb-4">Add Machine</h2>
          <MachineForm mode="create" />
        </main>
      </div>
  );
}
