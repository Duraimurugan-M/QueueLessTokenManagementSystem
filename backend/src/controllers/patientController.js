const Schedule = require("../models/Schedule");
const Doctor = require("../models/Doctor");
const Token = require("../models/Token");
const Prescription = require("../models/Prescription");

// 1️⃣ VIEW AVAILABLE SLOTS
exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ message: "Doctor ID and date are required" });
    }

    // Convert date string to Date object for comparison
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const nextDate = new Date(dateObj);
    nextDate.setDate(nextDate.getDate() + 1);

    const schedule = await Schedule.findOne({
      doctor: doctorId,
      date: { $gte: dateObj, $lt: nextDate }
    });

    if (!schedule) {
      return res.status(404).json({ message: "No schedule found for this date" });
    }

    const availableSlots = schedule.slots.filter(
      slot => slot.status === "AVAILABLE"
    );

    res.json(availableSlots);

  } catch (error) {
    console.error("Get available slots error:", error);
    res.status(500).json({ message: "Server error fetching slots" });
  }
};

// 2️⃣ BOOK SLOT
exports.bookToken = async (req, res) => {
  try {
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(401).json({ message: "Unauthorized: patient ID missing" });
    }

    const {
      scheduleId,
      slotId,
      name,
      age,
      dob,
      reason
    } = req.body;

    if (!scheduleId || !slotId || !name || !age) {
      return res.status(400).json({ message: "Schedule, slot, name, and age are required" });
    }

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const slot = schedule.slots.id(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found in schedule" });
    }

    if (slot.status !== "AVAILABLE") {
      return res.status(409).json({ message: "Slot is no longer available" });
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

    if (!token) {
      return res.status(500).json({ message: "Failed to create token" });
    }

    res.status(201).json({
      message: "Token booked successfully",
      token
    });

  } catch (error) {
    console.error("Book token error:", error);
    res.status(500).json({ message: "Server error booking token" });
  }
};

// 3️⃣ CANCEL TOKEN
exports.cancelToken = async (req, res) => {
  try {
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(401).json({ message: "Unauthorized: patient ID missing" });
    }

    const { tokenId } = req.params;
    if (!tokenId) {
      return res.status(400).json({ message: "Token ID is required" });
    }

    const token = await Token.findOne({
      _id: tokenId,
      patient: patientId
    });

    if (!token) {
      return res.status(404).json({ message: "Token not found or unauthorized" });
    }

    if (token.status === "CANCELLED") {
      return res.status(400).json({ message: "Token is already cancelled" });
    }

    token.status = "CANCELLED";
    const updatedToken = await token.save();

    if (!updatedToken) {
      return res.status(500).json({ message: "Failed to cancel token" });
    }

    const schedule = await Schedule.findById(token.schedule);
    if (schedule) {
      const slot = schedule.slots.id(token.slotId);
      if (slot) {
        slot.status = "CANCELLED";
        await schedule.save();
      }
    }

    res.json({ message: "Token cancelled successfully" });

  } catch (error) {
    console.error("Cancel token error:", error);
    res.status(500).json({ message: "Server error cancelling token" });
  }
};

exports.getPatientVisitHistory = async (req, res) => {
  try {
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(401).json({ message: "Unauthorized: patient ID missing" });
    }

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

    if (!visits || visits.length === 0) {
      return res.json({
        message: "No visit history found",
        visits: []
      });
    }

    // Batch fetch all prescriptions at once (fixes N+1 query problem)
    const visitIds = visits.map(v => v._id);
    const prescriptions = await Prescription.find({
      token: { $in: visitIds }
    }).select("token _id").lean();

    // Create a map for O(1) lookup
    const prescriptionMap = {};
    prescriptions.forEach(p => {
      prescriptionMap[p.token.toString()] = p._id;
    });

    const visitHistory = visits.map((visit) => ({
      visitId: visit._id,
      tokenNumber: visit.tokenNumber,
      slotTime: visit.slotTime,
      status: visit.status,
      date: visit.createdAt,
      doctor: visit.doctor?.user?.name || "N/A",
      department: visit.doctor?.department?.name || "N/A",
      prescriptionId: prescriptionMap[visit._id.toString()] || null
    }));

    res.json({
      message: "Patient visit history fetched successfully",
      visits: visitHistory
    });

  } catch (error) {
    console.error("Get visit history error:", error);
    res.status(500).json({
      message: "Server error fetching visit history"
    });
  }
};
