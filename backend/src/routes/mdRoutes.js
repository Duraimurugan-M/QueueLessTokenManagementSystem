const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createDepartment,
  getDepartments,
  createDoctor,
  getDoctors
} = require("../controllers/mdController");

// Only MD can access these routes
router.use(authMiddleware, roleMiddleware(["MD"]));

router.post("/department", createDepartment);
router.get("/departments", getDepartments);

router.post("/doctor", createDoctor);
router.get("/doctors", getDoctors);

module.exports = router;
