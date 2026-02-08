const PDFDocument = require("pdfkit");

module.exports = function generatePrescriptionPDF(res, prescription) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=prescription-${prescription._id}.pdf`
  );

  doc.pipe(res, { end: true });

  // Hospital Title
  doc
    .fontSize(20)
    .text("QueueLess Hospital", { align: "center" })
    .moveDown(1);

  doc
    .fontSize(14)
    .text("Digital Prescription", { align: "center" })
    .moveDown(2);

  doc.fontSize(12);

  // Patient Details
  doc.text(`Patient Name: ${prescription.patient.name}`);
  doc.text(`Age: ${prescription.patient.age}`);
  doc.text(`Date of Visit: ${prescription.createdAt.toISOString().split("T")[0]}`);
  doc.moveDown();

  // Doctor Details
  doc.text(`Doctor: Dr. ${prescription.doctor?.user?.name || "N/A"}`);
  doc.text(`Department: ${prescription.department.name}`);
  doc.moveDown();

  // Diagnosis
  doc
    .fontSize(12)
    .text("Diagnosis / Notes:", { underline: true })
    .moveDown(0.5);

  doc.fontSize(11).text(prescription.diagnosisNotes);
  doc.moveDown(1.5);

  // Medicines
  doc
    .fontSize(12)
    .text("Prescribed Medicines:", { underline: true })
    .moveDown(0.5);

  prescription.medicines.forEach((med, index) => {
    doc
      .fontSize(11)
      .text(
        `${index + 1}. ${med.name} - ${med.timing} (${med.foodInstruction})`
      );
  });

  doc.moveDown(2);

  doc
    .fontSize(10)
    .text(
      "This is a system-generated digital prescription. No signature required.",
      { align: "center" }
    );

    doc.on("error", (err) => {
  console.error("PDF Error:", err);
});


  doc.end();
};
