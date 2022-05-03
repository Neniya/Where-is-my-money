import {
  GET_USER_CIRCULATIONS,
  ADD_USER_CIRCULATION,
  DELETE_USER_CIRCULATION,
  CHANGE_USER_CIRCULATION,
} from '../actions/userCirculations';

export default function userCirculations(state = [], action) {
  switch (action.type) {
    case GET_USER_CIRCULATIONS:
      return [...state, ...action.circulations];
    case ADD_USER_CIRCULATION:
      return [...state, action.circulation];
    case DELETE_USER_CIRCULATION:
      return state.filter((circulation) => circulation.id !== action.id);
    case CHANGE_USER_CIRCULATION:
      return state.map((circ) =>
        circ.id === action.circulation.id ? action.circulation : circ
      );

    default:
      return state;
  }
}
