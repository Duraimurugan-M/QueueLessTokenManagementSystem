import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function PatientProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Profile</h1>
      <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm text-sm text-slate-700">
        <p>
          <span className="font-semibold text-secondary">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold text-secondary">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold text-secondary">Mobile:</span> {user.mobile}
        </p>
      </div>
    </div>
  );
}

