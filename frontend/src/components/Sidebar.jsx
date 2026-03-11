import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaClinicMedical,
  FaChartBar,
  FaHistory,
  FaFilePrescription
} from "react-icons/fa";

const baseClasses =
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-teal-50 hover:text-primary";

export default function Sidebar() {
  const { role } = useAuth();

  const patientLinks = [
    { to: "/patient", label: "Dashboard", icon: FaTachometerAlt },
    { to: "/patient/book-token", label: "Book Token", icon: FaCalendarAlt },
    { to: "/patient/visit-history", label: "Visit History", icon: FaHistory },
    { to: "/patient/prescriptions", label: "Prescriptions", icon: FaFilePrescription },
    { to: "/patient/profile", label: "Profile", icon: FaUsers }
  ];

  const doctorLinks = [
    { to: "/doctor", label: "Dashboard", icon: FaTachometerAlt },
    { to: "/doctor/schedule", label: "Schedule", icon: FaCalendarAlt },
    { to: "/doctor/queue", label: "Patient Queue", icon: FaUsers },
    { to: "/doctor/appointments", label: "Appointments", icon: FaClinicMedical },
    { to: "/doctor/prescriptions", label: "Prescriptions", icon: FaFilePrescription }
  ];

  const mdLinks = [
    { to: "/md", label: "Analytics", icon: FaChartBar },
    { to: "/md/departments", label: "Departments", icon: FaClinicMedical },
    { to: "/md/doctors", label: "Doctors", icon: FaUserMd },
    { to: "/md/tokens", label: "Token Overview", icon: FaCalendarAlt }
  ];

  const linksByRole = {
    PATIENT: patientLinks,
    DOCTOR: doctorLinks,
    MD: mdLinks
  };

  const links = linksByRole[role] ?? [];

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white/80 px-3 py-4 md:block">
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/patient" || to === "/doctor" || to === "/md"}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? "bg-primary text-white hover:bg-primary/90" : "text-slate-600"}`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

