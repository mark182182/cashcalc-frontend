import { getCountries } from '../request/request';

export const mapCountries = () => {
  return getCountries()
    .map(country => {
      return {
        value: country.zone_number,
        label: country.name
      }
    });
}
