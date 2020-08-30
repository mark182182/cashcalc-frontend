export const mapPricings = (pricings) => {
  return [
    { vatPercent: { name: 'ÁFA', value: pricings.vatPercent } },
    {
      airFuelFarePercent: {
        name: 'Légi üzemanyagdíj',
        value: pricings.airFuelFarePercent,
      },
    },
    {
      roadFuelFarePercent: {
        name: 'Közúti üzemanyagdíj',
        value: pricings.roadFuelFarePercent,
      },
    },
    { express9h: { name: 'Express 9h nemzetközi', value: pricings.express9h } },
    {
      express9hHun: { name: 'Express 9h magyar', value: pricings.express9hHun },
    },
    {
      express12h: {
        name: 'Express 12h nemzetközi',
        value: pricings.express12h,
      },
    },
    {
      express12hHun: {
        name: 'Express 12h magyar',
        value: pricings.express12hHun,
      },
    },
    {
      insuranceLimit: {
        name: 'Biztosítási limit',
        value: pricings.insuranceLimit,
      },
    },
    {
      minInsurance: {
        name: 'Minimum biztosítás',
        value: pricings.minInsurance,
      },
    },
    { ext: { name: 'EXT-díj', value: pricings.ext } },
    { ras: { name: 'RAS-díj', value: pricings.ras } },
    { tk: { name: 'TK-díj', value: pricings.tk } },
  ];
};
