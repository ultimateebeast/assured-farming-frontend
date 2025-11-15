// src/api/client.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1"; // good: backend root for v1

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration (auto-refresh)
// NOTE: refresh endpoint expects { refresh: "<refresh-token>" }
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

        const response = await axios.post(
          `${API_BASE_URL}/accounts/token/refresh/`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);

        // update headers and retry original request
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // redirect to login (or handle with app logic)
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
