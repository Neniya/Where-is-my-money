export const GET_USER_ACCOUNTS = 'GET_USER_ACCOUNTS';

export const getAccountsForUser = (accounts) => {
  return {
    type: GET_USER_ACCOUNTS,
    accounts,
  };
};
