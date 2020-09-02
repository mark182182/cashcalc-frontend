import React, { useState } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { v1 as uuid } from 'uuid';

export const ResultTable = (props) => {
  const [prices, setPrices] = useState([
    {
      name: 'Összesen',
      value: props.calc.result,
      className: 'result-table-sum-cell',
    },
    { name: 'Alapár kedvezménnyel', value: props.calc.baseFare },
    { name: 'Express ' + props.express, value: props.calc.expressFare },
    { name: 'Biztosítási díj', value: props.calc.insuranceFare },
    { name: 'EXT-díj', value: props.calc.extFare },
    { name: 'RAS-díj', value: props.calc.rasFare },
    { name: 'TK-díj', value: props.calc.tkFare },
    { name: 'Üzemanyag-pótdíj', value: props.calc.fuelFare },
    { name: 'Vészhelyzeti díj', value: props.calc.emergencyFare },
  ]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {prices.map((price) => {
            if (parseInt(price.value) > 0) {
              return (
                <TableRow key={uuid()}>
                  <TableCell className={price.className} key={price.name}>
                    {price.name}
                  </TableCell>
                  <TableCell className={price.className} key={price.value}>
                    {price.value.toLocaleString().replace(',', '.') + ' Ft'}
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
