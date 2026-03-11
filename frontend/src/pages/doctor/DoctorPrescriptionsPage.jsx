import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/prescriptions")
      .then((res) => setPrescriptions(res.data || []))
      .catch(() => setPrescriptions([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Prescriptions</h1>
      <div className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        {prescriptions.length === 0 && (
          <p className="text-xs text-slate-600">No prescriptions created yet.</p>
        )}
        <ul className="space-y-2 text-xs text-slate-700">
          {prescriptions.map((p) => (
            <li
              key={p._id}
              className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
            >
              <div>
                <p className="font-semibold text-secondary">{p.patientName}</p>
                <p className="text-slate-600">
                  {new Date(p.date).toLocaleDateString()} · {p.departmentName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

