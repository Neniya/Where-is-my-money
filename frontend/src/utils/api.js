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
    return circulations;
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
    return costitems;
  } catch (error) {
    console.log('error', error);
  }
};
