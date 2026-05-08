import React, { memo } from 'react';

const REGIONS = ['All', 'Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania'];

const SearchBar = memo(({ search, onSearch, region, onRegion, total, visible }) => (
  <div className="search-bar">
    <div className="search-input-wrap">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
        aria-label="Search countries"
      />
      {search && (
        <button className="clear-btn" onClick={() => onSearch('')} aria-label="Clear search">×</button>
      )}
    </div>
    <div className="region-filters">
      {REGIONS.map((r) => (
        <button
          key={r}
          className={`region-btn ${region === r ? 'region-btn--active' : ''}`}
          onClick={() => onRegion(r)}
        >
          {r}
        </button>
      ))}
    </div>
    <p className="results-count">
      Showing <strong>{visible}</strong> of <strong>{total}</strong> countries
    </p>
  </div>
));

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

SearchBar.displayName = 'SearchBar';
export default SearchBar;
