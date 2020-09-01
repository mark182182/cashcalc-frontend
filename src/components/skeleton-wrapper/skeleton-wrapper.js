import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import uuid from 'uuid/dist/v1';

export const SkeletonWrapper = (props) => {
  return (
    <Grid container item justify="center">
      {new Array(props.fillCount).fill({}).map(() => {
        return <Skeleton key={uuid()} width={'75vw'} height={'8vh'} />;
      })}
    </Grid>
  );
};
