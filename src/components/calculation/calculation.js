import React, { useState, useEffect } from 'react';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import Air from '../air/air';
import Road from '../road/road';
import './calculation.scss';

export const Calculation = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected('air');
  }, []);

  return (
    <Grid container item className="calculation-container" justify="center">
      <Grid container item justify="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={() => setSelected('air')}>
            Légi/belföld transzport
          </Button>
          <Button onClick={() => setSelected('road')}>Közúti transzport</Button>
        </ButtonGroup>
      </Grid>
      {selected === 'air' && <Air />}
      {selected === 'road' && <Road />}
    </Grid>
  );
};
