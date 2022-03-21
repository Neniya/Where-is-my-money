export const GET_COST_ITEMS = 'GET_COST_ITEMS';

export const getCostItems = (costItems) => {
  return {
    type: GET_COST_ITEMS,
    costItems,
  };
};
