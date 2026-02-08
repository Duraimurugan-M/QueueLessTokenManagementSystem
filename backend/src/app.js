const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/md", require("./routes/mdRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));
app.use("/api/patient", require("./routes/patientRoutes"));
app.use("/api/token", require("./routes/tokenRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));

module.exports = app;
