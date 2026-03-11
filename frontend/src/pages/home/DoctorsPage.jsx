import React from "react";

const doctors = [
  { name: "Dr. Anitha Raj", dept: "General Medicine" },
  { name: "Dr. Karthik Menon", dept: "Cardiology" },
  { name: "Dr. Priya Nair", dept: "Pediatrics" },
  { name: "Dr. Rahul Sharma", dept: "Orthopedics" }
];

export default function DoctorsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-secondary">Our Doctors</h1>
      <p className="text-sm text-slate-600">
        Specialists across departments with token-driven consultation slots powered by QueueLess.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {doctors.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="text-sm font-semibold text-secondary">{doc.name}</p>
              <p className="text-xs text-slate-600">{doc.dept}</p>
            </div>
            <button className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700">
              Book token
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

