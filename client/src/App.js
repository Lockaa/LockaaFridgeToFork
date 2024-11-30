
import React, {useState, useEffect} from 'react';

import './App.css';

const App = () => {
  const [zip, setZip] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds, setMinBeds] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [minBaths, setMinBaths] = useState('');
  const [maxBaths, setMaxBaths] = useState('');
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
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=7958c32d98f9404daf20da935220357a&query=pasta&maxFat=25&number=2`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Zillow Search</h1>
      <div className="form-group">
        <input className="form-control" type="text" placeholder="Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
        <input className="form-control" type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input className="form-control" type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <input className="form-control" type="number" placeholder="Min Beds" value={minBeds} onChange={(e) => setMinBeds(e.target.value)} />
        <input className="form-control" type="number" placeholder="Max Beds" value={maxBeds} onChange={(e) => setMaxBeds(e.target.value)} />
        <input className="form-control" type="number" placeholder="Min Baths" value={minBaths} onChange={(e) => setMinBaths(e.target.value)} />
        <input className="form-control" type="number" placeholder="Max Baths" value={maxBaths} onChange={(e) => setMaxBaths(e.target.value)} />
        <button className="btn" onClick={handleSearch}>Search</button>
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
