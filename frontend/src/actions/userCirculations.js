export const GET_USER_CIRCULATIONS = 'GET_USER_CIRCULATIONS';

export const getCirculationsForUser = (circulations) => {
  return {
    type: GET_USER_CIRCULATIONS,
    circulations,
  };
};
