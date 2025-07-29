import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <img
        src="/img/icon.png"
        alt="The Meal Planner logo"
        className="home-logo"
      />

      <h1 className="home-title">The Meal Planner</h1>

      <Link to="/search" className="home-cta">
        Get Cooking →
      </Link>
    </div>
  );
}
