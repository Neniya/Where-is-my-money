import { GET_USER_CIRCULATIONS } from '../actions/userCirculations';

export default function userCirculations(state = {}, action) {
  switch (action.type) {
    case GET_USER_CIRCULATIONS:
      return {
        ...state,
        ...action.circulations,
      };
    default:
      return state;
  }
}
