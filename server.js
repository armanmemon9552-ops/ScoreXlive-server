const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// 🔑 API KEYS (YAHI DALNI HAI)
const RAPID_KEY = "a567d21a28mshed82c55f8ea7788p1ba38djsn193b5bbf29a9";
const GEMINI_KEY = "AIzaSyAM2YABnJjlX8wiZO5K_2q0GwBnjbDCMks";

// TEST
app.get("/", (req, res) => {
  res.send("ScoreX Server Running ✅");
});

// 🔥 LIVE MATCHES
app.get("/live", async (req, res) => {
  try {
    const r = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
      {
        headers: {
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          "x-rapidapi-key": RAPID_KEY,
        },
      }
    );

    res.json(r.data);
  } catch (e) {
    res.json({ error: "Live error ❌" });
  }
});

// 🔥 SCORECARD
app.get("/score/:id", async (req, res) => {
  try {
    const r = await axios.get(
      `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${req.params.id}/hscard`,
      {
        headers: {
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          "x-rapidapi-key": RAPID_KEY,
        },
      }
    );

    res.json(r.data);
  } catch (e) {
    res.json({ error: "Score error ❌" });
  }
});

// 🔥 COMMENTARY
app.get("/commentary/:id", async (req, res) => {
  try {
    const r = await axios.get(
      `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${req.params.id}/comm`,
      {
        headers: {
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          "x-rapidapi-key": RAPID_KEY,
        },
      }
    );

    res.json(r.data);
  } catch (e) {
    res.json({ error: "Commentary error ❌" });
  }
});

// 🤖 AI (GEMINI)
app.post("/ai", async (req, res) => {
  try {
    const question = req.body.question;

    const r = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [{ text: question }]
          }
        ]
      }
    );

    res.json({
      answer: r.data.candidates[0].content.parts[0].text
    });

  } catch (e) {
    console.log(e.response?.data || e.message);
    res.json({ answer: "AI error ❌" });
  }
});

app.listen(PORT, () => console.log("Server running 🚀"));
