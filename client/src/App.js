import React, { useState } from 'react';
import './App.css';

function App() 
{
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipeCard, setRecipeCard] = useState(null);

  const fetchIngredients = async () => 
  {
    try 
    {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=7958c32d98f9404daf20da935220357a&ingredients=${ingredients}&number=3`);     
      if (!response.ok) 
      {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipes(data);

    } 
    catch (error) 
    {
      console.error('Error fetching recipes', error);
    }
    setRecipeCard(null);
  };


  const fetchRecipeCard = async (id) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/card?apiKey=7958c32d98f9404daf20da935220357a&`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipeCard(data);
    } catch (error) {
      console.error('Error fetching recipe card', error);
    }
  };


  return (
    <div className="App">
      <div className="background"></div>
      <div className="content">
        <h1>Recipe Finder</h1>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
          className="input"
        />
        <button onClick={fetchIngredients} className="button">Find Recipes</button>

        <div className="recipes">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h2> <span classname="recipe-title"> {recipe.title} </span></h2>
              <h3> <span className="missed-ingredients-title"> Missing Ingredients: {(recipe.missedIngredients.map(item=> item.name)).join(', ')}</span></h3>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.instructions}</p>
              <button onClick={() => fetchRecipeCard(recipe.id)} className="button">Get Recipe Card</button>
            </div>
          ))}
        </div>

        {recipeCard && (
          <div className="recipe-card-display">
            <img src={recipeCard.url} alt="Recipe Card" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;