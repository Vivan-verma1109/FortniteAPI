const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware to allow CORS and serve static files
app.use(cors({ origin: "http://localhost:3000" })); // Allow CORS for frontend requests
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' folder

// Helper function to build a lookup table for cosmetics by normalized name
const buildCosmeticsLookup = (cosmeticsData) => {
  const lookup = {};
  cosmeticsData.forEach((cosmetic) => {
    if (cosmetic.name) {
      const normalizedCosmeticName = cosmetic.name.trim().toLowerCase();
      lookup[normalizedCosmeticName] = cosmetic;
    }
  });
  return lookup;
};

// Helper function to normalize shop item names from devName
const normalizeShopItemName = (devName) => {
  const match = devName.match(/x\s(.+)\sfor/);
  return match ? match[1].trim().toLowerCase() : null;
};

// Endpoint to fetch Fortnite shop data with images
app.get("/api/shop", async (req, res) => {
  try {
    console.log("Received request for /api/shop");

    // Fetch shop data
    const shopResponse = await axios.get("https://fortnite-api.com/v2/shop");
    const shopData = shopResponse.data;

    // Fetch cosmetics data from the updated endpoint
    const cosmeticsResponse = await axios.get("https://fortnite-api.com/v2/cosmetics/br");
    const cosmeticsData = cosmeticsResponse.data.data || [];

    // Build a lookup table for cosmetics
    const cosmeticsLookup = buildCosmeticsLookup(cosmeticsData);

    // Process shop data and attach images
    const shopWithImages = shopData.data.entries.map((shopItem) => {
      const normalizedShopItemName = normalizeShopItemName(shopItem.devName);

      const matchingCosmetic =
        normalizedShopItemName && cosmeticsLookup[normalizedShopItemName];

        let mismatchLogged = false;

        if (matchingCosmetic) {
          console.log(`Match found for Shop Item: "${shopItem.devName}"`);
          console.log('Matching Cosmetic:', matchingCosmetic);
        } else if (!mismatchLogged) {
          console.warn(`No match found for Shop Item: "${shopItem.devName}"`);
          mismatchLogged = true;
        }
        
        

      return {
        ...shopItem,
        image: matchingCosmetic?.images?.icon || "https://via.placeholder.com/100?text=No+Image",
      };
    });

    res.json(shopWithImages);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch item shop data with images" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
