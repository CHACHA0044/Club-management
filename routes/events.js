const express = require("express");
const Event = require("../models/events");
const Registration = require("../models/registration");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// ADMIN: Create Event
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const { title, description, dateTime, place, photo } = req.body;

    if (!title || !description || !dateTime || !place) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      description,
      dateTime,
      place,
      photo,
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

// ADMIN: Delete Event
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

// PUBLIC: Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUBLIC: Get Single Event
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

// USER: Register for Event
router.post("/:eventId/register", auth, async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const registration = await Registration.create({
      student: req.user.id,
      event: eventId,
    });

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

module.exports = router;
