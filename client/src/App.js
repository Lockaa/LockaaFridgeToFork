
import React, {useState, useEffect} from 'react';

import './App.css';

const App = () => {
  const [Ingredient1, setIngredient1] = useState('');
  const [Ingredient2, setIngredient2] = useState('');
  const [Ingredient3, setIngredient3] = useState('');
  const [Ingredient4, setIngredient4] = useState('');
  const [Ingredient5, setIngredient5] = useState('');
  const [results, setResults] = useState(null);
  const [queries, setQueries] = useState([]);
  
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch('/api/queries');
        const data = await response.json();
        setQueries(data);
      } catch (error) {
        console.error('Error fetching search queries:', error);
      }
    };

    fetchQueries();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=7958c32d98f9404daf20da935220357a&ingredients=${Ingredient1},+${Ingredient2},+${Ingredient3},+${Ingredient4},+${Ingredient5}&number=2`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Recipe Maker</h1>
      <div className="form-group">
        <input className="form-control" type="text" placeholder="Ingredient 1" value={Ingredient1} onChange={(e) => setIngredient1(e.target.value)} />
        <input className="form-control" type="text" placeholder="Ingredient 2" value={Ingredient2} onChange={(e) => setIngredient2(e.target.value)} />
        <input className="form-control" type="text" placeholder="Ingredient 3" value={Ingredient3} onChange={(e) => setIngredient3(e.target.value)} />
        <input className="form-control" type="text" placeholder="Ingredient 4" value={Ingredient4} onChange={(e) => setIngredient4(e.target.value)} />
        <input className="form-control" type="text" placeholder="Ingredient 5" value={Ingredient5} onChange={(e) => setIngredient5(e.target.value)} />
        <button className="btn" onClick={handleSearch}>Generate</button>
      </div>

      {results && (
        <div className="results">
          <h2>Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}

      {queries.length > 0 && (
        <div className="queries">
          <h2>Past Searches</h2>
          <ul>
            {queries.map((query, index) => (
              <li key={index}>
                Zip: {query.zip}, Price: ${query.minPrice}-${query.maxPrice}, Beds: {query.minBeds}-{query.maxBeds}, Baths: {query.minBaths}-{query.maxBaths} (on {new Date(query.timestamp).toLocaleString()})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
