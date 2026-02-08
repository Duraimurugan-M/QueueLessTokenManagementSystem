const express = require("express");
const router = express.Router();

const {
  createPrescription,
  downloadPrescriptionPDF
} = require("../controllers/prescriptionController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const ROLES = require("../constants/roles");


router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.DOCTOR]),
  createPrescription
);

router.get(
  "/:id/pdf",
  authMiddleware,
  downloadPrescriptionPDF
);


module.exports = router;
