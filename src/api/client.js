// src/api/client.js
import axios from "axios";

/**
 * Prefer an env var so you can change between local/dev/prod without touching code.
 * Set VITE_API_URL in Vercel to: https://assured-farming-backend.onrender.com/api/v1
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://assured-farming-backend.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// refresh token handling for 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token found");

        // use full URL - axios.post with baseURL won't use the instance defaults
        const resp = await axios.post(
          `${API_BASE_URL}/accounts/token/refresh/`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccessToken = resp.data.access;
        if (!newAccessToken) throw new Error("No access token returned");

        localStorage.setItem("access_token", newAccessToken);

        // update headers and retry original request
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        // clear tokens and route to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
