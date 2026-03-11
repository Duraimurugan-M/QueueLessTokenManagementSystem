import React from "react";

export default function ContactPage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-secondary">Contact Us</h1>
        <p className="text-sm text-slate-600">
          Reach out to the QueueLess Hospital team for appointments, support, or partnership
          enquiries.
        </p>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-secondary">Address:</span> 123 Healthcare Avenue,
            City, State
          </p>
          <p>
            <span className="font-semibold text-secondary">Phone:</span> +91-00000-00000
          </p>
          <p>
            <span className="font-semibold text-secondary">Email:</span> hello@queuelesshospital.com
          </p>
        </div>
      </div>
      <form className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div>
          <label className="block text-xs font-medium text-slate-700">Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700">Message</label>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="How can we help you?"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Submit enquiry
        </button>
      </form>
    </div>
  );
}

