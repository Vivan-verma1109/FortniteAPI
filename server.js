const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (e.g., index.html, styles.css)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch item data
app.get('/items', async (req, res) => {
    try {
        const response = await axios.get('https://fortnite-api.com/v2/shop');
        const entries = response.data.data.entries;

        const groupedItems = {};

        entries.forEach(entry => {
            if (entry.brItems && entry.brItems.length > 0) {
                entry.brItems.forEach(brItem => {
                    const setName = brItem.set?.value || 'No Set';

                    if (!groupedItems[setName]) {
                        groupedItems[setName] = [];
                    }

                    groupedItems[setName].push({
                        id: brItem.id,
                        name: brItem.name,
                        imageUrl: brItem.images?.icon || null,
                        price: entry.finalPrice
                    });
                });
            }
        });

        res.json(groupedItems);
    } catch (error) {
        console.error('Error fetching Fortnite shop data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
