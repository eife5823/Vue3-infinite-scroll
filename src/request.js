import axios from 'axios';

const service = axios.create({
  // baseURL: 'https://api.github.com/users/aszx87410/repos',
  timeout: 6000,
});

service.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Accept = 'application/vnd.github.v3+json';
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = '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';
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.resolve(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    return Promise.resolve(error);
  },
);

export default service;
