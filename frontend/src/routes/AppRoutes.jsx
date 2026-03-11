import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import HomePage from "../pages/home/HomePage";
import AboutPage from "../pages/home/AboutPage";
import DepartmentsPage from "../pages/home/DepartmentsPage";
import DoctorsPage from "../pages/home/DoctorsPage";
import ServicesPage from "../pages/home/ServicesPage";
import FeaturesPage from "../pages/home/FeaturesPage";
import ContactPage from "../pages/home/ContactPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import PatientDashboard from "../pages/patient/PatientDashboard";
import BookTokenPage from "../pages/patient/BookTokenPage";
import VisitHistoryPage from "../pages/patient/VisitHistoryPage";
import PatientPrescriptionsPage from "../pages/patient/PatientPrescriptionsPage";
import PatientProfilePage from "../pages/patient/PatientProfilePage";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorSchedulePage from "../pages/doctor/DoctorSchedulePage";
import DoctorQueuePage from "../pages/doctor/DoctorQueuePage";
import DoctorAppointmentsPage from "../pages/doctor/DoctorAppointmentsPage";
import DoctorPrescriptionsPage from "../pages/doctor/DoctorPrescriptionsPage";

import MdDashboard from "../pages/md/MdDashboard";
import MdDepartmentsPage from "../pages/md/MdDepartmentsPage";
import MdDoctorsPage from "../pages/md/MdDoctorsPage";
import MdTokensPage from "../pages/md/MdTokensPage";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-0">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Patient */}
      <Route element={<ProtectedRoute allowedRoles={["PATIENT"]} />}>
        <Route
          path="/patient/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route index element={<PatientDashboard />} />
                <Route path="book-token" element={<BookTokenPage />} />
                <Route path="visit-history" element={<VisitHistoryPage />} />
                <Route path="prescriptions" element={<PatientPrescriptionsPage />} />
                <Route path="profile" element={<PatientProfilePage />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Route>

      {/* Doctor */}
      <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
        <Route
          path="/doctor/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route index element={<DoctorDashboard />} />
                <Route path="schedule" element={<DoctorSchedulePage />} />
                <Route path="queue" element={<DoctorQueuePage />} />
                <Route path="appointments" element={<DoctorAppointmentsPage />} />
                <Route path="prescriptions" element={<DoctorPrescriptionsPage />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Route>

      {/* MD */}
      <Route element={<ProtectedRoute allowedRoles={["MD"]} />}>
        <Route
          path="/md/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route index element={<MdDashboard />} />
                <Route path="departments" element={<MdDepartmentsPage />} />
                <Route path="doctors" element={<MdDoctorsPage />} />
                <Route path="tokens" element={<MdTokensPage />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
}
