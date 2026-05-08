import axios from 'axios';

const client = axios.create({
  baseURL: 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags',
  timeout: 10000,
});

export const countriesApi = {
  getAll: () => client.get('/all'),
};