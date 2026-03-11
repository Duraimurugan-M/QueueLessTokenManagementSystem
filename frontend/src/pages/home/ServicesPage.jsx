import React from "react";

export default function ServicesPage() {
  const services = [
    {
      title: "Online Appointment Booking",
      desc: "Patients select doctor, department, and time slot without visiting the hospital."
    },
    {
      title: "Token Queue Management",
      desc: "Real-time token numbers and queue updates for patients and staff."
    },
    {
      title: "Digital Prescriptions",
      desc: "Secure PDF prescriptions generated and emailed after consultation."
    },
    {
      title: "Doctor Scheduling",
      desc: "Doctors define working hours and slot capacity per session."
    }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-secondary">Services</h1>
      <p className="text-sm text-slate-600">
        QueueLess complements your clinical services with digital workflows that save time at every
        step.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-secondary">{service.title}</h2>
            <p className="mt-2 text-xs text-slate-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

