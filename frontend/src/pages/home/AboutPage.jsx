import React from "react";

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-secondary">About QueueLess Hospital</h1>
      <p className="text-sm text-slate-600">
        QueueLess Hospital combines compassionate care with digital efficiency. Our mission is to
        eliminate long waiting times, streamline outpatient services, and deliver a better
        experience for patients, doctors, and hospital management.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-secondary">Patient-first design</h2>
          <p className="mt-2 text-xs text-slate-600">
            Patients can book appointments online, track their token status, and access visit
            history from any device.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-secondary">Doctor productivity</h2>
          <p className="mt-2 text-xs text-slate-600">
            Doctors manage schedules, queues, and prescriptions in a single dashboard optimized for
            clinical workflows.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-secondary">Operational insight</h2>
          <p className="mt-2 text-xs text-slate-600">
            MDs and administrators get real-time analytics on patient volume, doctor utilization,
            and department performance.
          </p>
        </div>
      </div>
    </div>
  );
}

