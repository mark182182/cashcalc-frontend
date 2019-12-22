import React, { useState, useEffect } from 'react';
import { Grid, Typography, FormLabel, FormControlLabel, RadioGroup, FormControl, Radio, Checkbox, FormHelperText, TextField, Dialog, Button } from '@material-ui/core';
import Select from 'react-select';
import { mapCountries } from '../../reducer/air';
import './air.scss';
import { Result } from '../result/result';

export const Air = () => {
  const [countries, setCountries] = useState([]);
  const [weights, setWeights] = useState([]);
  const [discount, setDiscount] = useState('');
  const [express, setExpress] = useState('');
  const [additional, setAdditional] = useState([]);
  const [openAirResult, setOpenAirResult] = useState(false);

  useEffect(() => {
    setCountries(mapCountries());
    let generateWeights = [];
    for (let i = 0.5; i <= 200;) {
      generateWeights = [...generateWeights, { value: i, label: i }];
      i += 0.5;
    }
    setWeights(generateWeights);
  }, [])

  const handleDiscountChange = event => {
    setDiscount(event.target.value);
  }

  const handleExpressChange = event => {
    setExpress(event.target.value);
  }

  const handleAdditionalChange = event => {
    const value = event.target.value;
    if (additional.includes(value)) {
      const filteredValues = additional.filter(elem => elem !== value);
      setAdditional([...filteredValues]);
    } else {
      setAdditional([...additional, event.target.value]);
    }
  }

  const closeAirResult = () => {
    setOpenAirResult(false);
  }

  return (
    <Grid container item className='air-container'>
      <Dialog
        open={openAirResult}
        onClose={closeAirResult}
        fullWidth>
        <Result close={closeAirResult} />
      </Dialog>
      <Typography variant='h5'>Légi/belföld transzport</Typography>
      <Grid container item direction='column'>
        <Typography variant='subtitle2'>Ország</Typography>
        <Select options={countries} />
      </Grid>
      <Grid container item direction='column'>
        <Typography variant='subtitle2'>Súly (kg)</Typography>
        <Select options={weights} />
        <Typography variant='caption'>Adj meg 0.5 és 200 kg közötti súlyt.</Typography>
      </Grid>
      <Grid container item direction='column'>
        <Typography variant='subtitle2'>Biztosítási összeg (Ft)</Typography>
        <TextField type='number' variant='outlined' />
      </Grid>
      <Grid container item>
        <FormControl className='air-discount-formcontrol'>
          <FormLabel>Kedvezmény</FormLabel>
          <RadioGroup name="discount" value={discount} onChange={handleDiscountChange}>
            <FormControlLabel value='0.1' control={<Radio />} label="10%" />
            <FormControlLabel value='0.2' control={<Radio />} label="20%" />
            <FormControlLabel value='0.3' control={<Radio />} label="30%" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid container item>
        <FormControl className='air-express-formcontrol'>
          <FormLabel>Express csomag?</FormLabel>
          <RadioGroup name="express" value={express} onChange={handleExpressChange}>
            <FormControlLabel value='0' control={<Radio />} label="Express Worldwide" />
            <FormControlLabel value='9' control={<Radio />} label="Express 9h" />
            <FormControlLabel value='12' control={<Radio />} label="Express 12h" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid container item>
        <FormControl className='air-additional-formcontrol'>
          <FormLabel >Kiegészítő opciók</FormLabel>
          <FormControlLabel
            control={<Checkbox checked={additional.includes('dox')} onChange={handleAdditionalChange} value="dox" />}
            label="DOX"
          />
          <FormHelperText>
            Amennyiben az ügyfél EU-n kívüli területre küld dokumentumot, ikszeld be!
            </FormHelperText>
          <FormControlLabel
            control={<Checkbox checked={additional.includes('ext')} onChange={handleAdditionalChange} value="ext" />}
            label="EXT"
          />
          <FormHelperText>
            Amennyiben az ügyfél küldeménye dokumentum, és szeretné biztosítani, ikszeld be!
            </FormHelperText>
          <FormControlLabel
            control={
              <Checkbox checked={additional.includes('ras')} onChange={handleAdditionalChange} value="ras" />
            }
            label="RAS"
          />
          <FormHelperText>
            Amennyiben a küldemény kieső területre megy, ikszeld be!
            </FormHelperText>
          <FormControlLabel
            control={
              <Checkbox checked={additional.includes('tk')} onChange={handleAdditionalChange} value="tk" />
            }
            label="TK"
          />
          <FormHelperText>
            Amennyiben az ügyfél lakóövezetbe kéri a kézbesítést (ODD), ikszeld be!
            </FormHelperText>
        </FormControl>
      </Grid>
      <Grid container item justify='flex-end'>
        <Button
          onClick={() => setOpenAirResult(true)}
          className='air-calculate-button'>Számítsd ki!</Button>
      </Grid>
    </Grid >
  )
}