import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaClock, FaFileMedical, FaUserMd } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="grid gap-10 rounded-3xl bg-gradient-to-r from-primary to-secondary px-6 py-10 text-white md:grid-cols-2 lg:px-10">
        <div className="space-y-6">
          <p className="inline rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            QueueLess · Digital Hospital Experience
          </p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Eliminate waiting rooms with{" "}
            <span className="text-accent">smart token-based appointments.</span>
          </h1>
          <p className="text-sm text-slate-100 md:text-base">
            QueueLess helps hospitals manage patient flow, doctor schedules, and prescriptions
            through a single, unified platform. Patients book online while doctors consult in a
            structured, token-driven queue.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-secondary shadow-sm hover:bg-emerald-400"
            >
              Book Appointment
            </Link>
            <Link
              to="/features"
              className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Explore QueueLess
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 pt-4 text-xs text-slate-100">
            <div>
              <p className="text-lg font-semibold">50%</p>
              <p>Average reduction in waiting time</p>
            </div>
            <div>
              <p className="text-lg font-semibold">3x</p>
              <p>Faster patient onboarding</p>
            </div>
            <div>
              <p className="text-lg font-semibold">24/7</p>
              <p>Online appointment access</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs font-semibold text-accent">LIVE QUEUE</p>
            <p className="mt-2 text-sm font-medium">Outpatient Department · Today</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center justify-between">
                <span>#12 · General Medicine</span>
                <span className="text-xs text-slate-100">In consultation</span>
              </li>
              <li className="flex items-center justify-between">
                <span>#13 · Pediatrics</span>
                <span className="text-xs text-slate-100">Waiting</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-semibold text-accent">SMART SCHEDULES</p>
              <p className="mt-2 text-sm">
                Doctors manage availability and appointment slots in real time.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-semibold text-accent">DIGITAL PRESCRIPTIONS</p>
              <p className="mt-2 text-sm">Patients receive secure, downloadable PDF prescriptions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-secondary">Our Hospital Services</h2>
        <p className="max-w-2xl text-sm text-slate-600">
          Comprehensive outpatient and inpatient care with digital-first patient management.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Outpatient Care",
              desc: "Token-based OPD appointments ensure smooth patient flow and minimal waiting."
            },
            {
              title: "Speciality Clinics",
              desc: "Dedicated schedules for cardiology, pediatrics, orthopedics, and more."
            },
            {
              title: "Emergency Support",
              desc: "Fast triage and prioritized consultation for emergency cases."
            }
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-secondary">{card.title}</h3>
              <p className="mt-2 text-xs text-slate-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors & Departments */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-secondary">
            <FaUserMd className="text-primary" />
            Our Doctors
          </h2>
          <p className="text-xs text-slate-600">
            Experienced consultants across multiple specialties with structured consultation slots.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li>· General Medicine · 6 senior consultants</li>
            <li>· Pediatrics · 4 senior consultants</li>
            <li>· Orthopedics · 3 senior consultants</li>
          </ul>
          <Link to="/doctors" className="text-xs font-semibold text-primary hover:underline">
            View all doctors
          </Link>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-secondary">
            <FaFileMedical className="text-primary" />
            Departments
          </h2>
          <p className="text-xs text-slate-600">
            QueueLess powers digital token management across all major hospital departments.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
            <span>Cardiology</span>
            <span>Neurology</span>
            <span>Orthopedics</span>
            <span>Pediatrics</span>
            <span>General Medicine</span>
            <span>ENT</span>
          </div>
          <Link to="/departments" className="text-xs font-semibold text-primary hover:underline">
            Explore departments
          </Link>
        </div>
      </section>

      {/* QueueLess Features */}
      <section className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-secondary">Why QueueLess?</h2>
            <p className="mt-1 text-xs text-slate-600">
              A digital layer on top of your hospital operations to orchestrate appointments,
              queues, and prescriptions.
            </p>
          </div>
          <Link
            to="/features"
            className="hidden rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-white sm:inline-block"
          >
            View all features
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              icon: FaClock,
              title: "Real-time queue",
              desc: "Patients see live token status and expected consultation time."
            },
            {
              icon: FaCheckCircle,
              title: "Role-based portals",
              desc: "Separate dashboards for MD, doctors, and patients."
            },
            {
              icon: FaFileMedical,
              title: "Digital prescriptions",
              desc: "Secure PDFs generated and shared after each visit."
            },
            {
              icon: FaChartBar,
              title: "Analytics",
              desc: "MD dashboard for utilization and performance insights."
            }
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="space-y-2 rounded-xl bg-slate-50 p-3">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="text-xs font-semibold text-secondary">{title}</h3>
              <p className="text-xs text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

