import { getAllUsers } from '../utils/api';
import { getUsers } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';
import { getUserCirculations } from '../utils/api';
import { getCirculationsForUser } from './userCirculations';

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getAllUsers.then((users) => {
      dispatch(getUsers(users.users));
      dispatch(hideLoading());
    });
  };
};

export const handleGetUserCirculation = (id) => {
  return (dispatch) => {
    dispatch(showLoading());
    return getUserCirculations(id).then((circulations) => {
      dispatch(getCirculationsForUser(circulations));
      dispatch(hideLoading());
    });
  };
};
