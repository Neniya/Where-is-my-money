import { combineReducers } from 'redux';
import users from './users';
import userCirculations from './userCirculatios';
import authedUser from './authedUser';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  users,
  userCirculations,
  authedUser,
  loadingBar: loadingBarReducer,
});
