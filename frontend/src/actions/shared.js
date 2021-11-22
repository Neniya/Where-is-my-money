import { getAllUsers } from '../utils/api';
import { getUsers } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getAllUsers.then((users) => {
      dispatch(getUsers(users.users));
      dispatch(hideLoading());
    });
  };
};
