export const mapCountries = (countries) => {
  return countries.map((country) => {
    return {
      value: country.name,
      label: country.name,
      zoneNumber: country.zoneNumber,
    };
  });
};

export const isEUCountry = (zoneNumber) => {
  return zoneNumber <= 4 && zoneNumber >= 0;
};
