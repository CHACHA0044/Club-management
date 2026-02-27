const express = require("express");
const Event = require("../models/events");
const Registration = require("../models/registration");
const User = require("../models/user");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { sendRegistrationConfirmation, sendApprovalEmail, sendRejectionEmail } = require("../utils/sendEmail");

const router = express.Router();
// Add this test route at the top of your routes, after your imports
router.post("/test-email", auth, isAdmin, async (req, res) => {
  try {
    const { sendRegistrationConfirmation } = require("../utils/sendEmail");
    
    await sendRegistrationConfirmation(
      req.user.email || "test@example.com",
      req.user.name || "Test User",
      "Test Event",
      new Date(),
      "Test Location"
    );
    
    res.json({ message: "Test email sent successfully! Check your inbox." });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({ message: "Failed to send test email", error: error.message });
  }
});

router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const { title, description, dateTime, place, photo, category, maxParticipants, requirements, tags } = req.body;

    if (!title || !description || !dateTime || !place) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      description,
      dateTime,
      place,
      photo,
      category,
      maxParticipants,
      requirements,
      tags,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/registrations/my", auth, async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user.id })
      .populate("event")
      .sort({ createdAt: -1 });
    
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/registrations/all", auth, isAdmin, async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("student", "name email")
      .populate("event", "title")
      .sort({ createdAt: -1 });
    
    const formatted = registrations.map(reg => ({
      id: reg._id,
      eventId: reg.event._id,
      userId: reg.student._id,
      userName: reg.student.name,
      userEmail: reg.student.email,
      status: reg.status,
      registeredAt: reg.createdAt
    }));
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:eventId", auth, isAdmin, async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Registration.deleteMany({ event: eventId });
    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:eventId/register", auth, async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const registration = await Registration.create({
      student: req.user.id,
      event: eventId,
    });

    await sendRegistrationConfirmation(
      user.email,
      user.name,
      event.title,
      event.dateTime,
      event.place
    );

    res.status(201).json({
      message: "Registered successfully",
      registration,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already registered" });
    }
    res.status(500).json({ message: error.message });
  }
});

router.get("/:eventId/registrations", auth, isAdmin, async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const registrations = await Registration.find({ event: eventId })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:eventId/registrations/:registrationId/approve", auth, isAdmin, async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findById(registrationId).populate("student event");
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = "confirmed";
    await registration.save();

    await sendApprovalEmail(
      registration.student.email,
      registration.student.name,
      registration.event.title,
      registration.event.dateTime,
      registration.event.place
    );

    res.json({
      message: "Registration approved",
      registration,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:eventId/registrations/:registrationId/reject", auth, isAdmin, async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findById(registrationId).populate("student event");
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = "rejected";
    await registration.save();

    await sendRejectionEmail(
      registration.student.email,
      registration.student.name,
      registration.event.title
    );

    res.json({
      message: "Registration rejected",
      registration,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;