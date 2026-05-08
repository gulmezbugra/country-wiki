export const sortCountriesByName = (countries) =>
  [...countries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

export const formatPopulation = (num) => {
  if (!num) return 'N/A';
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toLocaleString();
};

export const formatArea = (area) => {
  if (!area) return 'N/A';
  return `${area.toLocaleString()} km²`;
};

export const getLanguages = (languages) => {
  if (!languages) return 'N/A';
  return Object.values(languages).join(', ');
};

export const getCurrencies = (currencies) => {
  if (!currencies) return 'N/A';
  return Object.values(currencies)
    .map((c) => `${c.name} (${c.symbol || '?'})`)
    .join(', ');
};

export const getCapital = (capital) => {
  if (!capital || capital.length === 0) return 'N/A';
  return capital.join(', ');
};
