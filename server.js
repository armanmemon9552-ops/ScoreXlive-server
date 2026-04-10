const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const KEY = "a567d21a28mshed82c55f8ea7788p1ba38djsn193b5bbf29a9";
const GEMINI = "AIzaSyAM2YABnJjlX8wiZO5K_2q0GwBnjbDCMks";

// HOME
app.get("/", (req,res)=>res.send("ScoreX Pro Server 🚀"));

// LIVE
app.get("/live", async (req,res)=>{
  const r = await axios.get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",{
    headers:{
      "x-rapidapi-host":"cricbuzz-cricket.p.rapidapi.com",
      "x-rapidapi-key":KEY
    }
  });
  res.json(r.data);
});

// UPCOMING
app.get("/upcoming", async (req,res)=>{
  const r = await axios.get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",{
    headers:{
      "x-rapidapi-host":"cricbuzz-cricket.p.rapidapi.com",
      "x-rapidapi-key":KEY
    }
  });
  res.json(r.data);
});

// RECENT
app.get("/recent", async (req,res)=>{
  const r = await axios.get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",{
    headers:{
      "x-rapidapi-host":"cricbuzz-cricket.p.rapidapi.com",
      "x-rapidapi-key":KEY
    }
  });
  res.json(r.data);
});

// SCORECARD
app.get("/score/:id", async (req,res)=>{
  const r = await axios.get(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${req.params.id}/hscard`,{
    headers:{
      "x-rapidapi-host":"cricbuzz-cricket.p.rapidapi.com",
      "x-rapidapi-key":KEY
    }
  });
  res.json(r.data);
});

// COMMENTARY
app.get("/commentary/:id", async (req,res)=>{
  const r = await axios.get(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${req.params.id}/comm`,{
    headers:{
      "x-rapidapi-host":"cricbuzz-cricket.p.rapidapi.com",
      "x-rapidapi-key":KEY
    }
  });
  res.json(r.data);
});

// AI (Gemini)
app.post("/ai", async (req,res)=>{
  const q = req.body.question;

  const r = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI}`,
    {
      contents:[{parts:[{text:q+" (answer short cricket stats)"}]}]
    }
  );

  res.json({
    answer:r.data.candidates[0].content.parts[0].text
  });
});

app.listen(3000, ()=>console.log("Server running 🚀"));
