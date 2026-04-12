const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔑 ENV KEYS
const CRICKET_API_KEY = process.env.CRICKET_API_KEY;
const AI_API_KEY = process.env.OPENROUTER_API_KEY;

// 🟢 HOME
app.get("/", (req, res) => {
  res.send("🚀 ScoreX Server Running");
});

// 🏏 LIVE
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
  } catch {
    res.json({ error: "Cricket error ❌" });
  }
});

// 🤖 AI
app.post("/ai", async (req, res) => {
  try {
    const question = req.body.question;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b",
        messages: [
          { role: "user", content: question }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer =
      response.data?.choices?.[0]?.message?.content;

    res.json({ answer });

  } catch {
    res.json({ answer: "AI error ❌" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
