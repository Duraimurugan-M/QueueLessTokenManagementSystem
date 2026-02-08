const User = require("../models/User");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");
const { calculateTokenStats, calculateDetailedStats } = require("../utils/analyticsHelper");

// CREATE DEPARTMENT
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Department name is required and must be a string" });
    }

    const existing = await Department.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ message: "Department already exists" });
    }

    const department = await Department.create({ name: name.trim() });

    if (!department) {
      return res.status(500).json({ message: "Failed to create department" });
    }

    res.status(201).json({
      message: "Department created successfully",
      department
    });

  } catch (error) {
    console.error("Create department error:", error);
    res.status(500).json({ message: "Server error creating department" });
  }
};

// GET ALL DEPARTMENTS
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    
    if (!departments) {
      return res.json([]);
    }

    res.json(departments);

  } catch (error) {
    console.error("Get departments error:", error);
    res.status(500).json({ message: "Server error fetching departments" });
  }
};

// CREATE DOCTOR
exports.createDoctor = async (req, res) => {
  try {
    const { name, mobile, password, departmentId, specialization } = req.body;

    // INPUT VALIDATION
    if (!name || !mobile || !password || !departmentId || !specialization) {
      return res.status(400).json({ message: "Name, mobile, password, department, and specialization are required" });
    }

    // Check if doctor already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(409).json({ message: "Mobile already registered" });
    }

    // Verify department exists
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Hash password
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

    if (!user) {
      return res.status(500).json({ message: "Failed to create doctor user" });
    }

    // Create doctor profile
    const doctor = await Doctor.create({
      user: user._id,
      department: departmentId,
      specialization
    });

    if (!doctor) {
      return res.status(500).json({ message: "Failed to create doctor profile" });
    }

    res.status(201).json({
      message: "Doctor created successfully",
      doctor
    });

  } catch (error) {
    console.error("Create doctor error:", error);
    res.status(500).json({ message: "Server error creating doctor" });
  }
};

// GET ALL DOCTORS
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name mobile")
      .populate("department", "name");

    if (!doctors) {
      return res.json([]);
    }

    res.json(doctors);

  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ message: "Server error fetching doctors" });
  }
};

// GET TODAY'S ANALYTICS (MD)
exports.getTodayAnalytics = async (req, res) => {
  try {
    // Get basic token stats
    const tokenStats = await calculateTokenStats({});

    // Get detailed stats (department & doctor wise)
    const detailedStats = await calculateDetailedStats({});

    res.json({
      message: "Today's analytics fetched successfully",
      data: {
        ...tokenStats,
        ...detailedStats
      }
    });

  } catch (error) {
    console.error("Get MD analytics error:", error);
    res.status(500).json({
      message: "Server error fetching MD analytics"
    });
  }
};
