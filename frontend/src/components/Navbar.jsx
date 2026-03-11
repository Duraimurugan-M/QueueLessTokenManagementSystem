import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";

export default function Navbar({ showPublicNav = true, onToggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-0">
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden"
              onClick={onToggleSidebar}
            >
              <FaBars className="h-4 w-4" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="QueueLess logo" className="h-8 w-8 rounded-md object-contain" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-secondary">QueueLess</span>
              <span className="text-xs text-slate-500">Hospital Token System</span>
            </div>
          </Link>
        </div>

        {showPublicNav && (
          <nav className="hidden flex-1 items-center justify-center gap-4 text-xs font-medium text-slate-600 md:flex">
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "hover:text-primary")}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-primary" : "hover:text-primary")}>
              About
            </NavLink>
            <NavLink
              to="/departments"
              className={({ isActive }) => (isActive ? "text-primary" : "hover:text-primary")}
            >
              Departments
            </NavLink>
            <NavLink to="/doctors" className={({ isActive }) => (isActive ? "text-primary" : "hover:text-primary")}>
              Doctors
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "text-primary" : "hover:text-primary")}>
              Services
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-primary" : "hover:text-primary")}>
              Contact
            </NavLink>
          </nav>
        )}

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <NotificationBell />
          {user ? (
            <>
              <span className="hidden text-xs font-medium text-slate-600 sm:inline">
                {user.name} &middot;{" "}
                <span className="uppercase text-primary">{user.role}</span>
              </span>
              <button
                onClick={logout}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-3 py-1 text-xs font-medium text-slate-600 hover:text-primary"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-teal-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

