import { postData, deleteCirculation, changeCirculation } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const GET_USER_CIRCULATIONS = 'GET_USER_CIRCULATIONS';
export const ADD_USER_CIRCULATION = 'ADD_USER_CIRCULATION';
export const DELETE_USER_CIRCULATION = 'DELETE_USER_CIRCULATION';
export const CHANGE_USER_CIRCULATION = 'CHANGE_USER_CIRCULATION';

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

export const changeUserCirculation = (circulation) => {
  return {
    type: CHANGE_USER_CIRCULATION,
    circulation,
  };
};

export const deleteUserCirculation = (data) => {
  return {
    type: DELETE_USER_CIRCULATION,
    circulations: data.monetary_circulations,
    id: data.deleted,
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

export function handleChangeUserCirculation(circulation) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading);

    return changeCirculation(circulation.id, {
      user_id: authedUser,
      ...circulation,
    })
      .then((data) => {
        circulation.date = data.date;
        dispatch(
          changeUserCirculation({
            user_id: authedUser,
            ...circulation,
          })
        );
      })
      .then(() => dispatch(hideLoading));
  };
}

export const handleDeleteCirculation = (id) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return deleteCirculation(authedUser, id).then((data) => {
      dispatch(deleteUserCirculation(data));
      dispatch(hideLoading());
    });
  };
};
