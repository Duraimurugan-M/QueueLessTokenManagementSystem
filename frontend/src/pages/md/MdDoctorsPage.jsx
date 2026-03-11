import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { MD_DOCTORS, MD_CREATE_DOCTOR } from "../../api/endpoints";

export default function MdDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    departmentId: ""
  });

  useEffect(() => {
    api
      .get(MD_DOCTORS)
      .then((res) => setDoctors(res.data || []))
      .catch(() => setDoctors([]));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(MD_CREATE_DOCTOR, form);
      setDoctors((prev) => [...prev, res.data]);
      setForm({ name: "", email: "", departmentId: "" });
      toast.success("Doctor created");
    } catch {
      toast.error("Unable to create doctor.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Manage Doctors</h1>
      <form
        onSubmit={handleCreate}
        className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-slate-700">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700">Department ID</label>
            <input
              name="departmentId"
              type="text"
              value={form.departmentId}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
        >
          Create doctor
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Department</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {doctors.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-slate-500">
                  No doctors available.
                </td>
              </tr>
            )}
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td className="px-4 py-2">{doc.name}</td>
                <td className="px-4 py-2">{doc.email}</td>
                <td className="px-4 py-2">{doc.departmentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

