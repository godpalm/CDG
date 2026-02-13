import axios from 'axios';
import { lightBlue } from 'vuetify/util/colors';

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

  editUser(userId, userData) {
    return axios.patch(`${API_URL}/${userId}`, userData);
  },

  getById(userId) {
    return axios.get(`${API_URL}/${userId}`);
  },

  login(loginData) {
    return axios.post(`${API_URL}/login`, loginData)
  }
};
