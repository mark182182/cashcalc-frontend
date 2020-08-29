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
  IconButton,
  Grid,
  Dialog,
  Typography,
} from '@material-ui/core';
import uuid from 'uuid/dist/v1';
import { getCarriers } from '../../../action/admin';
import { Delete } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import ConfirmCarrierDelete from './confirm-carrier-delete';

const mapDispatch = (dispatch) => {
  return {
    getCarriers: () => dispatch(getCarriers()),
  };
};

export const CarrierManagementConnected = (props) => {
  const [header, setHeader] = useState(['Felhasználónév', 'Törlés']);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const [carriers, setCarriers] = useState([]);
  const [carrier, setCarrier] = useState(null);

  useEffect(() => {
    props.getCarriers();
  }, []);

  useEffect(() => {
    if (props.carriers && props.carriers.length > 0) {
      setCarriers(props.carriers);
    }
  }, [props.carriers]);

  const handleDelete = (carrier) => {
    setCarrier(carrier);
    setOpenConfirmDelete(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        {carrier !== null && (
          <Dialog open={openConfirmDelete} maxWidth="md" fullWidth>
            <ConfirmCarrierDelete
              close={() => setOpenConfirmDelete(false)}
              carrier={carrier}
            />
          </Dialog>
        )}
        {props.carrierLoading === false && carrier !== null && (
          <Table>
            <TableHead>
              <TableRow>
                {header.map((header) => {
                  return (
                    <TableCell className="carrier-table-head-cell" key={header}>
                      {header}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {carriers.map((carrier) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell className={carrier.className} key={carrier}>
                      {carrier}
                    </TableCell>
                    <TableCell className={carrier.className} key={uuid()}>
                      <IconButton
                        aria-label="delete"
                        className="carrier-delete-button"
                        onClick={() => handleDelete(carrier)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        {props.carrierLoading === true && (
          <Grid container item justify="center">
            <Skeleton width={210} height={118} />
          </Grid>
        )}
      </TableContainer>
      {props.carrierLoading === false && carrier === null && (
        <Typography>Nincs megjeleníthető adat.</Typography>
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    carriers: state.adminReducer.carriers,
    carrierLoading: state.adminReducer.carrierLoading,
    carrierStatus: state.adminReducer.carrierStatus,
  };
};

const CarrierManagement = connect(
  mapState,
  mapDispatch
)(CarrierManagementConnected);
export default CarrierManagement;
