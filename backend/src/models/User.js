const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  role: {
    type: String,
    enum: ["MD", "DOCTOR", "PATIENT"],
    default: "PATIENT"
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
