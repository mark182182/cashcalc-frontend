import React, { useState, useEffect } from 'react';
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
import { getCountriesRoad } from '../../action/country';
import { Result } from '../result/result';
import './road.scss';

const mapDispatch = (dispatch) => {
  return {
    getCountriesRoad: () => dispatch(getCountriesRoad()),
  };
};

const RoadConnected = (props) => {
  const [country, setCountry] = useState([]);
  const [weights, setWeights] = useState([]);
  const [discount, setDiscount] = useState('');
  const [express, setExpress] = useState('');
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

  const closeRoadResult = () => {
    setOpenRoadResult(false);
  };

  return (
    <Grid>
      {props.countries !== null && (
        <Grid container item className="road-container">
          <Dialog open={openRoadResult} onClose={closeRoadResult} fullWidth>
            <Result close={closeRoadResult} />
          </Dialog>
          <Typography variant="h5">Közúti transzport</Typography>
          <Grid container item direction="column">
            <Typography variant="subtitle2">Ország</Typography>
            <Select
              placeholder="Kiválasztás..."
              noOptionsMessage={() => 'Nincs opció'}
              loadingMessage={() => 'Betöltés...'}
              options={props.countries}
            />
          </Grid>
          <Grid container item direction="column">
            <Typography variant="subtitle2">Súly (kg)</Typography>
            <Select
              placeholder="Kiválasztás..."
              noOptionsMessage={() => 'Nincs opció'}
              loadingMessage={() => 'Betöltés...'}
              options={weights}
            />
            <Typography variant="caption">
              Adj meg 1 és 100 kg közötti súlyt.
            </Typography>
          </Grid>
          <Grid container item direction="column">
            <Typography variant="subtitle2">Biztosítási összeg (Ft)</Typography>
            <TextField type="number" variant="outlined" />
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
            <FormControl className="road-express-formcontrol">
              <FormLabel>Express csomag?</FormLabel>
              <RadioGroup
                name="express"
                value={express}
                onChange={handleExpressChange}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="Express Worldwide"
                />
                <FormControlLabel
                  value="9"
                  control={<Radio />}
                  label="Express 9h"
                />
                <FormControlLabel
                  value="12"
                  control={<Radio />}
                  label="Express 12h"
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
                    checked={additional.includes('dox')}
                    onChange={handleAdditionalChange}
                    value="dox"
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
              onClick={() => setOpenRoadResult(true)}
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
  };
};

const Road = connect(mapState, mapDispatch)(RoadConnected);
export default Road;
