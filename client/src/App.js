import React, { useState } from 'react';
import './App.css';

function App() 
{
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => 
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
  };

  return (
    <div className="App">
      <div className="background"></div>
      <div className="content">
        <h1>Fridge to Fork</h1>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
          className="input"
        />
        <button onClick={fetchRecipes} className="button">Plate it</button>

        <div className="recipes">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h2> <span classname="recipe-title"> {recipe.title} </span></h2>
              <h3> <span className="missed-ingredients-title"> Missing Ingredients: {(recipe.missedIngredients.map(item=> item.name)).join(', ')}</span></h3>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.instructions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;