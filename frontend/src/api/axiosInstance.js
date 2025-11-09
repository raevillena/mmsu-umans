import axios from 'axios';
import { store } from "../store/store";
import { refreshAccessToken, clearTokens } from '../store/slices/authSlice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const {user, accessToken} = state.auth;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers['x-user-id'] = user.id
  }
  return config;
});

// Interceptor to refresh token on 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      //console.log("responding to 401:", error.response.data)
      originalRequest._retry = true;
      try {
        //const { store } = await import("../store/store")
        await store.dispatch(refreshAccessToken(store.getState().auth.user)).unwrap();
        originalRequest.headers["Authorization"] = `Bearer ${store.getState().auth.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("error on trying to refresh", err)
        store.dispatch(clearTokens());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;