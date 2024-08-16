const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    designation: {
      type: String,
      required: true,
      enum: ["student", "workingProfessional", "unemployed"]
    },
    currentStatus: {
      type: String,
      required: true,
      enum: ["active", "inactive", "suspended"]
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "faculty", "admin", "intern", "visitor", "learner"],
      default: "visitor"
    },
    courseType: {
      type: String,
      required: true,
      enum: ["fullstack", "frontend", "backend", "intern", "internship"]
    },
    batch: { type: String, required: true },
    registeredYear: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
