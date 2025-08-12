const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hostedBy: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  additionalInfo: {
    dressCode: {
      type: String,
    },
    ageRestrictions: {
      type: String,
    },
  },
  eventTags: {
    type: [String],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: String,
    required: true,
  },
  speakers: [
    {
      name: String,
      designation: String,
      imgUrl: String,
    },
  ],
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
