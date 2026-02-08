const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// REGISTER PATIENT (PUBLIC)
// ===============================
exports.register = async (req, res) => {
  try {
    const { name, mobile, password, age } = req.body;

    // INPUT VALIDATION
    if (!name || !mobile || !password) {
      return res.status(400).json({ message: "Name, mobile, and password are required" });
    }

    // Validate age for patient (mandatory)
    if (!age || age < 1 || age > 150) {
      return res.status(400).json({ message: "Age is required and must be between 1-150" });
    }

    // CHECK: mobile already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(409).json({ message: "Mobile number already registered" });
    }

    // HASH: password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE: user
    const user = await User.create({
      name,
      mobile,
      password: hashedPassword,
      age,
      role: "PATIENT" // force role
    });

    if (!user) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    res.status(201).json({
      message: "Patient registered successfully",
      userId: user._id
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ===============================
// LOGIN (ALL ROLES - Mobile OR Email)
// ===============================
exports.login = async (req, res) => {
  try {
    const { mobile, email, password } = req.body;

    // Support both mobile and email login
    if (!mobile && !email) {
      return res.status(400).json({ message: "Mobile or email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ 
      $or: [{ mobile }, { email }] 
    });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
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
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
