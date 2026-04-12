const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔑 API KEY (Render ENV में डालना)
const CRICKET_API_KEY = a567d21a28mshed82c55f8ea7788p1ba38djsn193b5bbf29a9;

// 🟢 HOME
app.get("/", (req, res) => {
  res.send("🏏 ScoreX Cricket Server Running");
});

// 🟢 LIVE MATCHES
app.get("/live", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
      {
        headers: {
          "X-RapidAPI-Key": CRICKET_API_KEY,
          "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.json({ error: "Live match error ❌" });
  }
});

// 🟢 UPCOMING MATCHES
app.get("/upcoming", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",
      {
        headers: {
          "X-RapidAPI-Key": CRICKET_API_KEY,
          "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.json({ error: "Upcoming match error ❌" });
  }
});

// 🟢 RECENT MATCHES
app.get("/recent", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",
      {
        headers: {
          "X-RapidAPI-Key": CRICKET_API_KEY,
          "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.json({ error: "Recent match error ❌" });
  }
});

app.listen(PORT, () => {
  console.log("🏏 Cricket Server running on " + PORT);
});
