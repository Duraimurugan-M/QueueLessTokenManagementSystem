import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import api from "../../api/axios";
import { ANALYTICS_MD_TODAY, ANALYTICS_DOCTOR_TODAY } from "../../api/endpoints";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function MdDashboard() {
  const [mdStats, setMdStats] = useState(null);
  const [doctorStats, setDoctorStats] = useState(null);

  useEffect(() => {
    api
      .get(ANALYTICS_MD_TODAY)
      .then((res) => setMdStats(res.data?.data || null))
      .catch(() => setMdStats(null));
    api
      .get(ANALYTICS_DOCTOR_TODAY)
      .then((res) => setDoctorStats(res.data?.data || null))
      .catch(() => setDoctorStats(null));
  }, []);

  const pieData = {
    labels: mdStats?.departments?.map((d) => d.name) || [],
    datasets: [
      {
        data: mdStats?.departments?.map((d) => d.count) || [],
        backgroundColor: ["#0f766e", "#10b981", "#1e293b", "#38bdf8", "#f97316"]
      }
    ]
  };

  const lineData = {
    labels: mdStats?.daily?.map((d) => d.label) || [],
    datasets: [
      {
        label: "Visits",
        data: mdStats?.daily?.map((d) => d.count) || [],
        borderColor: "#0f766e",
        backgroundColor: "rgba(15, 118, 110, 0.1)",
        tension: 0.4
      }
    ]
  };

  const barData = {
    labels: doctorStats?.doctors?.map((d) => d.name) || [],
    datasets: [
      {
        label: "Tokens",
        data: doctorStats?.doctors?.map((d) => d.totalTokens) || [],
        backgroundColor: "#10b981"
      }
    ]
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">MD Dashboard</h1>
      <p className="text-xs text-slate-600">
        High-level overview of hospital performance, patient volume, and department utilization.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Today&apos;s patients</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">
            {mdStats?.totalTokens ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Completed</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">
            {mdStats?.completedTokens ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Cancelled</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">
            {mdStats?.cancelledTokens ?? "—"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-secondary">Patients per department</h2>
          {pieData.labels.length > 0 ? (
            <Pie data={pieData} />
          ) : (
            <p className="text-xs text-slate-500">No department data available.</p>
          )}
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-secondary">Daily patient visits</h2>
          {lineData.labels.length > 0 ? (
            <Line
              data={lineData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { ticks: { stepSize: 5 } } }
              }}
            />
          ) : (
            <p className="text-xs text-slate-500">No daily data available.</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-secondary">Doctor performance</h2>
        {barData.labels.length > 0 ? (
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } }
            }}
          />
        ) : (
          <p className="text-xs text-slate-500">No doctor analytics available.</p>
        )}
      </div>
    </div>
  );
}

