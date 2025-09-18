import axios from 'axios';
import { parseCookies } from 'nookies';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
http.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies['belezixadmin.token'];
  console.log("interceptors =>", cookies, token)

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
