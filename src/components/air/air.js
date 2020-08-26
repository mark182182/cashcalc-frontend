import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Typography,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
  Checkbox,
  FormHelperText,
  TextField,
  Dialog,
  Button,
} from '@material-ui/core';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
  mapCountries,
  mapWeights,
  isEUCountry,
} from '../../data-reducer/countries';
import { Result } from '../result/result';
import { getCountriesAir, resetCountry } from '../../action/country';
import { getPricesAir, resetPrices } from '../../action/air';
import { calculate } from '../../action/calculation';
import './air.scss';

const mapDispatch = (dispatch) => {
  return {
    getCountriesAir: () => dispatch(getCountriesAir()),
    resetCountry: () => dispatch(resetCountry()),
    getPricesAir: (zoneNumber) => dispatch(getPricesAir(zoneNumber)),
    resetPrices: () => dispatch(resetPrices()),
    calculate: (calc) => dispatch(calculate(calc)),
  };
};

const AirConnected = (props) => {
  const insurance = useRef(null);
  const [country, setCountry] = useState({});
  const [weight, setWeight] = useState({});
  const [weights, setWeights] = useState([]);
  const [discount, setDiscount] = useState('10');
  const [express, setExpress] = useState('worldwide');
  const [additional, setAdditional] = useState([]);
  const [isDoxDisabled, setIsDoxDisabled] = useState(false);
  const [openAirResult, setOpenAirResult] = useState(false);

  useEffect(() => {
    props.getCountriesAir();
  }, []);

  useEffect(() => {
    if (props.weights && props.weights.length > 0) {
      setWeights(mapWeights(props.weights));
    }
  }, [props.weights]);

  useEffect(() => {
    setWeights([]);
    setWeight({});
    setAdditional([]);
  }, [country]);

  useEffect(() => {
    return () => {
      props.resetCountry();
      props.resetPrices();
    };
  }, []);

  const setCountryAndLoadWeights = (value) => {
    setCountry(value);
    props.getPricesAir(value.zoneNumber);
  };

  const setWeightAndDox = (value) => {
    if (value.value > 2) {
      setIsDoxDisabled(true);
      const filteredValues = additional.filter((elem) => elem !== 'dox');
      setAdditional([...filteredValues]);
    } else {
      setIsDoxDisabled(false);
    }
    setWeight(value);
  };

  const handleCalculate = () => {
    const calc = {
      transferType: 'air',
      zoneNumber: country.zoneNumber,
      weight: parseFloat(weight.value),
      insurance: parseInt(insurance.current.value),
      discountPercent: parseFloat(discount),
      expressType: express,
      isDocument: additional.includes('dox'),
      isExt: additional.includes('ext'),
      isTk: additional.includes('tk'),
      isRas: additional.includes('ras'),
    };
    try {
      validateCalculation(calc);
      props.calculate(calc);
      setOpenAirResult(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const validateCalculation = (calc) => {
    if (!calc.zoneNumber || calc.zoneNumber <= 0) {
      console.log(calc.zoneNumber);
      throw new Error('Country is invalid!');
    }
    if (isNaN(calc.weight) || calc.weight <= 0) {
      throw new Error('Weight is invalid!');
    }
    if (isNaN(calc.insurance) || calc.insurance <= 0) {
      throw new Error('Insurance is invalid!');
    }
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleExpressChange = (event) => {
    setExpress(event.target.value);
  };

  const handleAdditionalChange = (event) => {
    const value = event.target.value;
    if (additional.includes(value)) {
      const filteredValues = additional.filter((elem) => elem !== value);
      setAdditional([...filteredValues]);
    } else {
      setAdditional([...additional, event.target.value]);
    }
  };

  const closeAirResult = () => {
    setOpenAirResult(false);
  };

  return (
    <Grid>
      {props.countries !== null && (
        <Grid container item className="air-container">
          {props.resultIsLoading === false && (
            <Dialog open={openAirResult} onClose={closeAirResult} fullWidth>
              <Result
                close={closeAirResult}
                type="air"
                calc={props.result}
                express={express}
              />
            </Dialog>
          )}
          <Typography variant="h5">Légi/belföld transzport</Typography>
          <Grid container item direction="column">
            <Typography variant="subtitle2">Ország</Typography>
            <Select
              styles={{
                menu: (props) => ({ ...props, zIndex: 9999 }),
              }}
              placeholder="Kiválasztás..."
              noOptionsMessage={() => 'Nincs opció'}
              loadingMessage={() => 'Betöltés...'}
              options={mapCountries(props.countries)}
              onChange={(value) => setCountryAndLoadWeights(value)}
            />
          </Grid>
          <Grid container item direction="column">
            <Typography variant="subtitle2">Súly (kg)</Typography>
            {country && country.zoneNumber ? (
              <Select
                styles={{
                  menu: (props) => ({ ...props, zIndex: 9999 }),
                }}
                placeholder="Kiválasztás..."
                noOptionsMessage={() => 'Nincs opció'}
                loadingMessage={() => 'Betöltés...'}
                options={weights}
                value={weight}
                onChange={(value) => setWeightAndDox(value)}
              />
            ) : (
              <Select
                options={[]}
                value={{}}
                placeholder="Kiválasztás..."
                isDisabled={true}
              ></Select>
            )}
            <Typography variant="caption">
              Adj meg 0.5 és 200 kg közötti súlyt.
            </Typography>
          </Grid>
          <Grid container item direction="column">
            <Typography variant="subtitle2">Biztosítási összeg (Ft)</Typography>
            <TextField
              className="input"
              type="number"
              variant="outlined"
              required
              inputRef={insurance}
            />
          </Grid>
          <Grid container item>
            <FormControl className="air-discount-formcontrol">
              <FormLabel>Kedvezmény</FormLabel>
              <RadioGroup
                name="discount"
                value={discount}
                onChange={handleDiscountChange}
              >
                <FormControlLabel value="10" control={<Radio />} label="10%" />
                <FormControlLabel value="20" control={<Radio />} label="20%" />
                <FormControlLabel value="30" control={<Radio />} label="30%" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid container item>
            <FormControl className="air-express-formcontrol">
              <FormLabel>Express csomag?</FormLabel>
              <RadioGroup
                name="express"
                value={express}
                onChange={handleExpressChange}
              >
                <FormControlLabel
                  value="worldwide"
                  control={<Radio />}
                  label="Express Worldwide"
                />
                <FormControlLabel
                  value="9h"
                  control={<Radio />}
                  label="Express 9h"
                />
                <FormControlLabel
                  value="12h"
                  control={<Radio />}
                  label="Express 12h"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid container item>
            <FormControl className="air-additional-formcontrol">
              <FormLabel>Kiegészítő opciók</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      additional.includes('dox') &&
                      !isEUCountry(country.zoneNumber)
                    }
                    onChange={handleAdditionalChange}
                    value="dox"
                    disabled={isEUCountry(country.zoneNumber) || isDoxDisabled}
                  />
                }
                label="DOX"
              />
              <FormHelperText>
                Amennyiben az ügyfél EU-n kívüli területre küld dokumentumot,
                ikszeld be!
              </FormHelperText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={additional.includes('ext')}
                    onChange={handleAdditionalChange}
                    value="ext"
                  />
                }
                label="EXT"
              />
              <FormHelperText>
                Amennyiben az ügyfél küldeménye dokumentum, és szeretné
                biztosítani, ikszeld be!
              </FormHelperText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={additional.includes('ras')}
                    onChange={handleAdditionalChange}
                    value="ras"
                  />
                }
                label="RAS"
              />
              <FormHelperText>
                Amennyiben a küldemény kieső területre megy, ikszeld be!
              </FormHelperText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={additional.includes('tk')}
                    onChange={handleAdditionalChange}
                    value="tk"
                  />
                }
                label="TK"
              />
              <FormHelperText>
                Amennyiben az ügyfél lakóövezetbe kéri a kézbesítést (ODD),
                ikszeld be!
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container item justify="flex-end">
            <Button
              onClick={() => handleCalculate()}
              className="air-calculate-button"
            >
              Számítsd ki!
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const mapState = (state) => {
  return {
    countries: state.countryReducer.countries,
    weights: state.airReducer.weights,
    weightsStatus: state.airReducer.weightsStatus,
    result: state.calcReducer.result,
    resultIsLoading: state.calcReducer.isLoading,
  };
};

const Air = connect(mapState, mapDispatch)(AirConnected);
export default Air;
