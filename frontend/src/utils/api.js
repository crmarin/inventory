import axios from 'axios';
import config from './config.json';

const api = axios.create({
  baseURL: `http://${config.publicIp}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
