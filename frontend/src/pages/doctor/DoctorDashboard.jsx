import React from "react";

export default function DoctorDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Doctor Dashboard</h1>
      <p className="text-xs text-slate-600">
        View today&apos;s schedule, live patient queue, and quick access to appointments.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Today&apos;s appointments</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">—</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Patients in queue</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">—</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Completed today</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">—</p>
        </div>
      </div>
    </div>
  );
}

