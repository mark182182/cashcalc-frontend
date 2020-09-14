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
  Button,
  Dialog,
  CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getCountriesRoad, resetCountry } from '../../action/country';
import { Result } from '../result/result';
import { mapCountries, mapWeights } from '../../data-reducer/countries';
import { calculate } from '../../action/calculation';
import { resetPrices, getPricesRoad } from '../../action/road';
import './road.scss';

const mapDispatch = (dispatch) => {
  return {
    getCountriesRoad: () => dispatch(getCountriesRoad()),
    resetCountry: () => dispatch(resetCountry()),
    getPricesRoad: (zoneNumber) => dispatch(getPricesRoad(zoneNumber)),
    resetPrices: () => dispatch(resetPrices()),
    calculate: (calc) => dispatch(calculate(calc)),
  };
};

const RoadConnected = (props) => {
  const insurance = useRef(null);
  const [country, setCountry] = useState({});
  const [weight, setWeight] = useState({});
  const [weights, setWeights] = useState([]);
  const [discount, setDiscount] = useState('10');
  const [additional, setAdditional] = useState([]);
  const [openRoadResult, setOpenRoadResult] = useState(false);

  useEffect(() => {
    props.getCountriesRoad();
    return () => {
      props.resetCountry();
      props.resetPrices();
    };
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

  const setCountryAndLoadWeights = (value) => {
    setCountry(value);
    props.getPricesRoad(value.zoneNumber);
  };

  const handleCalculate = () => {
    const calc = {
      transferType: 'road',
      zoneNumber: country.zoneNumber,
      weight: parseFloat(weight.value),
      insurance: parseInt(insurance.current.value),
      discountPercent: parseFloat(discount),
      expressType: 'worldwide',
      isDocument: false,
      isExt: false,
      isTk: additional.includes('tk'),
      isRas: additional.includes('ras'),
    };
    try {
      validateCalculation(calc);
      props.calculate(calc);
      setOpenRoadResult(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const validateCalculation = (calc) => {
    if (!calc.zoneNumber || calc.zoneNumber <= 0) {
      throw new Error('Country is invalid!');
    }
    if (isNaN(calc.weight) || calc.weight <= 0) {
      throw new Error('Weight is invalid!');
    }
    if (isNaN(calc.insurance) || calc.insurance < 0) {
      throw new Error('Insurance is invalid!');
    }
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
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

  const closeRoadResult = () => {
    setOpenRoadResult(false);
  };

  return (
    <Grid>
      <Grid container item className="road-container">
        {props.countries !== null ? (
          <>
            {props.resultIsLoading === false && (
              <Dialog open={openRoadResult} onClose={closeRoadResult} fullWidth>
                <Result
                  close={closeRoadResult}
                  type="road"
                  calc={props.result}
                  express={'worldwide'}
                />
              </Dialog>
            )}
            <Typography variant="h5">Közúti transzport</Typography>
            <Grid container item direction="column">
              <Typography variant="subtitle2">Ország</Typography>
              <Select
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
                  onChange={(value) => setWeight(value)}
                />
              ) : (
                <Select
                  options={[]}
                  value={{}}
                  placeholder="Kiválasztás..."
                  isDisabled={true}
                ></Select>
              )}
            </Grid>
            <Grid container item direction="column">
              <Typography variant="subtitle2">
                Biztosítási összeg (Ft)
              </Typography>
              <TextField
                className="input"
                type="number"
                variant="outlined"
                required
                defaultValue={0}
                InputProps={{ inputProps: { min: 0 } }}
                inputRef={insurance}
              />
            </Grid>
            <Grid container item>
              <FormControl className="road-discount-formcontrol">
                <FormLabel>Kedvezmény</FormLabel>
                <RadioGroup
                  name="discount"
                  value={discount}
                  onChange={handleDiscountChange}
                >
                  <FormControlLabel
                    value="10"
                    control={<Radio />}
                    label="10%"
                  />
                  <FormControlLabel
                    value="20"
                    control={<Radio />}
                    label="20%"
                  />
                  <FormControlLabel
                    value="30"
                    control={<Radio />}
                    label="30%"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid container item>
              <FormControl className="road-additional-formcontrol">
                <FormLabel>Kiegészítő opciók</FormLabel>
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
                className="road-calculate-button"
              >
                Számítsd ki!
              </Button>
            </Grid>
          </>
        ) : (
          <Grid container item justify="center">
            <CircularProgress disableShrink={true} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    countries: state.countryReducer.countries,
    weights: state.roadReducer.weights,
    weightsStatus: state.roadReducer.weightsStatus,
    result: state.calcReducer.result,
    resultIsLoading: state.calcReducer.isLoading,
  };
};

const Road = connect(mapState, mapDispatch)(RoadConnected);
export default Road;
