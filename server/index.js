const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
