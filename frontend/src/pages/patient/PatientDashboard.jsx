import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { DOCTOR_QUEUE, TOKEN_MY_ALL } from "../../api/endpoints";
import { useAuth } from "../../context/AuthContext";
import { QRCodeSVG } from "qrcode.react";

export default function PatientDashboard() {
  const { user } = useAuth();
  const [tokens, setTokens] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    api
      .get(TOKEN_MY_ALL)
      .then((res) => setTokens(res.data || []))
      .catch(() => setTokens([]));
  }, []);

  useEffect(() => {
    // Queue endpoint currently doctor-protected; this call will work once backend exposes
    // a patient-safe view or is proxied appropriately.
    api
      .get(DOCTOR_QUEUE)
      .then((res) => setQueue(res.data || []))
      .catch(() => setQueue([]));
  }, []);

  const latestToken = useMemo(() => {
    if (!tokens || tokens.length === 0) return null;
    return tokens[0];
  }, [tokens]);

  const queueInfo = useMemo(() => {
    if (!latestToken || !queue || queue.length === 0) {
      return null;
    }
    const myTokenNumber = latestToken.tokenNumber;
    const nowServing = queue[0]?.tokenNumber ?? null;
    const peopleAhead = queue.filter((t) => t.tokenNumber < myTokenNumber).length;
    const estimatedMinutes = peopleAhead * 10;
    return {
      myTokenNumber,
      nowServing,
      peopleAhead,
      estimatedMinutes
    };
  }, [latestToken, queue]);

  const qrValue = latestToken
    ? JSON.stringify({
        tokenNumber: latestToken.tokenNumber,
        doctor: latestToken.doctorName || latestToken.doctor,
        slotTime: latestToken.slotTime
      })
    : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-lg font-semibold text-secondary">Patient Dashboard</h1>
          <p className="text-xs text-slate-600">
            View your tokens, live queue position, and digital QR for check-in.
          </p>
        </div>
        <Link
          to="/patient/book-token"
          className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
        >
          Book new token
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Next token</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">
            {latestToken ? `#${latestToken.tokenNumber}` : "—"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {latestToken ? latestToken.slotTime : "Book a token to see details here."}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Total visits</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">
            {tokens ? tokens.length : "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Prescriptions</p>
          <p className="mt-2 text-2xl font-semibold text-secondary">—</p>
        </div>
      </div>

      {queueInfo && (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
            <p className="text-[11px] font-medium text-slate-500">Your token</p>
            <p className="mt-1 text-xl font-semibold text-secondary">#{queueInfo.myTokenNumber}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
            <p className="text-[11px] font-medium text-slate-500">Now serving</p>
            <p className="mt-1 text-xl font-semibold text-secondary">
              {queueInfo.nowServing ? `#${queueInfo.nowServing}` : "—"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
            <p className="text-[11px] font-medium text-slate-500">People ahead</p>
            <p className="mt-1 text-xl font-semibold text-secondary">
              {queueInfo.peopleAhead}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
            <p className="text-[11px] font-medium text-slate-500">Est. waiting time</p>
            <p className="mt-1 text-xl font-semibold text-secondary">
              {queueInfo.estimatedMinutes} min
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-secondary">Upcoming tokens</h2>
            <Link to="/patient/visit-history" className="text-xs font-semibold text-primary">
              View all
            </Link>
          </div>
          {tokens && tokens.length > 0 ? (
            <ul className="space-y-1 text-xs text-slate-700">
              {tokens.slice(0, 3).map((t) => (
                <li key={t._id} className="flex items-center justify-between">
                  <span className="font-medium text-secondary">#{t.tokenNumber}</span>
                  <span className="text-slate-600">{t.slotTime}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-600">Your upcoming tokens will appear here.</p>
          )}
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-secondary">Quick actions</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              to="/patient/book-token"
              className="rounded-full bg-primary px-3 py-1 font-semibold text-white hover:bg-teal-700"
            >
              Book token
            </Link>
            <Link
              to="/patient/visit-history"
              className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-secondary hover:bg-slate-50"
            >
              Visit history
            </Link>
            <Link
              to="/patient/prescriptions"
              className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-secondary hover:bg-slate-50"
            >
              Prescriptions
            </Link>
          </div>

          {qrValue && (
            <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-3">
              <p className="text-[11px] font-medium text-secondary">
                QR for latest token (scan at hospital)
              </p>
              <QRCodeSVG value={qrValue} size={96} bgColor="#f9fafb" fgColor="#0f766e" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

