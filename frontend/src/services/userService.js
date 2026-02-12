import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

export const userService = {

  register(userData) {
    return axios.post(API_URL, userData);
  },
  
  getAll() {
    return axios.get(API_URL);
  },

  deleteUser(userId) {
    return axios.delete(`${API_URL}/${userId}`);
  },
};