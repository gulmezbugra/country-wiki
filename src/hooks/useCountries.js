import { useEffect } from 'react';
import { countriesApi } from '../api/countriesApi';
import { useCountriesStore } from '../store';
import { sortCountriesByName } from '../utils/countryUtils';

export const useCountries = () => {
  const { countries, loading, error, fetched, setCountries, setLoading, setError } =
    useCountriesStore();

  useEffect(() => {
    if (fetched || loading) return;

    const fetchCountries = async () => {
      setLoading(true);
      try {
        const { data } = await countriesApi.getAll();
        setCountries(sortCountriesByName(data));
      } catch (err) {
        setError(err.message || 'Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [fetched, loading, setCountries, setLoading, setError]);

  return { countries, loading, error };
};
