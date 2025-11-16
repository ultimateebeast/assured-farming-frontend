import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/accounts/me/");
        setUser(res.data);
      } catch (err) {
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/accounts/token/", { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    const userRes = await api.get("/accounts/me/");
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const register = async (data) => {
    const res = await api.post("/accounts/register/", data);
    if (res.data?.access && res.data?.refresh) {
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      // Optionally fetch user profile immediately
      try {
        const me = await api.get("/accounts/me/");
        setUser(me.data);
      } catch (e) {
        // ignore, user can be loaded later
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
