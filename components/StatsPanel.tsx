"use client";

import { Machine } from "../types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#8B5CF6", "#E9D8FD", "#6527f4"]; 
const BAR_COLOR = "#8B5CF6";

export default function StatsPanel({ machines }: { machines: Machine[] }) {
  const total = machines.length;
  const running = machines.filter((m) => m.status === "Running").length;
  const stopped = machines.filter((m) => m.status === "Stopped").length;
  const idle = total - (running + stopped);

  const avgTemp = total
    ? +(machines.reduce((s, m) => s + m.temperature, 0) / total).toFixed(1)
    : 0;

  const totalEnergy = machines.reduce((s, m) => s + m.energyConsumption, 0);

  const pieData = [
    { name: "Running", value: running },
    { name: "Idle", value: idle },
    { name: "Stopped", value: stopped },
  ];

  const barData = machines.map((m) => ({
    name: m.name.length > 10 ? m.name.slice(0, 10) + "…" : m.name,
    energy: m.energyConsumption,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* PIE CARD */}
      <div className="p-3 bg-white/80 backdrop-blur rounded-xl shadow-sm">
        <div className="text-xs text-gray-500 mb-1">Machine Status</div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-[11px] text-gray-600">Total Machines</div>
          </div>

          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={20}
                  outerRadius={35}
                  paddingAngle={3}
                >
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex gap-3 text-[11px] text-gray-700 mt-1">
          <div className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: COLORS[0] }}
            ></span>
            Running: {running}
          </div>

          <div className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: COLORS[1] }}
            ></span>
            Idle: {idle}
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: COLORS[2] }}
            ></span>
            Stopped: {stopped}
          </div>
        </div>
      </div>

      {/* TEMP CARD */}
      <div className="p-3 bg-white/80 backdrop-blur rounded-xl shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Avg Temperature (°C)</div>
            <div className="text-2xl font-bold mt-1">{avgTemp}</div>
          </div>
        </div>

        {/* Sparkline With Tooltip */}
        <div className="mt-3">
          <div className="text-[11px] text-gray-500 mb-1">
            Energy Trend (kWh)
          </div>

          <div className="w-full h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={machines.map((m) => ({
                  name: m.name,
                  energy: m.energyConsumption,
                }))}
              >
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "energy") return [`${value} kWh`, "Energy"];
                    return value;
                  }}
                  labelFormatter={(label) => `Machine: ${label}`}
                  contentStyle={{
                    background: "white",
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-gray-600 mt-1">
            Total Energy:{" "}
            <span className="font-semibold">{totalEnergy} kWh</span>
          </div>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="p-3 bg-white/80 backdrop-blur rounded-xl shadow-sm">
        <div className="text-xs text-gray-500">Energy by Machine</div>

        <div className="mt-2 w-full overflow-x-auto">
          <div
            className="h-40"
            style={{
              width: Math.max(barData.length * 70, 300),
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#666" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />

                <YAxis
                  tick={{ fontSize: 10, fill: "#666" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "white",
                    borderRadius: "8px",
                    border: "1px solid #eee",
                    fontSize: "12px",
                  }}
                />

                <Bar
                  dataKey="energy"
                  fill={BAR_COLOR}
                  barSize={35} 
                  radius={[8, 8, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
