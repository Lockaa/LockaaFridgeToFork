const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/zillow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const propertySchema = new mongoose.Schema({
    title: String,
    address: String,
    price: String,
    bedrooms: String,
    bathrooms: String,
    description: String,
});

const Property = mongoose.model('Property', propertySchema);

app.use(express.json());

app.get('/api/search', async (req, res) => {
    const { zip, minPrice, maxPrice, minBeds, maxBeds, minBaths, maxBaths } = req.query;
    const zillowAPIKey = 'YOUR_ZILLOW_API_KEY';
    const zillowURL = `https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zillowAPIKey}&zip=${zip}&minprice=${minPrice}&maxprice=${maxPrice}&minbedrooms=${minBeds}&maxbedrooms=${maxBeds}&minbathrooms=${minBaths}&maxbathrooms=${maxBaths}`;

    try {
        const response = await fetch(zillowURL);
        const data = await response.json();
        const properties = data.results.map(result => ({
            title: result.title,
            address: result.address,
            price: result.price,
            bedrooms: result.bedrooms,
            bathrooms: result.bathrooms,
            description: result.description,
        }));

        // Save properties to MongoDB
        await Property.insertMany(properties);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from Zillow', error });
    }
});

app.get('/api/properties', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties from MongoDB', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;