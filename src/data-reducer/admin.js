export const mapPricings = (pricings) => {
  return [
    { name: 'ÁFA', value: pricings.vatPercent },
    {
      name: 'Légi üzemanyagdíj',
      value: pricings.airFuelFarePercent,
    },
    {
      name: 'Közúti üzemanyagdíj',
      value: pricings.roadFuelFarePercent,
    },
    { name: 'Express 9h nemzetközi', value: pricings.express9h },
    { name: 'Express 9h magyar', value: pricings.express9hHun },
    { name: 'Express 12h nemzetközi', value: pricings.express12h },
    { name: 'Express 12h magyar', value: pricings.express12hHun },
    { name: 'Biztosítási limit', value: pricings.insuranceLimit },
    { name: 'Minimum biztosítás', value: pricings.minInsurance },
    { name: 'EXT-díj', value: pricings.ext },
    { name: 'RAS-díj', value: pricings.ras },
    { name: 'TK-díj', value: pricings.tk },
  ];
};
