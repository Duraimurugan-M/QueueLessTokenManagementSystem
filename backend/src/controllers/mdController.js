const User = require("../models/User");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
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
