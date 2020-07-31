const constants = {
  BASE_URL: 'https://cashcalc-backend.herokuapp.com/',
  API_ROUTES: {
    LOGIN: 'login',
    REFRESH: 'reshresh',
    CALC: 'calc',
    COUNTRIES_AIR: 'countries/air',
    COUNTRIES_ROAD: 'countries/road',
    PRICINGS_AIR: 'pricings/air',
    PRICINGS_ROAD: 'pricings/road',
    PRICINGS_AIR_FARES: 'pricings/air/fares/',
    PRICINGS_ROAD_FARES: 'pricings/road/fares/',
    PRICING_VARIABLES: 'pricingvariables',
  },
  ROUTES: {
    HOME: 'home',
    LOGIN: 'login',
    CALCULATOR: 'calculator',
    ADMIN: 'admin',
    SUPERUSER: 'superuser',
  },
  ROLES: {
    null: 0,
    carrier: 0,
    admin: 1,
    superuser: 2,
  },
};

export default constants;
