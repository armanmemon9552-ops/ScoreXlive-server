const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const cors = require("cors");

const app = express();
const cache = new NodeCache({ stdTTL: 30 }); // 30 sec cache

app.use(cors());

app.get("/live", async (req, res) => {

  const cached = cache.get("live");

  if (cached) {
    console.log("⚡ Cache used");
    return res.json(cached);
  }

  try {
    const response = await axios.get(
      "https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/40381/hscard",
      {
        headers: {
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
          "x-rapidapi-key": a567d21a28mshed82c55f8ea7788p1ba38djsn193b5bbf29a9
        }
      }
    );

    cache.set("live", response.data);

    console.log("🔥 API HIT");
    res.json(response.data);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "API error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
