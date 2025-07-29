// server/index.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors(), express.json());

// Helper recipes array used by both endpoints
const RECIPES = [
  {
    id: 1,
    title: 'Chicken Curry',
    diet: ['All'],
    thumbnail: '/img/thumb-1.jpg',
    image: '/img/full-1.jpg',
    ingredients: ['1 lb chicken', '2 tbsp curry powder', '1 cup coconut milk'],
    instructions: [
      'Cut chicken into cubes',
      'Season with curry powder',
      'Simmer in coconut milk for 15 min'
    ]
  },
  {
    id: 2,
    title: 'Veggie Lasagna',
    diet: ['All', 'Vegetarian'],
    thumbnail: '/img/thumb-2.jpg',
    image: '/img/full-2.jpg',
    ingredients: ['Lasagna noodles', 'Ricotta cheese', 'Marinara sauce', 'Spinach'],
    instructions: [
      'Preheat oven to 375°F',
      'Layer noodles, sauce, cheese, spinach',
      'Bake for 45 min'
    ]
  },
  {
    id: 3,
    title: 'Beef Tacos',
    diet: ['All', 'Gluten-Free'],
    thumbnail: '/img/thumb-3.jpg',
    image: '/img/full-3.jpg',
    ingredients: ['Taco shells', 'Ground beef', 'Lettuce', 'Cheddar cheese'],
    instructions: [
      'Cook beef with seasoning',
      'Fill shells with beef, lettuce, cheese',
      'Serve immediately'
    ]
  }
];

// ── 1) List/Search endpoint ───────────────────────────────
app.get('/api/recipes', (req, res) => {
  const { query = '', diet = 'All' } = req.query;
  const q = query.toLowerCase().trim();

  const results = RECIPES.filter(r => {
    const matchesText = r.title.toLowerCase().includes(q);
    const matchesDiet = diet === 'All' || r.diet.includes(diet);
    return matchesText && matchesDiet;
  });

  // simulate latency
  setTimeout(() => res.json(results), 500);
});

// ── 2) Details endpoint ────────────────────────────────────
app.get('/api/recipes/:id', (req, res) => {
  const recipe = RECIPES.find(r => r.id === +req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Not found' });

  // return the full detail
  res.json({
    id: recipe.id,
    title: recipe.title,
    diet: recipe.diet,
    image: recipe.image,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions
  });
});

// ── 3) Start server ───────────────────────────────────────
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
