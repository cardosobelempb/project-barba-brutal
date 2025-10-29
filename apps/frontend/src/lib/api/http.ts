import { ACCESS_TOKEN_COOKIE } from '@/contexts';
import axios from 'axios';
import { parseCookies } from 'nookies';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

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
  const token = cookies[ACCESS_TOKEN_COOKIE];
  console.log("interceptors =>", cookies, token)

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
