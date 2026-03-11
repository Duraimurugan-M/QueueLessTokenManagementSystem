import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import {
  MD_DEPARTMENTS,
  MD_DOCTORS,
  PATIENT_SLOTS,
  PATIENT_BOOK_TOKEN
} from "../../api/endpoints";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";

export default function BookTokenPage() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [patientDetails, setPatientDetails] = useState({
    name: user?.name || "",
    age: "",
    dob: "",
    reason: ""
  });

  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    setLoadingDepartments(true);
    api
      .get(MD_DEPARTMENTS)
      .then((res) => setDepartments(res.data || []))
      .catch(() => setDepartments([]))
      .finally(() => setLoadingDepartments(false));
  }, []);

  useEffect(() => {
    if (!selectedDepartment) return;
    setLoadingDoctors(true);
    api
      .get(MD_DOCTORS)
      .then((res) => {
        const all = res.data || [];
        const filtered = all.filter(
          (doc) => doc.department?._id === selectedDepartment || doc.department === selectedDepartment
        );
        setDoctors(filtered);
      })
      .catch(() => setDoctors([]))
      .finally(() => setLoadingDoctors(false));
  }, [selectedDepartment]);

  const fetchSlots = async () => {
    if (!selectedDoctor || !date) {
      toast.error("Select doctor and date first.");
      return;
    }
    setLoadingSlots(true);
    setSlots([]);
    setSelectedSlot(null);
    try {
      const res = await api.get(PATIENT_SLOTS, {
        params: { doctorId: selectedDoctor, date }
      });
      setSlots(res.data || []);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error("Please select a slot.");
      return;
    }
    setBooking(true);
    try {
      const payload = {
        scheduleId: selectedSlot.schedule || selectedSlot.scheduleId,
        slotId: selectedSlot._id,
        ...patientDetails
      };
      const res = await api.post(PATIENT_BOOK_TOKEN, payload);
      toast.success("Token booked successfully");
      addNotification({
        title: "Token booked",
        message: `Token #${res.data?.token?.tokenNumber ?? ""} booked successfully.`
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Unable to book token";
      toast.error(msg);
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-secondary">Book Token</h1>
      <form
        onSubmit={handleBook}
        className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
      >
        {/* Step 1: Department */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Step 1 · Select department
          </p>
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedDoctor("");
              setSlots([]);
              setSelectedSlot(null);
            }}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">{loadingDepartments ? "Loading..." : "Select department"}</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Doctor */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Step 2 · Select doctor
          </p>
          <select
            value={selectedDoctor}
            onChange={(e) => {
              setSelectedDoctor(e.target.value);
              setSlots([]);
              setSelectedSlot(null);
            }}
            disabled={!selectedDepartment || loadingDoctors}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none disabled:bg-slate-50 disabled:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">
              {!selectedDepartment
                ? "Select department first"
                : loadingDoctors
                  ? "Loading doctors..."
                  : "Select doctor"}
            </option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.user?.name || doc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Date */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Step 3 · Select date
          </p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={!selectedDoctor}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none disabled:bg-slate-50 disabled:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={fetchSlots}
            disabled={!selectedDoctor || !date || loadingSlots}
            className="mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loadingSlots ? "Fetching slots..." : "Check available slots"}
          </button>
        </div>

        {/* Step 4: Slots */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Step 4 · Choose time slot
          </p>
          {slots.length === 0 && !loadingSlots && (
            <p className="text-xs text-slate-500">
              No available slots yet for the selected date.
            </p>
          )}
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {slots.map((slot) => {
              const label = slot.slotTime || `${slot.start} - ${slot.end}`;
              const isSelected = selectedSlot?._id === slot._id;
              return (
                <button
                  type="button"
                  key={slot._id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 bg-slate-50 text-secondary hover:border-primary hover:bg-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 5: Patient details */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Step 5 · Patient details
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700">Name</label>
              <input
                type="text"
                value={patientDetails.name}
                onChange={(e) =>
                  setPatientDetails((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">Age</label>
              <input
                type="number"
                value={patientDetails.age}
                onChange={(e) =>
                  setPatientDetails((prev) => ({ ...prev, age: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">Date of birth</label>
              <input
                type="date"
                value={patientDetails.dob}
                onChange={(e) =>
                  setPatientDetails((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">Reason / symptoms</label>
              <input
                type="text"
                value={patientDetails.reason}
                onChange={(e) =>
                  setPatientDetails((prev) => ({ ...prev, reason: e.target.value }))
                }
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="e.g. Fever, headache"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={booking || !selectedSlot}
          className="mt-2 w-full rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {booking ? "Booking..." : "Book token"}
        </button>
      </form>
    </div>
  );
}

