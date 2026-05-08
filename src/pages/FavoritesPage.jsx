import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesStore, useCountriesStore } from '../store';
import { useCountries } from '../hooks/useCountries';
import CountryCard from '../components/CountryCard';
import { SkeletonGrid } from '../components/SkeletonCard';

const FavoritesPage = () => {
  const { loading } = useCountries();
  const favorites = useFavoritesStore((s) => s.favorites);
  const countries = useCountriesStore((s) => s.countries);

  const favoriteCountries = countries.filter((c) => favorites.includes(c.cca3));

  if (loading) return (
    <main className="page-content">
      <div className="page-header">
        <h1 className="page-title">My Favorites</h1>
      </div>
      <SkeletonGrid count={8} />
    </main>
  );

  return (
    <main className="page-content">
      <div className="page-header">
        <h1 className="page-title">My Favorites</h1>
        <p className="page-subtitle">
          {favoriteCountries.length > 0
            ? `${favoriteCountries.length} ${favoriteCountries.length === 1 ? 'country' : 'countries'} saved`
            : 'Your collection is empty'}
        </p>
      </div>

      {favoriteCountries.length === 0 ? (
        <div className="state-container">
          <div className="empty-state">
            <span className="state-icon">💛</span>
            <h2>No favorites yet</h2>
            <p>Tap the heart on any country card to save it here.</p>
            <Link to="/" className="retry-btn">Explore Countries</Link>
          </div>
        </div>
      ) : (
        <div className="countries-grid">
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;
