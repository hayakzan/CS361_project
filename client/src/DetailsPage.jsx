// src/DetailsPage.jsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './DetailsPage.css';

export default function DetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    fetch(`http://localhost:4000/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setRecipe)
      .catch(() => setError('Recipe not found.'));
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div>Loading…</div>;

  return (
    <div className="details-page">
      <nav className="breadcrumb">
        <Link to="/" className="logo-link" aria-label="Home">
          <img src="/img/icon.png" alt="" />
        </Link>

        {/* Text crumbs */}
        <Link to="/">Home</Link>
        {' '}›{' '}
        <Link to="/search">Search</Link>
        {' '}›{' '}
        <span>Details</span>
      </nav>


      <h1 className="title">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="hero-img" />

      {/* Tab Bar */}
      <div className="tab-bar">
        <button
          className={activeTab === 'ingredients' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </button>
        <button
          className={activeTab === 'instructions' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'ingredients' ? (
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        ) : (
          <ol className="instructions-list">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
      </div>

      {/* Action Buttons */}
      <div className="details-actions">
        <Link to="/search" className="back-btn">
          ◀ Back to Results
        </Link>
        <button
          className="nutrition-btn"
          onClick={() => alert('Nutrition view coming soon!')}
        >
          View Nutrition ▶
        </button>
      </div>
    </div>
  );
}
