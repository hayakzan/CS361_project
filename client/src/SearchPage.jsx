// src/SearchPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

const DIETS = ['All', 'Vegetarian', 'Vegan', 'Gluten-free'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('All');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [latency, setLatency] = useState(null);


  const doSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a keyword.');
      return;
    }
    setError('');
    setLoading(true);
    setLatency(null);                              // reset previous time

    const start = performance.now();               // start timer

    try {
      const res = await fetch(
        `http://localhost:4000/api/recipes?query=${query}&diet=${diet}`
      );
      const data = await res.json();
      setResults(data);
    } catch {
      setError('Unable to fetch recipes—please try again later.');
    } finally {
      setLoading(false);
      const end = performance.now();                // stop timer
      // convert to seconds, round to one decimal place
      setLatency(((end - start) / 1000).toFixed(1));
    }
  };

  return (
    <div className="search-page">
      {/* Breadcrumb with logo + text */}
      <nav className="breadcrumb">
        {/* Logo as Home link */}
        <Link to="/" className="logo-link" aria-label="Home">
          <img src="/img/icon.png" alt="" />
        </Link>
        {/* Text breadcrumb */}
        <Link to="/">Home</Link> &gt; Search
      </nav>

      {/* Search controls */}
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search recipes..."
          className="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <div className="diet-filter-container">
          <select
            className="diet-filter"
            value={diet}
            onChange={e => setDiet(e.target.value)}
            aria-describedby="diet-tooltip"
          >
            {DIETS.map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <span
            className="tooltip-icon"
            tabIndex={0}
            aria-describedby="diet-tooltip"
          >
            ℹ️
          </span>
          <div id="diet-tooltip" role="tooltip" className="tooltip-text">
            Filter recipes by dietary preference (Vegetarian, Vegan, Gluten‑free)
            so you only see meals that match your needs.
          </div>
        </div>

        <button
          className="search-button"
          onClick={doSearch}
          disabled={!query.trim() || loading}
        >
          {loading ? 'Searching…' : 'Search'}
        </button>

        {latency !== null && !loading && (
          <div className="search-latency">
            Search completed in ≈{latency} s
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Results */}
      <div className="results-container">
        <h2 className="results-title">Results</h2>
        <div className="results-grid">
          {results.map(r => (
            <Link to={`/recipes/${r.id}`} key={r.id} className="recipe-card">
              <img
                src={r.thumbnail}
                alt={r.title}
                className="recipe-thumbnail"
              />
              <h3 className="recipe-title">{r.title}</h3>
            </Link>
          ))}
          {results.length === 0 && !loading && (
            <div className="no-results">
              No recipes found. Try a different search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
