import { postData } from '../utils/api';

export const GET_USER_CIRCULATIONS = 'GET_USER_CIRCULATIONS';
export const ADD_USER_CIRCULATION = 'ADD_USER_CIRCULATION';

export const getCirculationsForUser = (circulations) => {
  return {
    type: GET_USER_CIRCULATIONS,
    circulations,
  };
};

export const addUserCirculation = (circulation) => {
  return {
    type: ADD_USER_CIRCULATION,
    circulation,
  };
};

export function handleAddUserCirculation(circulation) {
  return (dispatch, getState) => {
    dispatch(showLoading);

    return postData('/circulations/add', circulation)
      .then((data) => {
        dispatch(addUserCirculation(data.circulation));
      })
      .then(() => dispatch(hideLoading));
  };
}
