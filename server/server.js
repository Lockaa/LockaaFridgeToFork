// server.js

const express = requi("express");
const fetch = import("node-fetch");
const dotenv = require("dotenv");

dotenv.config();  // To load environment variables

const app = express();
const port = process.env.PORT || 3002;

// Zillow API endpoint and API key
const ZILLOW_API_URL = "https://api.zillow.com/webservice/GetSearchResults.htm";
const ZILLOW_API_KEY = process.env.ZILLOW_API_KEY;  // Store API key in .env

app.use(express.json());

// Endpoint to get search results
app.get("/api/search", async (req, res) => {
  const { zip, priceMin, priceMax, bedrooms, baths } = req.query;

  // Build the Zillow API URL with query parameters
  const url = `${ZILLOW_API_URL}?zws-id=${ZILLOW_API_KEY}&citystatezip=${zip}&priceMin=${priceMin}&priceMax=${priceMax}&bedrooms=${bedrooms}&bathrooms=${baths}`;

  try {
    const response = await fetch(url);
    const data = await response.text();

    if (response.ok) {
      res.status(200).send(data);  // Send raw XML response from Zillow
    } else {
      res.status(400).json({ error: "Error fetching data from Zillow" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
