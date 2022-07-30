import Axios from 'axios';
import https from 'https';

const API = Axios.create({
  baseURL: 'https://daycare-center.shop/api/',
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default API;
