import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

const http = (config: AxiosRequestConfig) => {
  return axios({
    baseURL: BASE_URL,
    withCredentials: config.withCredentials ?? true, // define como padrão se quiser
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });
};

export { http };
