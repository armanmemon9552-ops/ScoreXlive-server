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

// 🏏 LIVE MATCHES
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
    res.json({ error: "Cricket API error ❌" });
  }
});

// 🏏 UPCOMING
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
    res.json({ error: "Cricket API error ❌" });
  }
});

// 🤖 AI (POST)
app.post("/ai", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.json({ answer: "Question missing ❌" });
    }

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
      response.data?.choices?.[0]?.message?.content ||
      "No answer ❌";

    res.json({ answer });

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.json({ answer: "AI error ❌" });
  }
});

// 🟢 EASY TEST (GET)
app.get("/testai", (req, res) => {
  res.json({
    answer: "AI working 🔥"
  });
});

// 🟢 EASY REAL AI TEST (GET)
app.get("/ask", async (req, res) => {
  try {
    const question = req.query.q || "cricket kya hai?";

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
      response.data?.choices?.[0]?.message?.content ||
      "No answer ❌";

    res.json({ answer });

  } catch {
    res.json({ answer: "AI error ❌" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
