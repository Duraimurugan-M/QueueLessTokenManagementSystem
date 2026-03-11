import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar showPublicNav={false} onToggleSidebar={() => setMobileOpen(true)} />

      <div className="mx-auto flex max-w-6xl gap-4 px-4 py-4 lg:px-0">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="w-64 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-3 py-3">
                <span className="text-sm font-semibold text-secondary">Menu</span>
                <button
                  type="button"
                  className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="p-3">
                <Sidebar />
              </div>
            </div>
            <div
              className="flex-1 bg-black/40"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
          </div>
        )}

        <main className="flex-1">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
