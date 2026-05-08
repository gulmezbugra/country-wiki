import React from 'react';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-flag" />
    <div className="skeleton-body">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-short" />
      <div className="skeleton-line skeleton-medium" />
      <div className="skeleton-line skeleton-short" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 20 }) => (
  <div className="countries-grid">
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
