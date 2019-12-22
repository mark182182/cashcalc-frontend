import React from 'react';
import { Grid, DialogContent, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { Close, ClearOutlined } from '@material-ui/icons';
import './result.scss';

export const Result = props => {
  const { close } = props;

  return (
    <Grid container item>
      <DialogTitle className="result-header">
        <Grid container>
          <Grid container justify="space-between">
            <Grid item>Számított értékek</Grid>
            <Grid item>
              <Button
                onClick={close}
                className="result-close-button">
                <Close />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        valami
      </DialogContent>
      <DialogActions >
        <Button className="cancel-result-button" onClick={close}>
          <ClearOutlined /> Mégse
          </Button>
      </DialogActions>
    </Grid>
  )
}
