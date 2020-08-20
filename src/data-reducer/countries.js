export const mapCountries = (countries) => {
  return countries.map((country) => {
    return {
      value: country.name,
      label: country.name,
      zoneNumber: country.zoneNumber,
    };
  });
};

export const mapWeights = (weights) => {
  return weights.map(weight => {
    return {
      value: weight.weight,
      label: weight.weight,
    }
  })
}

export const isEUCountry = (zoneNumber) => {
  return zoneNumber <= 4 && zoneNumber >= 0;
};
