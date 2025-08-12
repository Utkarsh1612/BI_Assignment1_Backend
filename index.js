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
  title: "Global Startup Summit 2025",
  hostedBy: "Entrepreneurs Network",
  type: "Both",
  imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  details:
    "Be part of the Global Startup Summit 2025, a hybrid event connecting innovators, investors, and industry leaders worldwide. Happening on October 5th from 9:00 AM to 2:00 PM at World Trade Center, New Delhi, and streamed online. Gain insights from top founders, attend interactive workshops, and explore funding opportunities. The event covers trends in sustainable business, fintech, and AI applications. Open to all aged 16 and above, registration is mandatory. Dress code is smart casual. Limited seats available for offline attendees to ensure high-quality networking opportunities. Secure your spot today and take your startup vision to the next level.",
  additionalInfo: {
    dressCode: "Smart casual",
    ageRestrictions: "16 and above",
  },
  eventTags: ["Startup", "Entrepreneurship", "Investment", "Technology"],
  startTime: "9:00:00 AM",
  endTime: "2:00:00 PM",
  eventDate: "Sun Oct 05 2025",
  address: "World Trade Center, New Delhi",
  ticketPrice: "1500",
  speakers: [
    {
      name: "Alex Johnson",
      designation: "Founder & CEO, GreenTech Solutions",
      imgUrl: "https://images.unsplash.com/photo-1603415526960-f7e0328e3e2f",
    },
    {
      name: "Maria Lopez",
      designation: "Venture Partner, Global Capital",
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
    res.status(500).json({ message: "Failed to fetching data:", error });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
