import React, { useState } from 'react';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import Air from '../air/air';
import Road from '../road/road';

export const Calculation = () => {
  const [selected, setSelected] = useState(null);

  return (
    <Grid>
      <Grid>
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
