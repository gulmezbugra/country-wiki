import React, { useState, useMemo } from 'react';
import { useCountries } from '../hooks/useCountries';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import { SkeletonGrid } from '../components/SkeletonCard';

const HomePage = () => {
  const { countries, loading, error } = useCountries();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');

  const filtered = useMemo(() => {
    let result = countries;
    if (region !== 'All') {
      result = result.filter((c) => c.region === region);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.common.toLowerCase().includes(q) ||
          c.name.official?.toLowerCase().includes(q) ||
          c.capital?.[0]?.toLowerCase().includes(q) ||
          c.region?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [countries, search, region]);

  const { visibleItems, hasMore, loaderRef } = useInfiniteScroll(filtered);

  if (error) {
    return (
      <div className="state-container">
        <div className="error-state">
          <span className="state-icon">⚠</span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="page-content">
      <div className="page-header">
        <h1 className="page-title">Explore the World</h1>
        <p className="page-subtitle">Discover facts about every country on Earth</p>
      </div>

      {!loading && (
        <SearchBar
          search={search}
          onSearch={setSearch}
          region={region}
          onRegion={setRegion}
          total={filtered.length}
          visible={visibleItems.length}
        />
      )}

      {loading ? (
        <SkeletonGrid count={20} />
      ) : filtered.length === 0 ? (
        <div className="state-container">
          <div className="empty-state">
            <span className="state-icon">🔍</span>
            <h2>No countries found</h2>
            <p>Try adjusting your search or filter.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="countries-grid">
            {visibleItems.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
          {hasMore && (
            <div ref={loaderRef} className="loader-sentinel">
              <div className="spinner" />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;
