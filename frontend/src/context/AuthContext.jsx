import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "../api/axios";
import { AUTH_LOGIN, AUTH_REGISTER } from "../api/endpoints";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("ql_token");
    if (!token) {
      setLoading(false);
      return;
    }
    // Backend does not expose /auth/me; rely on login payload + token persistence.
    // Any 401 from subsequent API calls will clear the token via axios interceptor.
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const res = await api.post(AUTH_LOGIN, credentials);
    const { token, user: userData } = res.data;
    if (token) {
      Cookies.set("ql_token", token, { sameSite: "strict" });
    }
    setUser(userData);
    toast.success("Login successful");
    return userData;
  };

  const register = async (payload) => {
    const res = await api.post(AUTH_REGISTER, payload);
    toast.success("Registration successful. Please login.");
    return res.data;
  };

  const logout = () => {
    Cookies.remove("ql_token");
    setUser(null);
    window.location.href = "/login";
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    role: user?.role
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

