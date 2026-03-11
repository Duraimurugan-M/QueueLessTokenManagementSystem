import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { MD_DEPARTMENTS, MD_CREATE_DEPARTMENT } from "../../api/endpoints";

export default function MdDepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    api
      .get(MD_DEPARTMENTS)
      .then((res) => setDepartments(res.data || []))
      .catch(() => setDepartments([]));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await api.post(MD_CREATE_DEPARTMENT, { name });
      setDepartments((prev) => [...prev, res.data]);
      setName("");
      toast.success("Department created");
    } catch {
      toast.error("Unable to create department.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Manage Departments</h1>
      <form
        onSubmit={handleCreate}
        className="flex gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="New department name"
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
        >
          Create
        </button>
      </form>
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <ul className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          {departments.map((dept) => (
            <li
              key={dept._id}
              className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
            >
              {dept.name}
            </li>
          ))}
          {departments.length === 0 && (
            <li className="text-xs text-slate-500">No departments defined yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

