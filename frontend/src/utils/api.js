const api = 'http://localhost:5000';

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

//Get all of the categories available for the app
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
