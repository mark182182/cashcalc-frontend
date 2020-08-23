const constants = {
  BASE_URL: `${process.env.REACT_APP_BASE_URL}`,
  API_ROUTES: {
    LOGIN: 'login',
    IS_AUTHORIZED: 'is-authorized',
    LOGOUT: 'logout',
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
    carrier: 'carrier',
    admin: 'admin',
    superuser: 'superuser',
  },
  RIGHTS: {
    carrier: 1,
    admin: 2,
    superuser: 3,
  },
};

export default constants;
