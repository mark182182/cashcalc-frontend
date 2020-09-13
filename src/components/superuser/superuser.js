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
  getAdmins,
  resetAdmins,
  resetDeleteStatus,
  resetCreateStatus,
  createAdmin,
  deleteAdmin,
} from '../../action/superuser';
import { Delete, Add } from '@material-ui/icons';
import { DeleteUser } from '../delete-user/delete-user';
import CreateUser from '../create-user/create-user';
import { SkeletonWrapper } from '../skeleton-wrapper/skeleton-wrapper';

const mapDispatch = (dispatch) => {
  return {
    getAdmins: () => dispatch(getAdmins()),
    resetAdmins: () => dispatch(resetAdmins()),
    deleteAdmin: (id) => dispatch(deleteAdmin(id)),
    createAdmin: (username, password) =>
      dispatch(createAdmin(username, password)),
    resetDeleteStatus: () => dispatch(resetDeleteStatus()),
    resetCreateStatus: () => dispatch(resetCreateStatus()),
  };
};

export const SuperuserConnected = (props) => {
  const [headers] = useState(['Felhasználónév', 'Létrehozva', 'Törlés']);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (props.adminLoading === null) {
      props.getAdmins();
    }
    return () => {
      props.resetAdmins();
    };
  }, []);

  const reloadAdmins = () => {
    props.getAdmins();
  };

  const handleDelete = (admin) => {
    props.resetDeleteStatus();
    setAdmin(admin);
    setOpenConfirmDelete(true);
  };

  const handleCreate = () => {
    props.resetCreateStatus();
    setOpenCreate(true);
  };

  return (
    <>
      <Dialog
        open={openConfirmDelete && admin !== null}
        maxWidth="md"
        fullWidth
      >
        <DeleteUser
          close={() => setOpenConfirmDelete(false)}
          reload={reloadAdmins}
          user={admin}
          deleteUser={(id) => props.deleteAdmin(id)}
          deleteStatus={props.deleteStatus}
          deleteIsLoading={props.deleteIsLoading}
        />
      </Dialog>
      <Dialog open={openCreate} maxWidth="sm" fullWidth>
        <CreateUser
          close={() => setOpenCreate(false)}
          reload={reloadAdmins}
          createUser={(username, password) =>
            props.createAdmin(username, password)
          }
          createStatus={props.createStatus}
          createIsLoading={props.createIsLoading}
        />{' '}
      </Dialog>
      <Grid container>
        <Button className="carrier-create-button" onClick={handleCreate}>
          <Add />
          Létrehozás
        </Button>
      </Grid>
      <TableContainer className="table-container">
        {props.adminLoading === false && props.admins !== null && (
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
              {props.admins.map((admin) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell className={admin.className}>
                      {admin.username}
                    </TableCell>
                    <TableCell className={admin.className}>
                      {new Date(admin.updatedAt).toLocaleString('HU')}
                    </TableCell>
                    <TableCell className={admin.className} key={uuid()}>
                      <IconButton
                        aria-label="delete"
                        className="carrier-delete-button"
                        onClick={() => handleDelete(admin)}
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
        {props.adminLoading === true && <SkeletonWrapper fillCount={10} />}
      </TableContainer>
      {props.adminLoading === false && props.admins === null && (
        <Typography>Nincs megjeleníthető adat.</Typography>
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    admins: state.superuserReducer.admins,
    adminLoading: state.superuserReducer.adminLoading,
    adminStatus: state.superuserReducer.adminStatus,
    createIsLoading: state.superuserReducer.createIsLoading,
    createStatus: state.superuserReducer.createStatus,
    deleteIsLoading: state.superuserReducer.deleteIsLoading,
    deleteStatus: state.superuserReducer.deleteStatus,
  };
};

const Superuser = connect(mapState, mapDispatch)(SuperuserConnected);
export default Superuser;
