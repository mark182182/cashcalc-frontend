import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import uuid from 'uuid/dist/v1';
import {
  getPricingVariables,
  updatePricingVariables,
  resetPricingVariables,
} from '../../../action/admin';
import { mapPricings } from '../../../data-reducer/admin';
import { Edit, Close, Check } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { SkeletonWrapper } from '../../skeleton-wrapper/skeleton-wrapper';

const mapDispatch = (dispatch) => {
  return {
    getPricingVariables: () => dispatch(getPricingVariables()),
    updatePricingVariables: (pricing) =>
      dispatch(updatePricingVariables(pricing)),
    resetPricingVariables: () => dispatch(resetPricingVariables()),
  };
};

export const PricingManagementConnected = (props) => {
  const [prices, setPrices] = useState([]);
  const [pricings, setPricings] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    props.getPricingVariables();
    return () => {
      props.resetPricingVariables();
    };
  }, []);

  useEffect(() => {
    if (props.pricings) {
      setPricings(Object.assign({}, props.pricings));
      setPrices(mapPricings(props.pricings));
    }
  }, [props.pricings]);

  useEffect(() => {
    if (props.updateStatus === true) {
      setPrices([]);
      setPricings({});
      props.getPricingVariables();
    }
  }, [props.updateStatus]);

  const handleUpdate = (event, price) => {
    Object.keys(pricings).forEach((key) => {
      if (key === price) {
        if (key.includes('Percent')) {
          pricings[key] = parseFloat(event.currentTarget.value);
        } else {
          pricings[key] = parseInt(event.currentTarget.value);
        }
      }
    });
  };

  const updatePrices = () => {
    setIsEditable(false);
    props.updatePricingVariables(pricings);
  };

  return (
    <>
      <Grid container>
        {isEditable ? (
          <>
            <Button
              className="pricing-modify-button"
              onClick={() => setIsEditable(false)}
            >
              <Close fontSize="small" />
              Mégsem
            </Button>
            <Button className="pricing-modify-button" onClick={updatePrices}>
              <Check fontSize="small" />
              Mentés
            </Button>
          </>
        ) : (
          <Button
            className="pricing-modify-button"
            onClick={() => setIsEditable(true)}
          >
            <Edit fontSize="small" />
            Módosítás
          </Button>
        )}
      </Grid>
      <TableContainer className="table-container">
        <Table>
          <TableBody>
            {prices.map((price) => {
              const pricing = Object.values(price)[0];
              const key = Object.keys(price)[0];
              return (
                <TableRow key={uuid()}>
                  <TableCell key={pricing.name}>{pricing.name}</TableCell>
                  <TableCell key={pricing.value}>
                    {isEditable ? (
                      <TextField
                        className="input"
                        type="number"
                        variant="outlined"
                        defaultValue={pricing.value}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(event) => handleUpdate(event, key)}
                        required
                      />
                    ) : key.includes('Percent') ? (
                      pricing.value + ' %'
                    ) : (
                      pricing.value.toLocaleString().replace(',', '.') + ' Ft'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {props.pricingsStatus === null && <SkeletonWrapper fillCount={10} />}
      </TableContainer>
      {props.pricingsStatus !== null && props.carriers === null && (
        <Typography>Nincs megjeleníthető adat.</Typography>
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    pricings: state.adminReducer.pricings,
    pricingsStatus: state.adminReducer.pricingsStatus,
    updateStatus: state.adminReducer.updateStatus,
  };
};

const PricingManagement = connect(
  mapState,
  mapDispatch
)(PricingManagementConnected);
export default PricingManagement;
