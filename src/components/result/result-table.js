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
  const [header, setHeader] = useState(['Ár típusa', 'Ár (Ft)']);

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
        <TableHead>
          <TableRow>
            {header.map((header) => {
              return (
                <TableCell className="result-table-head-cell" key={header}>
                  {header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((price) => {
            if (parseInt(price.value) > 0) {
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
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
