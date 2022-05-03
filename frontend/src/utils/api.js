const api = 'http://localhost:5000';

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

//Get all asers
export const getAllUsers = async () => {
  const response = await fetch(`${api}/users`, {
    metod: 'GET',
    credentials: 'same-origin',
    headers,
  });
  try {
    const users = await response.json();
    return users;
  } catch (error) {
    console.log('error', error);
  }
};

//Get all of the circulations available for the app
export const getAllCirculations = async () => {
  const response = await fetch(`${api}/circulations`, {
    metod: 'GET',
    credentials: 'same-origin',
    headers,
  });
  try {
    const circulations = await response.json();
    return circulations;
  } catch (error) {
    console.log('error', error);
  }
};

//Get all of the circulations available for the app
export const getUserCirculations = async (id) => {
  const response = await fetch(`${api}/circulations/${id}`, {
    metod: 'GET',
    credentials: 'same-origin',
    headers,
  });
  try {
    const circulations = await response.json();
    return circulations.monetary_circulations;
  } catch (error) {
    console.log('error', error);
  }
};

export const getInitialData = () => {
  // getAllUsers().then((users) => {
  //   return users.users;
  // });
  return getAllUsers().then((users) => {
    console.log(users);
    return users.users;
  });
};

//Get all of the cost items available for the app
export const getAllCostItems = async () => {
  const response = await fetch(`${api}/costitems`, {
    metod: 'GET',
    credentials: 'same-origin',
    headers,
  });
  try {
    const costitems = await response.json();
    return costitems.cost_types;
  } catch (error) {
    console.log('error', error);
  }
};

//Get acconunts for user
export const getUserAccounts = async (id) => {
  const response = await fetch(`${api}/accounts/${id}`, {
    metod: 'GET',
    credentials: 'same-origin',
    headers,
  });
  try {
    const accounts = await response.json();
    return accounts.user_accounts;
  } catch (error) {
    console.log('error', error);
  }
};

export const postData = async (url = '', data = {}) => {
  const response = await fetch(`${api}${url}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

export const changeCirculation = async (id, data = {}) => {
  const response = await fetch(`${api}/circulations/${id}`, {
    method: 'PATCH',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

//delete circulation by id
export const deleteCirculation = async (userId, circulationId) => {
  const response = await fetch(
    `${api}/circulations/${userId}/${circulationId}`,
    {
      method: 'DELETE',
      credentials: 'same-origin',
      headers,
    }
  );

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
