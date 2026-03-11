import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { PATIENT_VISIT_HISTORY } from "../../api/endpoints";

export default function VisitHistoryPage() {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    api
      .get(PATIENT_VISIT_HISTORY)
      .then((res) => setVisits(res.data || []))
      .catch(() => setVisits([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Visit History</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Doctor</th>
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {visits.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-slate-500">
                  No visits found.
                </td>
              </tr>
            )}
            {visits.map((visit) => (
              <tr key={visit._id}>
                <td className="px-4 py-2">{new Date(visit.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{visit.departmentName}</td>
                <td className="px-4 py-2">{visit.doctorName}</td>
                <td className="px-4 py-2">{visit.tokenNumber}</td>
                <td className="px-4 py-2 capitalize">{visit.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

