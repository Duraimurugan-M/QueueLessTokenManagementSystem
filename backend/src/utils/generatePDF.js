const PDFDocument = require("pdfkit");

module.exports = function generateTokenPDF(res, token, doctor, department) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=token-${token.tokenNumber}.pdf`
  );

  doc.pipe(res);

  // Title
  doc
    .fontSize(20)
    .text("QueueLess Hospital", { align: "center" })
    .moveDown(1);

  doc
    .fontSize(14)
    .text("Appointment Token", { align: "center" })
    .moveDown(2);

  doc.fontSize(12);

  // Token Details
  doc.text(`Patient Name: ${token.patientDetails.name}`);
  doc.text(`Age: ${token.patientDetails.age}`);
  doc.text(`Date of Birth: ${token.patientDetails.dob}`);
  doc.moveDown();

  doc.text(`Department: ${department.name}`);
  doc.text(`Doctor: ${doctor.user.name}`);
  doc.moveDown();

  doc.text(`Token Number: ${token.tokenNumber}`);
  doc.text(`Appointment Time: ${token.slotTime}`);
  doc.text(`Appointment Date: ${token.createdAt.toISOString().split("T")[0]}`);

  doc.moveDown(2);

  // Instructions
  doc
    .fontSize(11)
    .text("Instructions:", { underline: true })
    .moveDown(0.5);

  doc
    .fontSize(10)
    .text(
      "- Please arrive at the hospital at least 10 minutes before your scheduled time.\n" +
      "- Carry this token (printed or digital) during your visit.\n" +
      "- Appointment time may vary slightly based on consultation flow."
    );

  doc.moveDown(2);
  doc.text("Thank you for choosing QueueLess.", { align: "center" });

  doc.end();
};
