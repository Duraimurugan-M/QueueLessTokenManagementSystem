import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ emailOrMobile: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login({
        emailOrMobile: form.emailOrMobile,
        password: form.password
      });
      if (user.role === "PATIENT") navigate("/patient");
      else if (user.role === "DOCTOR") navigate("/doctor");
      else if (user.role === "MD") navigate("/md");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-center gap-2">
        <img src={logo} alt="QueueLess logo" className="h-8 w-8 rounded-md object-contain" />
        <span className="text-sm font-semibold text-secondary">QueueLess Hospital</span>
      </div>
      <h1 className="text-lg font-semibold text-secondary">Login to QueueLess</h1>
      <p className="mt-1 text-xs text-slate-600">
        Access your patient, doctor, or MD dashboard with a single account.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-700">Email or Mobile</label>
          <input
            name="emailOrMobile"
            type="text"
            required
            value={form.emailOrMobile}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="you@example.com or 98765XXXXX"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700">Password</label>
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-slate-600">
        New patient?{" "}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

