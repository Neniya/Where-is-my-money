import { GET_COST_ITEMS } from '../actions/costItems';

export default function costItems(state = [], action) {
  switch (action.type) {
    case GET_COST_ITEMS:
      return [...action.costItems];
    default:
      return state;
  }
}
