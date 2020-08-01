import React, { useState } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { v1 as uuid } from 'uuid';

export const ResultTable = (props) => {
  const [header, setHeader] = useState(['Ár típusa', 'Ár']);

  const [prices, setPrices] = useState([
    { name: 'Alapár kedvezménnyel', value: props.calc.baseFare },
    { name: 'Express ' + props.express, value: props.calc.expressFare },
    { name: 'Biztosítási díj', value: props.calc.insuranceFare },
    { name: 'EXT-díj', value: props.calc.extFare },
    { name: 'RAS-díj', value: props.calc.rasFare },
    { name: 'TK-díj', value: props.calc.tkFare },
    { name: 'Üzemanyag-pótdíj', value: props.calc.fuelFare },
    { name: 'Vészhelyzeti díj', value: props.calc.tkFare },
    { name: 'Összesen', value: props.calc.result },
  ]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((header) => {
              return <TableCell key={header}>{header}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((price) => {
            return (
              <TableRow key={uuid()}>
                <TableCell key={price.name}>{price.name}</TableCell>
                <TableCell key={price.value}>{price.value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
