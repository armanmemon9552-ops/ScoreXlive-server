const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔑 API KEYS (Render me set karna)
const CRICKET_API_KEY = a567d21a28mshed82c55f8ea7788p1ba38djsn193b5bbf29a9
const AI_API_KEY = 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;

// 🟢 HOME
app.get("/", (req, res) => {
  res.send("🚀 ScoreX Server Running (Cricket + AI)");
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

// 🤖 AI CHAT
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
          {
            role: "user",
            content: question
          }
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

    res.json({
      answer: "AI error ❌"
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
