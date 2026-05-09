import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../store';
import { formatPopulation, getCapital } from '../utils/countryUtils';

const CountryCard = memo(({ country }) => {
  const navigate = useNavigate();
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.favorites.includes(country.cca3));

  const handleCardClick = useCallback(() => {
    navigate(`/country/${country.cca3}`);
  }, [navigate, country.cca3]);

  const handleFavoriteClick = useCallback(
    (e) => {
      e.stopPropagation();
      toggleFavorite(country.cca3);
    },
    [toggleFavorite, country.cca3]
  );

  return (
    <article className="country-card" onClick={handleCardClick}>
      <div className="card-flag-wrapper">
        <img 
          src={country.flags.svg || country.flags.png} 
          alt={country.flags.alt || country.name.common} 
          className="card-flag"
          loading="lazy" // Performans için önemli
        />
        <button
          className={`fav-btn ${isFavorite ? 'fav-btn--active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <div className="card-body">
        <h2 className="card-name">{country.name.common}</h2>
        <div className="card-meta">
          <span className="card-region">{country.region}</span>
        </div>
        <dl className="card-details">
          <div className="card-detail-row">
            <dt>Capital</dt>
            <dd>{getCapital(country.capital)}</dd>
          </div>
          <div className="card-detail-row">
            <dt>Population</dt>
            <dd>{formatPopulation(country.population)}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
});

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill={filled ? 'currentColor' : 'none'}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

CountryCard.displayName = 'CountryCard';
export default CountryCard;
