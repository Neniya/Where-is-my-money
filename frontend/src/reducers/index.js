import { combineReducers } from 'redux';
import users from './users';
import userCirculations from './userCirculatios';
import authedUser from './authedUser';
import costItems from './costItems';
import accounts from './userAccounts';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  users,
  userCirculations,
  authedUser,
  costItems,
  accounts,
  loadingBar: loadingBarReducer,
});
