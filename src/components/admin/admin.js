import React, { useState } from 'react';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import './admin.scss';
import { UserManagement } from './user-management/user';
import { PricingManagement } from './pricing-management/pricing';

export const Admin = () => {
  const [selected, setSelected] = useState('air');

  return (
    <Grid container item className="admin-container">
      <Grid>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={() => setSelected('users')}>
            Futárok karbantartása
          </Button>
          <Button onClick={() => setSelected('pricings')}>
            Árak karbantartása
          </Button>
        </ButtonGroup>
      </Grid>
      {selected === 'users' && <UserManagement />}
      {selected === 'pricings' && <PricingManagement />}
    </Grid>
  );
};
