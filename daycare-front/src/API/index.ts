import Axios from 'axios';
import https from 'https';

const API = Axios.create({
  baseURL: 'http://localhost:3002/',
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default API;
