import { GET_USER_ACCOUNTS } from '../actions/userAccounts';

export default function accounts(state = [], action) {
  switch (action.type) {
    case GET_USER_ACCOUNTS:
      return [...action.accounts];
    default:
      return state;
  }
}
