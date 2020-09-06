export const mapResult = (calc, express) => {
  return [
    {
      name: 'Összesen',
      value: calc.result,
      className: 'result-table-sum-cell',
    },
    {
      name: 'Alapár kedvezménnyel',
      value: calc.baseFare,
      className: 'result-table-cell',
    },
    {
      name: 'Express ' + express,
      value: calc.expressFare,
      className: 'result-table-cell',
    },
    {
      name: 'Biztosítási díj',
      value: calc.insuranceFare,
      className: 'result-table-cell',
    },
    { name: 'EXT-díj', value: calc.extFare },
    {
      name: 'RAS-díj',
      value: calc.rasFare,
      className: 'result-table-cell',
    },
    {
      name: 'TK-díj',
      value: calc.tkFare,
      className: 'result-table-cell',
    },
    {
      name: 'Üzemanyag-pótdíj',
      value: calc.fuelFare,
      className: 'result-table-cell',
    },
    {
      name: 'Vészhelyzeti díj',
      value: calc.emergencyFare,
      className: 'result-table-cell',
    },
  ];
};
