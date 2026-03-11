import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { DOCTOR_QUEUE, DOCTOR_COMPLETE_TOKEN } from "../../api/endpoints";

export default function DoctorQueuePage() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    api
      .get(DOCTOR_QUEUE)
      .then((res) => setQueue(res.data || []))
      .catch(() => setQueue([]));
  }, []);

  const completeToken = async (tokenId) => {
    try {
      await api.patch(DOCTOR_COMPLETE_TOKEN(tokenId));
      setQueue((prev) => prev.filter((item) => item._id !== tokenId));
      toast.success("Consultation marked as complete");
    } catch {
      toast.error("Unable to complete token. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Patient Queue</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {queue.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-slate-500">
                  No patients in the queue.
                </td>
              </tr>
            )}
            {queue.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{item.tokenNumber}</td>
                <td className="px-4 py-2">{item.patientName}</td>
                <td className="px-4 py-2">{item.departmentName}</td>
                <td className="px-4 py-2 capitalize">{item.status}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => completeToken(item._id)}
                    className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

