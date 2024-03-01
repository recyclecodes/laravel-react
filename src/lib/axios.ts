import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  // withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    Accept: 'application/json',
  },
});

axios.interceptors.response.use(null, (err) => {
  console.log(err);
});

export default Axios;
