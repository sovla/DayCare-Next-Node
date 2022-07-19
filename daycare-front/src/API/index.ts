import Axios from 'axios';

const API = Axios.create({
  baseURL: 'http://61.99.114.169:3002/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

export default API;
