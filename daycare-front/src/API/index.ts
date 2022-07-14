import Axios from 'axios';

const API = Axios.create({
  baseURL: 'http://localhost:3002/',
});

export default API;
