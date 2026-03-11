import React from "react";

const departments = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "ENT",
  "Dermatology"
];

export default function DepartmentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-secondary">Departments</h1>
      <p className="text-sm text-slate-600">
        QueueLess supports token-based appointment management across all major specialties.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {departments.map((dept) => (
          <div
            key={dept}
            className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-secondary shadow-sm"
          >
            {dept}
          </div>
        ))}
      </div>
    </div>
  );
}

