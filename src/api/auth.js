// src/api/auth.js
import client from "./client";

// Register (client.baseURL already includes /api/v1)
export const register = (payload) =>
  client.post("/accounts/register/", payload); // -> full URL: http://localhost:8000/api/v1/accounts/register/

// Login - get tokens and store them with names client expects ("access" / "refresh")
export const login = async (credentials) => {
  const resp = await client.post("/accounts/token/", credentials);
  // server returns { access: "...", refresh: "..." }
  if (resp.data.access) localStorage.setItem("access", resp.data.access);
  if (resp.data.refresh) localStorage.setItem("refresh", resp.data.refresh);
  client.defaults.headers.Authorization = `Bearer ${resp.data.access}`;
  return resp.data;
};

export const me = () => client.get("/accounts/me/");

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  delete client.defaults.headers.Authorization;
};
