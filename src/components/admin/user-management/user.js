import React from 'react';
import { connect } from 'react-redux';

const mapDispatch = (dispatch) => {
  return {};
};

export const UserManagementConnected = () => {
  return <div>user</div>;
};

const mapState = (state) => {
  return {};
};

const UserManagement = connect(mapState, mapDispatch)(UserManagementConnected);
export default UserManagement;
