const Prescription = require("../models/Prescription");
const Token = require("../models/Token");
const Doctor = require("../models/Doctor");
const generatePrescriptionPDF = require("../utils/prescriptionPdfGenerator");

exports.createPrescription = async (req, res) => {
  try {
    const { tokenId, diagnosisNotes, medicines } = req.body;
    const doctorId = req.user.id;

    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    if (token.status !== "COMPLETED") {
      return res.status(400).json({
        message: "Prescription allowed only after consultation"
      });
    }

    const alreadyExists = await Prescription.findOne({ token: tokenId });
    if (alreadyExists) {
      return res.status(400).json({
        message: "Prescription already exists for this token"
      });
    }

    const doctor = await Doctor.findOne({ user: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const prescription = await Prescription.create({
      patient: token.patient,
      doctor: doctor._id,
      department: doctor.department,
      token: tokenId,
      diagnosisNotes,
      medicines
    });

    res.status(201).json({
      message: "Prescription created successfully",
      prescription
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating prescription",
      error: error.message
    });
  }
};

exports.downloadPrescriptionPDF = async (req, res) => {
  const { id } = req.params;

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
};
