import React, { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import { FaBell } from "react-icons/fa";

export default function NotificationBell() {
  const { notifications, markAllRead, clearNotifications } = useNotifications();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      >
        <FaBell className="h-3.5 w-3.5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-64 rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <span className="text-xs font-semibold text-secondary">Notifications</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={markAllRead}
                className="text-[10px] text-primary hover:underline"
              >
                Mark read
              </button>
              <button
                type="button"
                onClick={clearNotifications}
                className="text-[10px] text-slate-500 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto py-1 text-xs text-slate-700">
            {notifications.length === 0 && (
              <p className="px-3 py-2 text-[11px] text-slate-500">No notifications yet.</p>
            )}
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`px-3 py-2 ${n.read ? "bg-white" : "bg-slate-50"} border-b border-slate-50 last:border-b-0`}
              >
                <p className="font-medium text-secondary">{n.title}</p>
                {n.message && <p className="text-[11px] text-slate-600">{n.message}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

