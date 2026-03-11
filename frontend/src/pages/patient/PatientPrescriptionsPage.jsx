import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { PRESCRIPTION_DOWNLOAD_PDF } from "../../api/endpoints";

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    api
      .get("/prescriptions")
      .then((res) => setPrescriptions(res.data || []))
      .catch(() => setPrescriptions([]));
  }, []);

  const handleDownload = async (id) => {
    try {
      const res = await api.get(PRESCRIPTION_DOWNLOAD_PDF(id), { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "prescription.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Prescription downloaded");
    } catch (err) {
      toast.error("Unable to download prescription PDF.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Prescriptions</h1>
      <div className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        {prescriptions.length === 0 && (
          <p className="text-xs text-slate-600">No prescriptions available yet.</p>
        )}
        <ul className="space-y-2 text-xs text-slate-700">
          {prescriptions.map((p) => (
            <li
              key={p._id}
              className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
            >
              <div>
                <p className="font-semibold text-secondary">{p.doctorName}</p>
                <p className="text-slate-600">
                  {new Date(p.date).toLocaleDateString()} · {p.departmentName}
                </p>
              </div>
              <button
                onClick={() => handleDownload(p._id)}
                className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700"
              >
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

