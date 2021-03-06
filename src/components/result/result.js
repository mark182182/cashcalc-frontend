import React from 'react';
import { Grid, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ResultTable } from './result-table';
import './result.scss';

export const Result = (props) => {
  return (
    <>
      <DialogTitle className="result-header">
        <Grid container>
          <Grid container justify="space-between">
            <Grid item className="result-header-calc">
              Kalkuláció
            </Grid>
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
    </>
  );
};
