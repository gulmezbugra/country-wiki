import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:code" element={<DetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);

const NotFound = () => (
  <div className="state-container">
    <div className="empty-state">
      <span className="state-icon">🗺</span>
      <h2>Page not found</h2>
      <p>This destination doesn't exist on our map.</p>
      <a href="/" className="retry-btn">Go Home</a>
    </div>
  </div>
);

export default App;
