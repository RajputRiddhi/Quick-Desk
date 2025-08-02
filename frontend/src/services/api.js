import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const loginUser = async (credentials) => {
  try {
    const res = await API.post('/auth/login', credentials);
    return res.data.token;
  } catch (err) {
    alert('Login failed');
    return null;
  }
};

export const signupUser = async (data) => {
  try {
    await API.post('/auth/signup', data);
    return true;
  } catch (err) {
    alert('Signup failed');
    return false;
  }
};

export const createTicket = async (data) => {
  const token = localStorage.getItem('token');
  await API.post('/tickets', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTickets = async () => {
  const token = localStorage.getItem('token');
  const res = await API.get('/tickets', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
