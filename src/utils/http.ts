import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    const { method, url } = config;
    const { message, errors } = data;
    if (errors) {
      console.error({
        method,
        url,
        message,
        errors,
      });
      return Promise.reject(new Error(message));
    }
    return data;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { data, status } = response;
      const { message, errors } = data;
      if (status === 401) {
        console.error({
          message,
          errors,
        });
      }
    } else {
      console.error('网络错误或请求未响应:', error.message);
    }
    return Promise.reject(error);
  },
);

export const $http = instance;
