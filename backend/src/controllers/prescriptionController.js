const Prescription = require("../models/Prescription");
const Token = require("../models/Token");
const Doctor = require("../models/Doctor");
const generatePrescriptionPDF = require("../utils/prescriptionPdfGenerator");
const { sendPrescriptionEmail } = require("../utils/emailService");
const User = require("../models/User");

exports.createPrescription = async (req, res) => {
  try {
    const { tokenId, diagnosisNotes, medicines } = req.body;
    const doctorId = req.user?.id;

    if (!doctorId) {
      return res.status(401).json({ message: "Unauthorized: doctor ID missing" });
    }

    if (!tokenId) {
      return res.status(400).json({ message: "Token ID is required" });
    }

    // Validate medicines array
    if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ message: "At least one medicine is required" });
    }

    // Validate each medicine has required fields including sideEffects
    for (let med of medicines) {
      if (!med.name || !med.timing || !med.foodInstruction || !med.sideEffects) {
        return res.status(400).json({
          message: "Each medicine must have name, timing, foodInstruction, and sideEffects"
        });
      }
    }

    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    if (token.status !== "COMPLETED") {
      return res.status(400).json({
        message: "Prescription allowed only after consultation is completed"
      });
    }

    const alreadyExists = await Prescription.findOne({ token: tokenId });
    if (alreadyExists) {
      return res.status(409).json({
        message: "Prescription already exists for this token"
      });
    }

    const doctor = await Doctor.findOne({ user: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const prescription = await Prescription.create({
      patient: token.patient,
      doctor: doctor._id,
      department: doctor.department,
      token: tokenId,
      diagnosisNotes,
      medicines
    });

    if (!prescription) {
      return res.status(500).json({ message: "Failed to create prescription" });
    }

    try {
      const patientUser = await User.findById(token.patient);

      await sendPrescriptionEmail(
        patientUser.email,
        patientUser.name,
        prescription._id,
      );
    } catch (err) {
      console.log("Prescription email failed:", err.message);
    }

    res.status(201).json({
      message: "Prescription created successfully",
      prescription
    });

  } catch (error) {
    console.error("Create prescription error:", error);
    res.status(500).json({
      message: "Server error creating prescription"
    });
  }
};

exports.downloadPrescriptionPDF = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Prescription ID is required" });
    }

    const prescription = await Prescription.findById(id)
      .populate("patient", "name age")
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          model: "User",
          select: "name",
        },
      })
      .populate("department", "name");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    generatePrescriptionPDF(res, prescription);

  } catch (error) {
    console.error("Download prescription PDF error:", error);
    res.status(500).json({ message: "Server error downloading prescription" });
  }
};
