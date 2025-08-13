const event = require("./models/event.model");
const initialiseDatabase = require("./db/db.connect");
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

initialiseDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  Credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const eventData = {
  title: "PitchPrime 2025",
  hostedBy: "Innovators Hub",
  type: "Online",
  imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  details:
    "PitchPrime 2025 is an exclusive startup pitch night bringing together visionary founders, angel investors, and venture capitalists. Scheduled for September 20th from 6:00 PM to 10:00 PM at The Leela Palace, Bengaluru, and streamed live online. Selected startups will present their business ideas in a 5-minute pitch followed by a Q&A with the investor panel. Networking sessions, feedback workshops, and investor meet-and-greets will also be part of the evening. Open to all entrepreneurs and investors, registration is mandatory. Dress code is business formal to maintain a professional environment.",
  additionalInfo: {
    dressCode: "Business formal",
    ageRestrictions: "18 and above",
  },
  eventTags: ["Startup", "Pitch", "Investment", "Networking"],
  startTime: "6:00:00 PM",
  endTime: "10:00:00 PM",
  eventDate: "Sat Sep 20 2025",
  address: "The Leela Palace, Bengaluru",
  ticketPrice: "₹2000",
  speakers: [
    {
      name: "Ravi Mehta",
      designation: "Angel Investor & Mentor",
      imgUrl: "https://images.unsplash.com/photo-1603415526960-f7e0328e3e2f",
    },
    {
      name: "Ananya Gupta",
      designation: "Founder & CEO, FinGrow",
      imgUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
  ],
};

const createEvent = async (eventData) => {
  try {
    const newEvent = new event(eventData);
    const createdEvent = await newEvent.save();
    console.log(createdEvent);
  } catch (error) {
    console.log("Error in creating data:", error);
  }
};

//createEvent(eventData);

const fetchAllEvents = async () => {
  try {
    const allEvents = await event.find();
    return allEvents;
  } catch (error) {
    console.log("Error in fetching all events from DB.", error);
  }
};

app.get("/events", async (req, res) => {
  try {
    const allEvents = await fetchAllEvents();
    if (allEvents.length > 0) {
      res.status(200).json(allEvents);
    } else {
      res.status(400).json({ message: "Error in fetching data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data:", error });
  }
});

const fetchEventById = async (eventId) => {
  try {
    const eventFound = await event.findById(eventId);
    return eventFound;
  } catch (error) {
    console.log("error in fetching event by Id", error);
  }
};

app.get("/eventdetails/:eventId", async (req, res) => {
  try {
    const event = await fetchEventById(req.params.eventId);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(400).json({ message: "Error in fetching error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data:", error });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
