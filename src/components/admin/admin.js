import React, { useState, useEffect } from 'react';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import './admin.scss';
import UserManagement from './user-management/carrier';
import PricingManagement from './pricing-management/pricing';

export const Admin = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected('carriers');
  }, []);

  return (
    <Grid container item className="admin-container" justify="center">
      <Grid container item justify="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={() => setSelected('carriers')}>
            Futárok karbantartása
          </Button>
          <Button onClick={() => setSelected('pricings')}>
            Árak karbantartása
          </Button>
        </ButtonGroup>
      </Grid>
      {selected === 'carriers' && <UserManagement />}
      {selected === 'pricings' && <PricingManagement />}
    </Grid>
  );
};
