import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFavoritesStore } from '../store';

const Navbar = () => {
  const favCount = useFavoritesStore((s) => s.favorites.length);

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand">
        <GlobeIcon />
        <span>CountryWiki</span>
      </NavLink>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
          Explore
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => `nav-link nav-link--fav ${isActive ? 'nav-link--active' : ''}`}>
          <HeartIcon />
          <span>Favorites</span>
          {favCount > 0 && <span className="nav-badge">{favCount}</span>}
        </NavLink>
      </nav>
    </header>
  );
};

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default Navbar;
