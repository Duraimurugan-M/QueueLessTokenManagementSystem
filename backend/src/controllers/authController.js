const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// REGISTER PATIENT (PUBLIC)
// ===============================
exports.register = async (req, res) => {
  try {
    const { name, mobile, password, age } = req.body;

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      mobile,
      password: hashedPassword,
      age,
      role: "PATIENT" // force role
    });

    res.status(201).json({
      message: "Patient registered successfully",
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// LOGIN (ALL ROLES)
// ===============================
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// REGISTER MD (DEV ONLY / ADMIN)
// ===============================
exports.registerMD = async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    const existing = await User.findOne({ mobile });
    if (existing) {
      return res.status(400).json({ message: "MD already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const md = await User.create({
      name,
      mobile,
      password: hashedPassword,
      role: "MD"
    });

    res.status(201).json({
      message: "MD created successfully",
      mdId: md._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
