import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import uuid from 'uuid/dist/v1';
import { getPricingVariables } from '../../../action/admin';
import { mapPricings } from '../../../data-reducer/admin';

const mapDispatch = (dispatch) => {
  return {
    getPricingVariables: () => dispatch(getPricingVariables()),
  };
};

export const PricingManagementConnected = (props) => {
  const [header, setHeader] = useState(['Ár típusa', 'Ár (Ft)']);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    props.getPricingVariables();
  }, []);

  useEffect(() => {
    if (props.pricings) {
      setPrices(mapPricings(props.pricings));
    }
  }, [props.pricings]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((header) => {
              return (
                <TableCell className="pricings-table-head-cell" key={header}>
                  {header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((price) => {
            return (
              <TableRow key={uuid()}>
                <TableCell className={price.className} key={price.name}>
                  {price.name}
                </TableCell>
                <TableCell className={price.className} key={price.value}>
                  {price.value}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapState = (state) => {
  return {
    pricings: state.adminReducer.pricings,
    pricingsStatus: state.adminReducer.pricingsStatus,
  };
};

const PricingManagement = connect(
  mapState,
  mapDispatch
)(PricingManagementConnected);
export default PricingManagement;
