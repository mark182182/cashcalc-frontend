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
} from '@material-ui/core';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getCountriesRoad, resetCountry } from '../../action/country';
import { Result } from '../result/result';
import { mapCountries } from '../../data-reducer/countries';
import { calculate } from '../../action/calculation';
import { resetPrices } from '../../action/road';
import './road.scss';

const mapDispatch = (dispatch) => {
  return {
    getCountriesRoad: () => dispatch(getCountriesRoad()),
    resetCountry: () => dispatch(resetCountry()),
    resetPrices: () => dispatch(resetPrices()),
    calculate: (calc) => dispatch(calculate(calc)),
  };
};

const RoadConnected = (props) => {
  const insurance = useRef(null);
  const [country, setCountry] = useState([]);
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState(null);
  const [discount, setDiscount] = useState('');
  const [additional, setAdditional] = useState([]);
  const [openRoadResult, setOpenRoadResult] = useState(false);

  useEffect(() => {
    props.getCountriesRoad();
    let generateWeights = [];
    for (let i = 1; i <= 100; ) {
      generateWeights = [...generateWeights, { value: i, label: i }];
      if (i >= 70) {
        i += 5;
      } else {
        i++;
      }
    }
    setWeights(generateWeights);
  }, []);

  useEffect(() => {
    return () => {
      props.resetCountry();
      props.resetPrices();
    };
  }, []);



  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
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
      isTk: additional.tk,
      isRas: additional.ras,
    };
    props.calculate(calc);
    setOpenRoadResult(true);
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
      {props.countries !== null && (
        <Grid container item className="road-container">
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
              onChange={(value) => setCountry(value)}
            />
          </Grid>
          <Grid container item direction="column">
            <Typography variant="subtitle2">Súly (kg)</Typography>
            <Select
              placeholder="Kiválasztás..."
              noOptionsMessage={() => 'Nincs opció'}
              loadingMessage={() => 'Betöltés...'}
              options={weights}
              onChange={(value) => setWeight(value)}
            />
            <Typography variant="caption">
              Adj meg 1 és 100 kg közötti súlyt.
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
            <FormControl className="road-discount-formcontrol">
              <FormLabel>Kedvezmény</FormLabel>
              <RadioGroup
                name="discount"
                value={discount}
                onChange={handleDiscountChange}
              >
                <FormControlLabel value="0.1" control={<Radio />} label="10%" />
                <FormControlLabel value="0.2" control={<Radio />} label="20%" />
                <FormControlLabel value="0.3" control={<Radio />} label="30%" />
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
        </Grid>
      )}
    </Grid>
  );
};

const mapState = (state) => {
  return {
    countries: state.countryReducer.countries,
    result: state.calcReducer.result,
    resultIsLoading: state.calcReducer.isLoading,
  };
};

const Road = connect(mapState, mapDispatch)(RoadConnected);
export default Road;
