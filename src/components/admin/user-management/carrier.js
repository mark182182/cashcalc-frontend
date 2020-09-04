import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Grid,
  Dialog,
  Typography,
  Button,
} from '@material-ui/core';
import uuid from 'uuid/dist/v1';
import {
  getCarriers,
  resetCarriers,
  resetDeleteStatus,
  resetCreateStatus,
} from '../../../action/admin';
import { Delete, Add } from '@material-ui/icons';
import ConfirmCarrierDelete from './confirm-carrier-delete';
import CreateCarrier from './create-carrier';
import { SkeletonWrapper } from '../../skeleton-wrapper/skeleton-wrapper';

const mapDispatch = (dispatch) => {
  return {
    getCarriers: () => dispatch(getCarriers()),
    resetCarriers: () => dispatch(resetCarriers()),
    resetDeleteStatus: () => dispatch(resetDeleteStatus()),
    resetCreateStatus: () => dispatch(resetCreateStatus()),
  };
};

export const CarrierManagementConnected = (props) => {
  const [headers, setHeaders] = useState([
    'Felhasználónév',
    'Frissítve',
    'Törlés',
  ]);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [carrier, setCarrier] = useState(null);

  useEffect(() => {
    props.getCarriers();
    return () => {
      props.resetCarriers();
    };
  }, []);

  const reloadCarriers = () => {
    props.getCarriers();
  };

  const handleDelete = (carrier) => {
    props.resetDeleteStatus();
    setCarrier(carrier);
    setOpenConfirmDelete(true);
  };

  const handleCreate = () => {
    props.resetCreateStatus();
    setOpenCreate(true);
  };

  return (
    <>
      <Dialog
        open={openConfirmDelete && carrier !== null}
        maxWidth="md"
        fullWidth
      >
        <ConfirmCarrierDelete
          close={() => setOpenConfirmDelete(false)}
          carrier={carrier}
          reload={reloadCarriers}
        />
      </Dialog>
      <Dialog open={openCreate} maxWidth="sm" fullWidth>
        <CreateCarrier
          close={() => setOpenCreate(false)}
          reload={reloadCarriers}
        />
      </Dialog>
      <Grid container>
        <Button className="carrier-create-button" onClick={handleCreate}>
          <Add />
          Létrehozás
        </Button>
      </Grid>
      <TableContainer className="table-container">
        {props.carrierLoading === false && props.carriers !== null && (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headers.map((header) => {
                  return (
                    <TableCell className="carrier-table-head-cell" key={header}>
                      {header}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.carriers.map((carrier) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell className={carrier.className} key={carrier.id}>
                      {carrier.username}
                    </TableCell>
                    <TableCell className={carrier.className}>
                      {new Date(carrier.updatedAt).toLocaleString('HU')}
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
        {props.carrierLoading === true && <SkeletonWrapper fillCount={10} />}
      </TableContainer>
      {props.carrierLoading === false && props.carriers === null && (
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
