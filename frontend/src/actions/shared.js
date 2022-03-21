import { getAllUsers, getAllCostItems } from '../utils/api';
import { getUsers } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';
import { getUserCirculations } from '../utils/api';
import { getCirculationsForUser } from './userCirculations';
import { getCostItems } from './costItems';

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getAllUsers().then((users) => {
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

export const handleGetCostItems = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getAllCostItems().then((costItems) => {
      dispatch(getCostItems(costItems));
      dispatch(hideLoading());
    });
  };
};
