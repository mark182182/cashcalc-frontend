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
import { mapCountries, isEUCountry } from '../../data-reducer/countries';
import { Result } from '../result/result';
import { getCountriesAir } from '../../action/country';
import { calculate } from '../../action/calculation';
import './air.scss';

const mapDispatch = (dispatch) => {
  return {
    getCountriesAir: () => dispatch(getCountriesAir()),
    calculate: (calc) => dispatch(calculate(calc)),
  };
};

const AirConnected = (props) => {
  const insurance = useRef(null);
  const [country, setCountry] = useState({});
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState({});
  const [discount, setDiscount] = useState('');
  const [express, setExpress] = useState('');
  const [additional, setAdditional] = useState([]);
  const [openAirResult, setOpenAirResult] = useState(false);

  useEffect(() => {
    props.getCountriesAir();
    let generateWeights = [];
    for (let i = 0.5; i <= 200; ) {
      generateWeights = [...generateWeights, { value: i, label: i }];
      if (i >= 30) {
        i++;
      } else {
        i += 0.5;
      }
    }
    setWeights(generateWeights);
  }, []);

  const handleCalculate = () => {
    const calc = {
      transferType: 'air',
      zoneNumber: country.zoneNumber,
      weight: parseFloat(weight.value),
      insurance: parseInt(insurance.current.value),
      discountPercent: parseFloat(discount),
      expressType: express,
      isDocument: additional.dox,
      isExt: additional.ext,
      isTk: additional.tk,
      isRas: additional.ras,
    };
    props.calculate(calc);
    setOpenAirResult(true);
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

  const handleDoxChange = (event) => {
    if (weight.value > 2) {
      console.log('hoho');
    } else {
      handleAdditionalChange(event);
    }
  };

  const closeAirResult = () => {
    setOpenAirResult(false);
  };

  return (
    <Grid>
      {props.countries !== null && (
        <Grid container item className="air-container">
          {props.result !== null && (
            <Dialog open={openAirResult} onClose={closeAirResult} fullWidth>
              <Result close={closeAirResult} type="air" express={express} />
            </Dialog>
          )}
          <Typography variant="h5">Légi/belföld transzport</Typography>
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
                <FormControlLabel value="0.1" control={<Radio />} label="10%" />
                <FormControlLabel value="0.2" control={<Radio />} label="20%" />
                <FormControlLabel value="0.3" control={<Radio />} label="30%" />
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
                    onChange={handleDoxChange}
                    value="dox"
                    disabled={isEUCountry(country.zoneNumber)}
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
    result: state.calculationReducer.result,
  };
};

const Air = connect(mapState, mapDispatch)(AirConnected);
export default Air;
