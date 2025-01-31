const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/shop", async (req, res) => {
  try {
    console.log("Fetching shop data...");

    // Use axios instead of fetch
    const shopResponse = await axios.get("https://fortnite-api.com/v2/shop");
    const shopData = shopResponse.data;

    if (!shopData || !shopData.data) {
      return res.status(500).json({ error: "Invalid shop data from API" });
    }

    const shopItems = shopData.data.entries.slice(0, 7).map((item) => ({
      devName: item.devName,
      finalPrice: item.finalPrice || "Unknown",
      image: item.images?.icon || "https://via.placeholder.com/100?text=No+Image",
    }));

    res.json(shopItems);
  } catch (error) {
    console.error("Error fetching shop data:", error.message);
    res.status(500).json({ error: "Failed to fetch item shop data" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
