const express = require("express");
const router = express.Router();
const { register, login, registerMD } = require("../controllers/authController");

// Register patient
router.post("/register", register);

// Login (MD / Doctor / Patient)
router.post("/login", login);

// TEMP: Register MD (ONLY FOR DEVELOPMENT)
router.post("/register-md", registerMD);

module.exports = router;
