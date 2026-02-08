const User = require("../models/User");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");

// CREATE DEPARTMENT
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const department = await Department.create({ name });

    res.status(201).json({
      message: "Department created successfully",
      department
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL DEPARTMENTS
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE DOCTOR
exports.createDoctor = async (req, res) => {
  try {
    const { name, mobile, password, departmentId, specialization } = req.body;

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create doctor user
    const user = await User.create({
      name,
      mobile,
      password: hashedPassword,
      role: "DOCTOR",
      department: departmentId
    });

    // Create doctor profile
    const doctor = await Doctor.create({
      user: user._id,
      department: departmentId,
      specialization
    });

    res.status(201).json({
      message: "Doctor created successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL DOCTORS
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name mobile")
      .populate("department", "name");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TODAY'S ANALYTICS (MD)
exports.getTodayAnalytics = async (req, res) => {
  try {
    // 1. Get last 24 hours (rolling window)
    const end = new Date();
    const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

    // 2. Fetch tokens from last 24 hours
    const tokens = await Token.find({
      createdAt: { $gte: start, $lte: end }
    })
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

    // 3. Initialize counters
    let totalPatients = 0;
    let completedCount = 0;
    let cancelledCount = 0;

    const departmentStats = {};
    const doctorStats = {};

    // 4. Process tokens
    tokens.forEach((token) => {
      totalPatients++;

      // Status count
      if (token.status === "COMPLETED") completedCount++;
      if (token.status === "CANCELLED") cancelledCount++;

      // Department-wise count
      const deptName = token.doctor?.department?.name || "Unknown";
      departmentStats[deptName] = (departmentStats[deptName] || 0) + 1;

      // Doctor-wise count
      const doctorName = token.doctor?.user?.name || "Unknown";
      doctorStats[doctorName] = (doctorStats[doctorName] || 0) + 1;
    });

    res.json({
      message: "Today's analytics fetched successfully",
      data: {
        totalPatients,
        completedCount,
        cancelledCount,
        departmentStats,
        doctorStats
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching MD analytics",
      error: error.message
    });
  }
};
