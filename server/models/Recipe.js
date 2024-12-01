const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  instructions: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);