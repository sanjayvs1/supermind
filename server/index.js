const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Kundali = require("./kundali");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PORT = 5000;
const axios = require("axios");

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

app.get("/", (req, res) => {
  res.send("Vimarsha server running...");
});

app.use(express.json());

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

    const horoscope = Kundali.generateBirthChart(date, lat, lng);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_KEY);

    const prompt = `Given this horoscope data: ${JSON.stringify(
      horoscope
    )},     
    provide a detailed astrological reading and predictions.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const horoscopeReading = result.response.text();

    res.json({
      horoscopeData: horoscope,
      reading: horoscopeReading,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
