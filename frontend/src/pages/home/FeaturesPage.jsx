import React from "react";
import { FaBell, FaChartLine, FaClock, FaFilePdf, FaShieldAlt, FaUsersCog } from "react-icons/fa";

const features = [
  {
    icon: FaClock,
    title: "Token-based appointments",
    desc: "Patients receive token numbers instead of waiting in physical queues."
  },
  {
    icon: FaUsersCog,
    title: "Role-based access",
    desc: "Dedicated portals for MD, doctors, and patients with tailored features."
  },
  {
    icon: FaBell,
    title: "Email notifications",
    desc: "Booking confirmation, cancellation alerts, and password resets via email."
  },
  {
    icon: FaFilePdf,
    title: "PDF prescriptions",
    desc: "Consultations generate professional PDF prescriptions for patients."
  },
  {
    icon: FaChartLine,
    title: "Analytics dashboard",
    desc: "MDs track patient volume, utilization, and department performance."
  },
  {
    icon: FaShieldAlt,
    title: "Secure authentication",
    desc: "JWT-based auth with password reset flows and protected APIs."
  }
];

export default function FeaturesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-secondary">Features of QueueLess</h1>
      <p className="text-sm text-slate-600">
        Designed for modern hospitals to orchestrate patient flow, doctor schedules, and
        prescriptions at scale.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <Icon className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold text-secondary">{title}</h2>
            <p className="text-xs text-slate-600">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

