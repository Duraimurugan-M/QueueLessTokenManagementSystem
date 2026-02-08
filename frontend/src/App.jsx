import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

function DashboardHome() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="bg-white p-4 rounded shadow">Today Appointments</div>
      <div className="bg-white p-4 rounded shadow">Active Queue</div>
      <div className="bg-white p-4 rounded shadow">Completed</div>
      <div className="bg-white p-4 rounded shadow">Pending</div>
    </div>
  );
}

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/schedule" element={<div>Schedule Page</div>} />
        <Route path="/queue" element={<div>Queue Page</div>} />
        <Route path="/patients" element={<div>Patients Page</div>} />
      </Routes>
    </DashboardLayout>
  );
}
