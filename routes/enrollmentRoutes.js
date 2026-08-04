const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");

// 1. Enroll a student
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, courseName } = req.body;

    // Input Field Check
    if (!name || !email || !phone || !courseName) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, phone, courseName) are required.",
      });
    }

    // email check database a acha kina
    const existingEnrollment = await Enrollment.findOne({
      email: email,
      courseName: courseName,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: `Error: The email "${email}" is already enrolled in the course "${courseName}".`,
      });
    }

    // Save data
    const newEnrollment = new Enrollment({
      name,
      email,
      phone,
      courseName,
    });

    const savedEnrollment = await newEnrollment.save();

    return res.status(201).json({
      success: true,
      message: "Enrollment successful!",
      data: savedEnrollment,
    });
  } catch (error) {
    console.error("Error in POST /enrollments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// 2. View all enrolled students
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    console.error("Error in GET /enrollments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// 3. Delete a specific enrollment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete enrollment
    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);

    // If enrollment doesn't exist
    if (!deletedEnrollment) {
      return res.status(404).json({
        success: false,
        message: "Error: Enrollment not found. Unable to delete.",
      });
    }

    // Success message
    return res.status(200).json({
      success: true,
      message: "Success: Enrollment has been successfully deleted.",
    });
  } catch (error) {
    // If the ID format is invalid, Mongoose throws a CastError
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Error: Invalid enrollment ID format.",
      });
    }

    console.error("Error in DELETE /enrollments/:id:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;
