const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors()); // Allow CORS for frontend requests
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' folder

// Endpoint to fetch Fortnite shop data with images
app.get("/api/shop", async (req, res) => {
  try {
    console.log("Received request for /api/shop");

    const shopResponse = await axios.get("https://fortnite-api.com/v2/shop");
    const shopData = shopResponse.data;
    console.log("Shop API data received");

    const cosmeticsResponse = await axios.get("https://fortnite-api.com/v2/cosmetics");
    const cosmeticsData = cosmeticsResponse.data;
    console.log("Cosmetics API data received");

    const flattenedCosmetics = Object.values(cosmeticsData.data).flat();
    console.log("Flattened cosmetics data length:", flattenedCosmetics.length);

    const shopWithImages = shopData.data.entries.map((shopItem) => {
      const matchingCosmetic = flattenedCosmetics.find(
        (cosmetic) =>
          cosmetic.name &&
          cosmetic.name.toLowerCase() === shopItem.devName.toLowerCase()
      );

      return {
        ...shopItem,
        image: matchingCosmetic?.images?.icon || "https://via.placeholder.com/100?text=No+Image",
      };
    });

    console.log("Shop with images:", shopWithImages.slice(0, 5)); // Log first 5 items for debugging
    res.json(shopWithImages);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch item shop data with images" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
