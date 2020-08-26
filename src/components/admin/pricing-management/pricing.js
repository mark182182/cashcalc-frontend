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
    if (props.pricing && props.pricing.length > 0) {
      setPrices([
        { name: 'Alapár kedvezménnyel', value: props.pricing.baseFare },
        { name: 'Express ' + props.express, value: props.pricing.expressFare },
        { name: 'Biztosítási díj', value: props.pricing.insuranceFare },
        { name: 'EXT-díj', value: props.pricing.extFare },
        { name: 'RAS-díj', value: props.pricing.rasFare },
        { name: 'TK-díj', value: props.pricing.tkFare },
        { name: 'Üzemanyag-pótdíj', value: props.pricing.fuelFare },
        { name: 'Vészhelyzeti díj', value: props.pricing.tkFare },
      ]);
    }
  }, [props.pricing]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((header) => {
              return (
                <TableCell className="pricing-table-head-cell" key={header}>
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
    pricing: state.adminReducer.pricing,
    pricingStatus: state.adminReducer.pricingStatus,
  };
};

const PricingManagement = connect(
  mapState,
  mapDispatch
)(PricingManagementConnected);
export default PricingManagement;
