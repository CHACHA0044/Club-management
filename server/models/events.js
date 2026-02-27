const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    category: {
      type: String,
      default: "workshop",
    },
    maxParticipants: {
      type: Number,
      default: 50,
    },
    currentParticipants: {
      type: Number,
      default: 0,
    },
    requirements: String,
    tags: [String],
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);