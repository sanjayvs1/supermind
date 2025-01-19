const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PORT = 5000;
const axios = require("axios");
const cors = require("cors");

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
app.use(cors());

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
    career: "Aries rising suggests a proactive and ambitious career path. You might excel in leadership roles or fields requiring initiative. However, impulsiveness needs to be managed for sustained success.",
    relationships: "You tend to be independent and assertive in relationships, which can be both a strength and a challenge. Open communication and understanding are key to harmonious partnerships.",
    personal_growth: "Focus on self-awareness and emotional regulation. Learning to channel your energy constructively will enhance personal growth and prevent burnout.",
    family: "Family relationships can be intense. Striving for balance between independence and connection is important for maintaining positive family dynamics.",
    social_connections: "You are likely to have a wide circle of acquaintances, though maintaining close friendships requires effort and conscious nurturing.",
    daily_horoscope: "Today, focus on clear communication and avoid impulsive decisions. A calm approach will yield better results. Spend time reflecting on your goals.",
    monthly_horoscope: "This month presents opportunities for growth and progress. Embrace new challenges with courage. Nurturing relationships is key to overall well-being.",
    recommendations: {
      gemstones: [
        {
          name: "Ruby",
          reason: "Enhances courage, leadership qualities, and vitality, aligning with your Aries ascendant."
        },
        {
          name: "Coral",
          reason: "Beneficial for courage, confidence, and overcoming obstacles."
        }
      ],
      pooja_recommendations: [
        {
          ritual: "Hanuman Pooja",
          importance: "Strengthens courage and removes obstacles.",
          benefits: "Enhances willpower and determination."
        },
        {
          ritual: "Surya Pooja",
          importance: "Blesses with vitality and energy.",
          benefits: "Improves health, leadership qualities, and overall well-being."
        }
      ],
      dos_and_donts: {
        dos: [
          "Practice mindfulness and meditation daily.",
          "Engage in regular physical activity."
        ],
        donts: [
          "Avoid excessive indulgence and impulsive actions.",
          "Manage anger effectively."
        ]
      }
    },
    spiritual_content_delivery: {
      meditation_and_workout: {
        meditation: "Guided meditation focusing on self-awareness and emotional regulation.",
        workout: "Yoga and pranayama exercises to improve flexibility and balance."
      },
      sleep_content: {
        type: "Guided sleep meditation",
        recommendation: "Relaxing soundscapes with nature sounds to promote restful sleep."
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

    const aiPrompt = `You are an Expert Astrologer! Always generate horoscopic response based on this birth data: date ${date}, location ${city}, ${state} (${lat}, ${lng}), answer the following question in a brief, conversational way: ${prompt}`;

    const result = await model.generateContent(aiPrompt);
    const chatResponse = result.response.text();

    res.json({ response: chatResponse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
