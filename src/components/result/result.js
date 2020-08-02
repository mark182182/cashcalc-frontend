import React, { useEffect } from 'react';
import {
  Grid,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { Close, ClearOutlined } from '@material-ui/icons';
import { ResultTable } from './result-table';
import './result.scss';

export const Result = (props) => {
  return (
    <Grid container item>
      <DialogTitle className="result-header">
        <Grid container>
          <Grid container justify="space-between">
            <Grid item>Számított értékek</Grid>
            <Grid item>
              <Button onClick={props.close} className="result-close-button">
                <Close />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <ResultTable calc={props.calc} express={props.express} />
      </DialogContent>
    </Grid>
  );
};
