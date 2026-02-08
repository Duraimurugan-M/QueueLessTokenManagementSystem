const Schedule = require("../models/Schedule");
const Doctor = require("../models/Doctor");
const Token = require("../models/Token");
const Prescription = require("../models/Prescription");

// 1️⃣ VIEW AVAILABLE SLOTS
exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    const schedule = await Schedule.findOne({
      doctor: doctorId,
      date
    });

    if (!schedule) {
      return res.status(404).json({ message: "No schedule found" });
    }

    const availableSlots = schedule.slots.filter(
      slot => slot.status === "AVAILABLE"
    );

    res.json(availableSlots);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ BOOK SLOT
exports.bookToken = async (req, res) => {
  try {
    const patientId = req.user.id;
    const {
      scheduleId,
      slotId,
      name,
      age,
      dob,
      reason
    } = req.body;

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const slot = schedule.slots.id(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.status !== "AVAILABLE") {
      return res.status(400).json({ message: "Slot already booked or cancelled" });
    }

    // LOCK SLOT
    slot.status = "BOOKED";
    await schedule.save();

    const token = await Token.create({
      schedule: schedule._id,
      slotId,
      doctor: schedule.doctor,
      patient: patientId,
      patientDetails: { name, age, dob, reason },
      tokenNumber: slot.tokenNumber,
      slotTime: `${slot.start} - ${slot.end}`
    });

    res.status(201).json({
      message: "Token booked successfully",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ CANCEL TOKEN
exports.cancelToken = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { tokenId } = req.params;

    const token = await Token.findOne({
      _id: tokenId,
      patient: patientId
    });

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    token.status = "CANCELLED";
    await token.save();

    const schedule = await Schedule.findById(token.schedule);
    const slot = schedule.slots.id(token.slotId);

    if (slot) {
      slot.status = "CANCELLED";
      await schedule.save();
    }

    res.json({ message: "Token cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPatientVisitHistory = async (req, res) => {
  try {
    const patientId = req.user.id;

    const visits = await Token.find({ patient: patientId })
      .sort({ createdAt: -1 })
      .populate({
        path: "doctor",
        populate: [
          {
            path: "user",
            model: "User",
            select: "name"
          },
          {
            path: "department",
            model: "Department",
            select: "name"
          }
        ]
      });

    const visitHistory = await Promise.all(
      visits.map(async (visit) => {
        const prescription = await Prescription.findOne({
          token: visit._id
        });

        return {
          visitId: visit._id,
          tokenNumber: visit.tokenNumber,
          slotTime: visit.slotTime,
          status: visit.status,
          date: visit.createdAt,
          doctor: visit.doctor?.user?.name || "N/A",
          department: visit.doctor?.department?.name || "N/A",
          prescriptionId: prescription ? prescription._id : null
        };
      })
    );

    res.json({
      message: "Patient visit history fetched successfully",
      visits: visitHistory
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching visit history",
      error: error.message
    });
  }
};
