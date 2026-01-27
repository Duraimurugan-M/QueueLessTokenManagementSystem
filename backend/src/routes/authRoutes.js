const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Register patient
router.post("/register", register);

// Login (MD / Doctor / Patient)
router.post("/login", login);

module.exports = router;
