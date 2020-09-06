import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { mapResult } from '../../data-reducer/result';
import { v1 as uuid } from 'uuid';

export const ResultTable = (props) => {
  const [prices, setPrices] = useState(mapResult(props.calc, props.express));

  return (
    <TableContainer>
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
