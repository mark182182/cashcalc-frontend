export const mapCountries = (countries) => {
  return countries.map((country) => {
    return { value: country.name, label: country.name };
  });
};
