import {
  GET_USER_CIRCULATIONS,
  ADD_USER_CIRCULATION,
} from '../actions/userCirculations';

export default function userCirculations(state = {}, action) {
  switch (action.type) {
    case GET_USER_CIRCULATIONS:
      return {
        ...state,
        ...action.circulations,
      };

    case ADD_USER_CIRCULATION:
      return {
        ...state,
        [action.circulation.id]: action.circulation,
      };

    default:
      return state;
  }
}
