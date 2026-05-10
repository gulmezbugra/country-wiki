import axios from 'axios';

const client = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
});

export const countriesApi = {
  getAll: () => client.get('/all?fields=name,capital,currencies,flags,cca3,region,subregion,population,area,languages,borders,coatOfArms,maps,continents,tld,timezones'),
};
