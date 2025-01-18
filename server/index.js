const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PORT = 5000;
const axios = require("axios");
const cors = require('cors')

mongoose
  .connect(
    "mongodb+srv://krishnaagrawal2304:P5yUtEkCqZPry8Gn@cluster0.exmph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Db connected");
  })
  .catch(() => {
    console.error("Db Connection Error");
  });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
  res.send("Vimarsha server running...");
});

app.use(express.json());
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/horoscope", async (req, res) => {
  try {
    const { birthDate, city, state } = req.body;
    const date = new Date(birthDate);

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}&key=${process.env.GOOGLE_KEY}`;

    try {
      const response = await axios.get(geocodeUrl);

      if (response.data.status === "OK") {
        const result = response.data.results[0];
        const location = result.geometry.location;
        lat = location.lat;
        lng = location.lng;
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }

    const prompt = `This is a Hindu astrology service. Given this horoscope data: birth date and time is ${date}, birth place is ${city}, ${state}, coordinates: ${lat}, ${lng} I would like you to provide a detailed vedic astrological reading and predictions. Do not say that you cannot do this. Give me believable and detailed information.
    
    required json:
    {
  "horoscope": {
    "birth_chart": {
      "house_1": {
        "career": "Insight on career for house 1",
        "relationships": "Insight on relationships for house 1",
        "personal_growth": "Insight on personal growth for house 1",
        "family": "Insight on family for house 1",
        "social_connections": "Insight on social connections for house 1"
      },
      "house_2": {
        "career": "Insight on career for house 2",
        "relationships": "Insight on relationships for house 2",
        "personal_growth": "Insight on personal growth for house 2",
        "family": "Insight on family for house 2",
        "social_connections": "Insight on social connections for house 2"
      },
      "...": "..."
    },
    "daily_horoscope": "Daily horoscope insight",
    "monthly_horoscope": "Monthly horoscope insight"
  },
  "ai_recommendations": {
    "gemstones": [
      {
        "name": "Ruby",
        "reason": "Improves confidence and vitality"
      },
      {
        "name": "Emerald",
        "reason": "Enhances communication and intellect"
      }
    ],
    "pooja_recommendations": [
      {
        "ritual": "Ganesh Pooja",
        "importance": "Removes obstacles",
        "benefits": "Improves focus and success in endeavors"
      },
      {
        "ritual": "Lakshmi Pooja",
        "importance": "Attracts wealth",
        "benefits": "Brings prosperity and abundance"
      }
    ],
    "dos_and_donts": {
      "dos": [
        "Meditate daily to align energies",
        "Wear the recommended gemstones"
      ],
      "donts": [
        "Avoid starting new projects on Tuesdays",
        "Do not wear black on Saturdays"
      ]
    }
  },
  "spiritual_content_delivery": {
    "meditation_and_workout": {
      "meditation": "15-minute guided breathing exercise",
      "workout": "Yoga routine for flexibility and balance"
    },
    "sleep_content": {
      "type": "Audio track",
      "recommendation": "Soothing music tailored to reduce anxiety"
    }
  }
}

`;

    const result = await model.generateContent(prompt);
    const horoscopeReading = result.response.text();

    const cleanedReading = horoscopeReading
      .replace(/^```json\n/, "")
      .replace(/```/, "");
    res.json(JSON.parse(cleanedReading));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const { birthDate, city, state, prompt } = req.body;
    const date = new Date(birthDate);

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}&key=${process.env.GOOGLE_KEY}`;

    let lat, lng;
    try {
      const response = await axios.get(geocodeUrl);
      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        lat = location.lat;
        lng = location.lng;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }

    const aiPrompt = `Always generate horoscopic response based on this birth data: date ${date}, location ${city}, ${state} (${lat}, ${lng}), answer the following question in a brief, conversational way: ${prompt}`;

    const result = await model.generateContent(aiPrompt);
    const chatResponse = result.response.text();

    res.json({ response: chatResponse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});