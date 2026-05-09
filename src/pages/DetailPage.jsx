import React, { useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCountriesStore, useFavoritesStore } from '../store';
import { useCountries } from '../hooks/useCountries';
import {
  formatPopulation, formatArea, getLanguages,
  getCurrencies, getCapital
} from '../utils/countryUtils';

const DetailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { loading, error } = useCountries();
  const countries = useCountriesStore((s) => s.countries);
  const country = countries.find((c) => c.cca3.toUpperCase() === code?.toUpperCase());

  const isFavorite = useFavoritesStore((s) => s.isFavorite(code));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const handleFav = useCallback(() => toggleFavorite(code), [toggleFavorite, code]);

  const borderCountries = useMemo(() => {
  if (!country?.borders) return [];
  return country.borders
    .map((bc) => countries.find((c) => c.cca3 === bc))
    .filter(Boolean);
  }, [country, countries]);

  if (loading) return <DetailSkeleton />;

  if (error || !country) {
    return (
      <div className="state-container">
        <div className="error-state">
          <span className="state-icon">🌍</span>
          <h2>{error ? 'Error loading data' : 'Country not found'}</h2>
          <button className="retry-btn" onClick={() => navigate('/')}>← Back to Explore</button>
        </div>
      </div>
    );
  }

  return (
    <main className="page-content detail-page">
      <div className="detail-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft /> Back
        </button>
        <button
          className={`fav-btn-lg ${isFavorite ? 'fav-btn-lg--active' : ''}`}
          onClick={handleFav}
        >
          <HeartIcon filled={isFavorite} />
          {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>

      <div className="detail-grid">
        <div className="detail-flag-col">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.flags?.alt || `Flag of ${country.name.common}`}
            className="detail-flag"
          />
          {country.coatOfArms?.svg && (
            <div className="coat-of-arms">
              <p className="section-label">Coat of Arms</p>
              <img src={country.coatOfArms.svg} alt="Coat of Arms" className="coa-img" />
            </div>
          )}
        </div>

        <div className="detail-info-col">
          <h1 className="detail-name">{country.name.common}</h1>
          <p className="detail-official">{country.name.official}</p>

          <div className="detail-stats">
            <StatItem label="Region" value={country.region} />
            <StatItem label="Subregion" value={country.subregion || 'N/A'} />
            <StatItem label="Capital" value={getCapital(country.capital)} />
            <StatItem label="Population" value={formatPopulation(country.population)} />
            <StatItem label="Area" value={formatArea(country.area)} />
            <StatItem label="Continents" value={country.continents?.join(', ') || 'N/A'} />
            <StatItem label="Languages" value={getLanguages(country.languages)} />
            <StatItem label="Currencies" value={getCurrencies(country.currencies)} />
            <StatItem label="TLD" value={country.tld?.join(', ') || 'N/A'} />
            <StatItem label="Timezones" value={country.timezones?.join(', ') || 'N/A'} />
          </div>

          {borderCountries.length > 0 && (
            <div className="border-countries">
              <p className="section-label">Border Countries</p>
              <div className="border-tags">
                {borderCountries.map((bc) => (
                  <Link key={bc.cca3} to={`/country/${bc.cca3}`} className="border-tag">
                    <img src={bc.flags?.svg || bc.flags?.png} alt={bc.name.common} className="border-flag" />
                    {bc.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {country.maps?.googleMaps && (
            <a href={country.maps.googleMaps} target="_blank" rel="noreferrer" className="map-link">
              <MapIcon /> View on Google Maps
            </a>
          )}
        </div>
      </div>
    </main>
  );
};

const StatItem = ({ label, value }) => (
  <div className="stat-item">
    <dt className="stat-label">{label}</dt>
    <dd className="stat-value">{value}</dd>
  </div>
);

const DetailSkeleton = () => (
  <main className="page-content detail-page">
    <div className="detail-nav">
      <div className="skeleton-line" style={{ width: 80, height: 36, borderRadius: 8 }} />
    </div>
    <div className="detail-grid">
      <div className="skeleton-flag-lg" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="skeleton-line" style={{ width: '60%', height: 32 }} />
        <div className="skeleton-line" style={{ width: '40%', height: 20 }} />
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="skeleton-line" style={{ width: `${50 + Math.random() * 40}%`, height: 16 }} />
        ))}
      </div>
    </div>
  </main>
);

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill={filled ? 'currentColor' : 'none'}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

export default DetailPage;
