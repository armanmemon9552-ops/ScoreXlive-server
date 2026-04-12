const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = "a567d21a28mshed82c55f8ea7788p1ba38djsn193b5bbf29a9";

// Home
app.get("/", (req, res) => {
  res.send("🏏 ScoreX Cricket Server Running");
});

// Live Matches
app.get("/live", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
      {
        headers: {
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Live error ❌" });
  }
});

// Upcoming Matches
app.get("/upcoming", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",
      {
        headers: {
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Upcoming error ❌" });
  }
});

// Recent Matches
app.get("/recent", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",
      {
        headers: {
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Recent error ❌" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
