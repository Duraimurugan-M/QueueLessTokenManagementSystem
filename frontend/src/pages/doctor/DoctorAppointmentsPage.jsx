import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/appointments")
      .then((res) => setAppointments(res.data || []))
      .catch(() => setAppointments([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Appointments</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {appointments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-slate-500">
                  No appointments found.
                </td>
              </tr>
            )}
            {appointments.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{new Date(item.date).toLocaleString()}</td>
                <td className="px-4 py-2">{item.patientName}</td>
                <td className="px-4 py-2">{item.tokenNumber}</td>
                <td className="px-4 py-2 capitalize">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

