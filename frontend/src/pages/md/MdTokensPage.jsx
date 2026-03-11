import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { ANALYTICS_MD_TODAY } from "../../api/endpoints";

export default function MdTokensPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get(ANALYTICS_MD_TODAY)
      .then((res) => setStats(res.data))
      .catch(() => setStats(null));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Token Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Total tokens today</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">
            {stats?.todayTotal ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Completed</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">
            {stats?.todayCompleted ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Cancelled</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">
            {stats?.todayCancelled ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

