const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    courseName: {
      type: String,
      required: [true, "Course name is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index on email and courseName
enrollmentSchema.index({ email: 1, courseName: 1 });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
