// index.js

const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("This is the backend.");
});

// Endpoint to retrieve data from database.txt
app.get("/data", (req, res) => {
  fs.readFile("database.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file" });
    } else {
      const entries = data.split("\n");
      res.status(200).json({ entries });
    }
  });
});

app.put("/submit", (req, res) => {
  const { name, message } = req.body.fieldValues;
  const timestamp = new Date().toISOString();
  const newData = `${timestamp}, ${name}, ${message}\n`;

  fs.writeFile("database.txt", newData, { flag: "a" }, (err) => {
    if (err) {
      console.error("Error appending to file:", err);
      res.status(500).json({ error: "Error saving data" });
    } else {
      console.log("Data saved to database.txt");
      res.status(200).json({ message: "Form submitted successfully" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
