// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import DetailsPage from './DetailsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/recipes/:id" element={<DetailsPage />} />
      {/* catch-all redirect back to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
