const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Recipe = require('./models/Recipe');
const app = express();

mongoose.connect('mongodb://localhost:5000/spoonacular', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/recipes', async (req, res) => {
  try {
    const ingredients = req.query.ingredients; // Example: 'apples,flour,sugar'
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=7958c32d98f9404daf20da935220357a&ingredients=${ingredients}&number=3`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const recipes = data.map((recipe) => ({
      title: recipe.title,
      image: recipe.image,
      instructions: recipe.instructions,
      missedIngredients: recipe.missedIngredients.map((ingredient) => ingredient.name),
    }));

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching recipes');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});