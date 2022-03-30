import { postData } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

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
    const { authedUser } = getState();
    dispatch(showLoading);

    return postData('/circulations/add', {
      user_id: authedUser,
      ...circulation,
    })
      .then((data) => {
        circulation.date = data.date;
        dispatch(
          addUserCirculation({
            id: data.created,
            user_id: authedUser,
            ...circulation,
          })
        );
      })
      .then(() => dispatch(hideLoading));
  };
}
