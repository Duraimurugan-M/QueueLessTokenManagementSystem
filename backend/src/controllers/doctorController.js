const Doctor = require("../models/Doctor");
const Schedule = require("../models/Schedule");
const generateSlots = require("../utils/generateSlots");
const Token = require("../models/Token");

// CREATE / UPDATE DAILY SCHEDULE
exports.createSchedule = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const {
      date,
      startTime,
      endTime,
      breakStart,
      breakEnd,
      slotDuration,
      maxTokens
    } = req.body;

    const doctor = await Doctor.findOne({ user: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existing = await Schedule.findOne({
      doctor: doctor._id,
      date
    });

    if (existing) {
      return res.status(400).json({ message: "Schedule already exists for this date" });
    }

    const slots = generateSlots(
      startTime,
      endTime,
      breakStart,
      breakEnd,
      slotDuration,
      maxTokens
    );

    const schedule = await Schedule.create({
      doctor: doctor._id,
      date,
      startTime,
      endTime,
      breakStart,
      breakEnd,
      slotDuration,
      maxTokens,
      slots
    });

    res.status(201).json({
      message: "Schedule created successfully",
      schedule
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TODAY'S SCHEDULE
exports.getMySchedule = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const date = req.query.date;

    const doctor = await Doctor.findOne({ user: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const schedule = await Schedule.findOne({
      doctor: doctor._id,
      date
    });

    res.json(schedule);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ GET TODAY'S QUEUE
exports.getTodayQueue = async (req, res) => {
  try {
    const doctorUserId = req.user.id;

    const doctor = await require("../models/Doctor").findOne({
      user: doctorUserId
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const today = new Date().toISOString().split("T")[0];

    const tokens = await Token.find({
      doctor: doctor._id,
      createdAt: {
        $gte: new Date(today)
      }
    }).sort({ tokenNumber: 1 });

    res.json(tokens);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️⃣ UPDATE TOKEN STATUS (CALL / COMPLETE)
exports.updateTokenStatus = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    const { tokenId } = req.params;
    const { status } = req.body;

    if (!["BOOKED", "COMPLETED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const doctor = await require("../models/Doctor").findOne({
      user: doctorUserId
    });

    const token = await Token.findOne({
      _id: tokenId,
      doctor: doctor._id
    });

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    token.status = status;
    await token.save();

    // If completed, mark slot as completed too
    if (status === "COMPLETED") {
      const Schedule = require("../models/Schedule");
      const schedule = await Schedule.findById(token.schedule);
      const slot = schedule.slots.id(token.slotId);
      if (slot) {
        slot.status = "COMPLETED";
        await schedule.save();
      }
    }

    res.json({ message: "Token updated successfully", token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};