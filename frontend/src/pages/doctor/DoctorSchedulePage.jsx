import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import api from "../../api/axios";
import { DOCTOR_GET_SCHEDULE } from "../../api/endpoints";

export default function DoctorSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSchedule = async (date) => {
    setLoading(true);
    setSchedule(null);
    try {
      const iso = date.toISOString().slice(0, 10);
      const res = await api.get(DOCTOR_GET_SCHEDULE, { params: { date: iso } });
      setSchedule(res.data && !res.data.message ? res.data : null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule(selectedDate);
  }, [selectedDate]);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Schedule calendar</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
          <Calendar
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full border-0 text-xs"
          />
        </div>
        <div className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-600">
            {selectedDate.toLocaleDateString()}
          </p>
          {loading && <p className="text-xs text-slate-500">Loading schedule...</p>}
          {!loading && !schedule && (
            <p className="text-xs text-slate-500">No schedule defined for this date.</p>
          )}
          {schedule && (
            <div className="space-y-1 text-xs text-slate-700">
              <p className="font-semibold text-secondary">
                {new Date(schedule.date).toLocaleDateString()}
              </p>
              <p>
                Slots: {schedule.slots?.length ?? 0}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

