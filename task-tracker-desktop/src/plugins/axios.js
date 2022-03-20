import axios from "axios";

const API_URL = 'http://localhost:3000/api/v1/';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default {
  install(Vue) {
    Vue.prototype.$http = instance;
  }
}